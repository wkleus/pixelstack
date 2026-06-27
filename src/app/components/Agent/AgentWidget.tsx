'use client'

import { useState, useEffect, useRef } from 'react'
import { useAgent } from '@/app/hooks/useAgent'
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaChevronDown,
  FaCircle,
} from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const AgentWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, setInput, isLoading, sendMessage, handleKeyDown } =
    useAgent()
  const pathname = usePathname()

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      {/* FLOATING TOGGLE BUTTON - with AnimatePresence and key */}
      <AnimatePresence mode="wait">
        <motion.button
          key={pathname} // key changes when page changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="fixed right-3 bottom-5 z-50 flex cursor-pointer items-center gap-3 rounded-xl border border-white/20 bg-gradient-to-r from-cyan-600/30 to-cyan-800/90 px-2 py-1.5 font-medium text-white shadow-xl shadow-cyan-500/20 transition-all duration-200 hover:scale-103 hover:shadow-2xl hover:shadow-cyan-500/40"
        >
          {isOpen ? (
            <>
              <FaTimes className="text-sm text-amber-300" />
              <span className="text-sm text-amber-300">Close</span>
            </>
          ) : (
            <>
              <FaRobot className="text-2xl text-amber-400" />
              <span className="text-sm tracking-wider text-amber-400">
                {' '}
                <strong>
                  Ask <em className="text-cyan-400">Pixel</em>
                  <em>Stack</em>
                </strong>
              </span>
              <FaChevronDown className="text-xs text-amber-400 opacity-80" />
            </>
          )}
        </motion.button>
      </AnimatePresence>

      {/* CHAT WINDOW */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="animate-in slide-in-from-bottom-4 fade-in fixed right-3 bottom-20 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl shadow-black/20 transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-900 dark:shadow-black/50"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-600/30 to-cyan-800/90 px-3 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <FaRobot className="text-xl text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-400">
                  PixelStack AI
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] opacity-90">
                  <FaCircle className="text-[7px] text-green-300" />
                  <span className="text-amber-100">online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-5 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
            >
              <FaTimes className="rounded-xl border p-1 text-2xl text-amber-400/70" />
            </button>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/50 px-3 py-6 dark:bg-gray-900/50">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
                <FaRobot className="mb-3 text-4xl text-cyan-800/90" />
                <p className="text-sm font-medium">No messages</p>
                <p className="text-xs">Ask PixelStack your first question</p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start ${
                    msg.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`z-10 -mt-2 -mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                      msg.role === 'user'
                        ? 'mr-0 border-1 border-cyan-200 bg-gradient-to-br from-cyan-500 to-cyan-700/90 text-white shadow-md shadow-blue-500/20'
                        : 'border-1 border-cyan-200 bg-gradient-to-br from-cyan-500 to-cyan-700/90 text-white'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <FaUser size={13} />
                    ) : (
                      <FaRobot size={19} />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`mt-3 -mr-3 -mb-1 max-w-[80%] rounded-2xl px-2 py-1.5 text-sm ${
                      msg.role === 'user'
                        ? 'rounded-tr-none border-1 border-cyan-500/40 bg-gray-900 bg-gradient-to-br text-white shadow-md shadow-blue-500/20'
                        : 'rounded-tl-none border-1 border-gray-200/50 bg-white text-gray-800 shadow-sm dark:border-cyan-500/20 dark:bg-gray-800 dark:text-gray-100'
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        strong: ({ children }) => (
                          <strong className="font-bold text-cyan-400">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-amber-300 italic">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="rounded bg-gray-200/50 px-1 py-0.5 font-mono text-xs dark:bg-gray-700/50">
                            {children}
                          </code>
                        ),
                        a: ({ href, children }) => {
                          console.log('Link founded:', href) // debug: checking whether links are detected
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 underline transition-colors hover:text-cyan-300 hover:underline-offset-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                console.log('Link clicked:', href)
                              }}
                            >
                              {children}
                            </a>
                          )
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-500">
                  <FaRobot className="text-xs text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-none border border-gray-200/50 bg-white px-4 py-2.5 shadow-sm dark:border-gray-700/50 dark:bg-gray-800">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"></span>
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                      style={{ animationDelay: '0.2s' }}
                    ></span>
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500"
                      style={{ animationDelay: '0.4s' }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          <div className="border-t border-gray-200/50 bg-white p-4 dark:border-gray-700/50 dark:bg-gray-900">
            <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-cyan-500/50 dark:bg-gray-700/50">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={
                  isLoading ? 'PixelStack is thinking...' : 'Enter message...'
                }
                className="text-md flex-1 border-none bg-transparent text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-gray-200 dark:placeholder:text-gray-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="m-0.5 flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700/90 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
              <span>Encrypted • Instant answers</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default AgentWidget
