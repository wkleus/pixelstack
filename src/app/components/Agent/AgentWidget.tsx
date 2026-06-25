'use client'

import { useState } from 'react'
import { useAgent } from '@/app/hooks/useAgent'

// AgentWidget connects useAgent hook to the browser UI
// state:   - isOpen: whether the chat window is currently open or closed
// AgentWidget calls useAgent, where the logic (fetch, state, history) lives, and passes its values to the UI
const AgentWidget = () => {
  // controls visibility of chat window
  const [isOpen, setIsOpen] = useState(false)

  const { messages, input, setInput, isLoading, sendMessage, handleKeyDown } =
    useAgent()

  return (
    <>
      {/* floating toggle button — always visible bottom right */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-5 bottom-5 z-50 border border-cyan-500"
      >
        {isOpen ? 'Close' : 'Ask PixelStack'}
      </button>

      {/* chat window — only rendered when isOpen true */}
      {isOpen && (
        <div
          className="fixed right-5 bottom-20 z-50 flex w-70 flex-col bg-white dark:bg-gray-900"
          style={{ height: '450px' }}
        >
          {/* messages area — shows conversation history */}
          <div className="flex flex-col overflow-y-auto text-black dark:text-white">
            {messages.map((msg, i) => (
              <div key={i}>
                <span>{msg.role === 'user' ? 'You' : 'PixelStack'}:</span>
                {msg.content}
              </div>
            ))}
          </div>

          {/* input area — text field + send button */}
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 border"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="border px-3"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AgentWidget
