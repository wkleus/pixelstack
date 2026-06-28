import { useState } from 'react'

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
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // sendMessage: main function to drive the conversation
  const sendMessage = async () => {
    // take current input value
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // append the current input as user message to conversation history
    const updated: AgentMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ]

    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      // send full conversation history to the API route /api/agent
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })

      const data = await res.json()

      // append DeepSeek assistant reply to conversation
      setMessages([
        ...updated,
        { role: 'assistant', content: data.reply ?? data.message },
      ])
    } catch {
      setMessages([
        ...updated,
        {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // send message on enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  // addMessage: insert a message into the conversation (e.g. for proactive messages)
  // 'agent' is normalized to 'assistant' for consistency.
  const addMessage = (
    role: 'user' | 'agent' | 'assistant',
    content: string,
  ) => {
    const normalizedRole = role === 'agent' ? 'assistant' : role
    const newMessage: AgentMessage = {
      id: Date.now(),
      role: normalizedRole,
      content,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    handleKeyDown,
    addMessage,
  }
}
