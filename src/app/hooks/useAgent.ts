import { useState, useEffect, useCallback, useRef } from 'react'

const STORAGE_KEY = 'pixelstack-agent-messages'

// Typewriter display speed
// effective chars/sec = CHARS_PER_TICK / (TICK_MS / 1000)
// e.g. 4 chars / 20 ms = 200 chars/s
const CHARS_PER_TICK = 4
const TICK_MS = 20

export interface AgentMessage {
  id?: string | number
  role: 'user' | 'assistant'
  content: string
}

/**
 * Manages chat state and streaming logic for the AI agent
 * - messages: conversation history
 * - input: current input field value
 * - isLoading: true while waiting for / receiving a response
 */
export function useAgent() {
  const [messages, setMessages] = useState<AgentMessage[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as AgentMessage[]) : []
    } catch {
      return []
    }
  })

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  // Typewriter buffers: full text from the server vs. currently displayed length
  const fullTextRef = useRef('')
  const displayedLengthRef = useRef(0)
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      console.warn(
        'localStorage unavailable — conversation will not be persisted.',
      )
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (typewriterRef.current) {
        clearInterval(typewriterRef.current)
        typewriterRef.current = null
      }
    }
  }, [])

  /** Updates the last assistant message with the given text */
  const renderAssistantContent = useCallback((text: string) => {
    setMessages((prev) => {
      const copy = [...prev]
      const lastIdx = copy.length - 1
      if (copy[lastIdx]?.role === 'assistant') {
        copy[lastIdx] = { ...copy[lastIdx], content: text }
      }
      return copy
    })
  }, [])

  /** Starts the typewriter interval (idempotent) */
  const startTypewriter = useCallback(() => {
    if (typewriterRef.current) return
    typewriterRef.current = setInterval(() => {
      const full = fullTextRef.current
      const displayed = displayedLengthRef.current
      if (displayed >= full.length) return

      const nextLength = Math.min(displayed + CHARS_PER_TICK, full.length)
      displayedLengthRef.current = nextLength
      renderAssistantContent(full.slice(0, nextLength))
    }, TICK_MS)
  }, [renderAssistantContent])

  const stopTypewriter = useCallback(() => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current)
      typewriterRef.current = null
    }
  }, [])

  /**
   * Sends the current input to /api/agent and streams the response
   * Returns a tool action (e.g. prefill_contact_form) if one was triggered
   */
  const sendMessage = useCallback(async (): Promise<{
    type: string
    topic: string
  } | null> => {
    const currentInput = input.trim()
    if (!currentInput || isLoading) {
      console.log('Cannot send: input empty or loading')
      return null
    }

    console.log(`Sending message: "${currentInput}"`)

    const updated: AgentMessage[] = [
      ...messages,
      { role: 'user', content: currentInput },
    ]

    setMessages(updated)
    setInput('')
    setIsLoading(true)

    fullTextRef.current = ''
    displayedLengthRef.current = 0
    stopTypewriter()

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    // Keep only the last 3 user/assistant pairs to limit token usage
    const MAX_HISTORY_MESSAGES = 6
    const recentMessages = updated.slice(-MAX_HISTORY_MESSAGES)

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: recentMessages }),
        signal: abortController.signal,
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to get response')
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let toolAction: { type: string; topic: string } | null = null
      let streamCompleted = false

      // Placeholder that the typewriter fills as chunks arrive
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
      startTypewriter()

      while (!streamCompleted) {
        try {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const events = buffer.split('\n\n')
          buffer = events.pop() || ''

          for (const event of events) {
            if (event.startsWith('data: ')) {
              const data = event.slice(6).trim()
              if (data === '[DONE]') {
                streamCompleted = true
                break
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  fullTextRef.current += parsed.content
                }
              } catch {
                // ignore malformed data events
              }
            } else if (event.startsWith('event: tool_result')) {
              const dataLine = event
                .split('\n')
                .find((l) => l.startsWith('data: '))
              if (dataLine) {
                const jsonStr = dataLine.slice(6)
                const parsed = JSON.parse(jsonStr)
                toolAction = parsed.toolAction || null

                // Non-empty reply replaces the buffer (contact-form case)
                // Empty reply keeps the already-streamed text (project-details case)
                if (parsed.reply) {
                  fullTextRef.current = parsed.reply
                }
                streamCompleted = true
              }
            }
          }
        } catch (streamError) {
          console.error('Stream read error:', streamError)
          if (displayedLengthRef.current === 0) {
            fullTextRef.current = 'Connection lost. Please try again.'
            displayedLengthRef.current = 0
          }
          streamCompleted = true
        }
      }

      // Wait for the typewriter to catch up before clearing isLoading
      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (displayedLengthRef.current >= fullTextRef.current.length) {
            clearInterval(check)
            resolve()
          }
        }, 20)
        setTimeout(() => {
          clearInterval(check)
          resolve()
        }, 15000)
      })

      stopTypewriter()

      console.log('Agent response (streaming complete):', fullTextRef.current)
      console.log('Tool action received:', toolAction)

      return toolAction
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted')
        return null
      }

      console.error('Error sending message:', error)

      let errorMessage = 'Something went wrong. Please try again.'
      if (error instanceof Error) {
        if (error.message.includes('rate limit')) {
          errorMessage =
            'Too many requests. Please wait a moment before trying again.'
        } else if (error.message.includes('API key')) {
          errorMessage = 'Service configuration error. Please try again later.'
        } else if (error.message.includes('Failed to get response')) {
          errorMessage = 'Unable to get a response. Please try again.'
        } else {
          errorMessage = error.message
        }
      }

      setMessages((prev) => {
        const copy = [...prev]
        const lastIdx = copy.length - 1
        if (
          copy[lastIdx]?.role === 'assistant' &&
          copy[lastIdx].content === ''
        ) {
          copy[lastIdx] = { ...copy[lastIdx], content: errorMessage }
        } else {
          copy.push({ role: 'assistant', content: errorMessage })
        }
        return copy
      })
      return null
    } finally {
      stopTypewriter()
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [input, isLoading, messages, startTypewriter, stopTypewriter])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  /** Inserts a message into the conversation (e.g. proactive greetings) */
  const addMessage = useCallback(
    (role: 'user' | 'agent' | 'assistant', content: string) => {
      const normalizedRole = role === 'agent' ? 'assistant' : role
      const newMessage: AgentMessage = {
        id: Date.now(),
        role: normalizedRole,
        content,
      }
      setMessages((prev) => [...prev, newMessage])
    },
    [],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleKeyDown,
    addMessage,
    clearMessages,
  }
}
