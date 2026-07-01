import { useState, useEffect, useCallback } from 'react'

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

    try {
      // send full conversation history to API route /api/agent
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })

      // handle non-200 responses
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to get response')
      }

      const data = await res.json()

      // debug: log response to console
      console.log('Agent response:', data)

      // validate response structure to prevent errors
      if (!data.reply) {
        throw new Error('Invalid response from server')
      }

      // append DeepSeek assistant reply to conversation
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])

      // return toolAction if DeepSeek called a tool
      const toolAction = data.toolAction ?? null
      console.log('Tool action received:', toolAction)
      return toolAction
    } catch (error) {
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

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
        },
      ])
      return null
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages]) // add dependencies

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
