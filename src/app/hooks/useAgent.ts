import { useState, useEffect, useCallback, useRef } from 'react'

const STORAGE_KEY = 'pixelstack-agent-messages'

// represents a single message in the conversation
export interface AgentMessage {
  id?: string | number
  role: 'user' | 'assistant'
  content: string
}

// manage state and logic for AI chat agent
// state:   - messages: full conversation history of user + assistant to give the agent conversation context with every request
//          - input: current text in input field
//          - isLoading: true while waiting for a response from API
export function useAgent() {
  // load messages from localStorage on first render, fall back to empty array
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

  // ref to hold the AbortController for the current stream
  const abortControllerRef = useRef<AbortController | null>(null)

  // persist messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // localStorage might be unavailable (e.g. private browsing in some browsers)
      console.warn(
        'localStorage unavailable — conversation will not be persisted.',
      )
    }
  }, [messages])

  // cleanup on unmount: abort any ongoing request
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  // wrap sendMessage in useCallback to prevent recreation on every render
  const sendMessage = useCallback(async (): Promise<{
    type: string
    topic: string
  } | null> => {
    // use local copy of input to prevent race conditions
    const currentInput = input.trim()
    if (!currentInput || isLoading) {
      console.log('Cannot send: input empty or loading')
      return null
    }

    console.log(`Sending message: "${currentInput}"`)

    // append current input as user message to conversation history
    const updated: AgentMessage[] = [
      ...messages,
      { role: 'user', content: currentInput },
    ]

    setMessages(updated)
    setInput('') // clear input immediately
    setIsLoading(true)

    // abort any previous request still in flight
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    try {
      // send full conversation history to API route /api/agent (streaming)
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
        signal: abortController.signal,
      })

      // handle non-200 responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.message || 'Failed to get response')
      }

      if (!res.body) throw new Error('No response body')

      // prepare to read the SSE stream
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let assistantContent = ''
      let toolAction: { type: string; topic: string } | null = null
      let streamCompleted = false

      // insert an empty assistant message placeholder that we'll update as tokens arrive
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (!streamCompleted) {
        try {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const events = buffer.split('\n\n')
          buffer = events.pop() || '' // keep incomplete event in buffer

          for (const event of events) {
            if (event.startsWith('data: ')) {
              const data = event.slice(6).trim()
              if (data === '[DONE]') {
                streamCompleted = true
                break
              }

              try {
                const parsed = JSON.parse(data)
                // text token – append to accumulated content
                if (parsed.content) {
                  assistantContent += parsed.content
                  setMessages((prev) => {
                    const copy = [...prev]
                    const lastIdx = copy.length - 1
                    if (copy[lastIdx]?.role === 'assistant') {
                      copy[lastIdx] = {
                        ...copy[lastIdx],
                        content: assistantContent,
                      }
                    }
                    return copy
                  })
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
                assistantContent = parsed.reply || assistantContent
                toolAction = parsed.toolAction || null

                // update the assistant message with the final reply
                setMessages((prev) => {
                  const copy = [...prev]
                  const lastIdx = copy.length - 1
                  if (copy[lastIdx]?.role === 'assistant') {
                    copy[lastIdx] = {
                      ...copy[lastIdx],
                      content: assistantContent,
                    }
                  }
                  return copy
                })
                streamCompleted = true
              }
            }
          }
        } catch (streamError) {
          console.error('Stream read error:', streamError)
          setMessages((prev) => {
            const copy = [...prev]
            const lastIdx = copy.length - 1
            if (
              copy[lastIdx]?.role === 'assistant' &&
              copy[lastIdx].content === ''
            ) {
              copy[lastIdx] = {
                ...copy[lastIdx],
                content: 'Connection lost. Please try again.',
              }
            }
            return copy
          })
          streamCompleted = true
        }
      }

      // debug: log response to console
      console.log('Agent response (streaming complete):', assistantContent)
      console.log('Tool action received:', toolAction)

      return toolAction
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Request aborted')
        return null
      }

      // enhanced error handling
      console.error('Error sending message:', error)

      let errorMessage = 'Something went wrong. Please try again.'
      if (error instanceof Error) {
        // check for specific error types
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
        // replace the empty placeholder with the error message, or append if missing
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
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [input, isLoading, messages])

  // send message on enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // prevent form submission
      sendMessage()
    }
  }

  // addMessage: insert a message into the conversation (e.g. for proactive messages)
  // 'agent' is normalized to 'assistant' for consistency.
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

  // clear conversation history from state and localStorage
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
