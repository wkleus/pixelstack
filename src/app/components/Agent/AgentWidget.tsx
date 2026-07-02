'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useAgent } from '@/app/hooks/useAgent'
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaCircle,
  FaTrash,
} from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

// returns a proactive message based on the current page
function getProactiveMessage(pathname: string): string {
  if (pathname === '/portfolio')
    return 'Want me to explain any of these projects?'
  if (pathname === '/posts')
    return 'New developer blog posts will appear here from time to time, and if you’d like to receive them directly, you can join the newsletter.'
  if (pathname === '/connect') return 'Need help filling out the contact form?'
  if (pathname === '/profile')
    return "Want to know more about the developer's background or certifications?"

  return "Hi! I'm PixelStack — ask me anything about this developer's skills or projects."
}

// reusable tooltip wrapper
function Tooltip({
  text,
  position = 'top',
  children,
}: {
  text: string
  position?: 'top' | 'left'
  children: React.ReactNode
}) {
  const positionClass =
    position === 'left'
      ? 'right-full top-2 mr-2 -translate-y-1/2'
      : 'bottom-full -left-2.5 -mb-0.5 -translate-x-1/2'

  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span
        className={`pointer-events-none absolute ${positionClass} b-4 z-50 mt-10 -ml-4 rounded-full rounded-br-none border border-cyan-400/50 bg-gray-700/90 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-800/80 dark:text-gray-200`}
      >
        {text}
      </span>
    </div>
  )
}

const AgentWidget = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [hasShownProactive, setHasShownProactive] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isProactiveDone, setIsProactiveDone] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [lastSentMessage, setLastSentMessage] = useState<string>('')

  const {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
    addMessage,
    clearMessages,
  } = useAgent()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const prevMessagesLength = useRef(messages.length)
  const isNavigatingRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Slight delay to allow the animation to complete
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // proactive behavior
  useEffect(() => {
    if (isProactiveDone) return
    if (hasShownProactive) return
    if (isOpen) return

    const timer = setTimeout(() => {
      setUnreadCount(1)
      setHasShownProactive(true)
    }, 30_000)

    return () => clearTimeout(timer)
  }, [pathname, hasShownProactive, isOpen, isProactiveDone])

  // add proactive message when chat opens
  useEffect(() => {
    if (
      isOpen &&
      hasShownProactive &&
      !isProactiveDone &&
      messages.length === 0
    ) {
      const timer = setTimeout(() => {
        addMessage('agent', getProactiveMessage(pathname))
        setIsProactiveDone(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [
    isOpen,
    hasShownProactive,
    isProactiveDone,
    messages.length,
    pathname,
    addMessage,
  ])

  // track new messages for unread badge
  useEffect(() => {
    if (!isOpen && messages.length > prevMessagesLength.current) {
      const newMessages = messages.slice(prevMessagesLength.current)
      const agentMessages = newMessages.filter(
        (msg) => msg.role === 'assistant',
      )
      if (agentMessages.length > 0) {
        setUnreadCount((prev) => prev + agentMessages.length)
      }
    }
    prevMessagesLength.current = messages.length
  }, [messages, isOpen])

  const handleOpenChat = () => {
    setIsOpen(true)
    setUnreadCount(0)
  }

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      handleOpenChat()
    }
  }

  const handleClearMessages = () => {
    clearMessages()
  }

  // send handler with loading, navigation and state management
  const handleSend = useCallback(async () => {
    // Prevent duplicate sends
    if (isLoading || isNavigatingRef.current) {
      console.log('Already loading or navigating, skipping...')
      return
    }

    const trimmedInput = input.trim()
    if (!trimmedInput) {
      console.log('Empty input, skipping...')
      return
    }

    // store the message before sending
    setLastSentMessage(trimmedInput)
    console.log(`Sending: "${trimmedInput}"`)

    try {
      // send message and wait for tool action
      const toolAction = await sendMessage()

      console.log('Tool action result:', toolAction)

      // handle navigation if tool action is prefill
      if (toolAction && toolAction.type === 'prefill_contact_form') {
        const topic = toolAction.topic
        const targetUrl = `/connect?topic=${topic}`

        console.log(`Prefill detected! Navigating to: ${targetUrl}`)

        // set navigation state
        isNavigatingRef.current = true
        setIsNavigating(true)

        // wait for user to read the reply, then close widget and navigate
        setTimeout(() => {
          // close widget first so the transition feels smooth
          setIsOpen(false)

          // wait for close animation to finish, then navigate
          setTimeout(() => {
            router.push(targetUrl)
            isNavigatingRef.current = false
            setIsNavigating(false)
          }, 300)
        }, 3500)
      } else {
        console.log('No prefill action detected')
      }
    } catch (error) {
      console.error('Error in handleSend:', error)
      isNavigatingRef.current = false
      setIsNavigating(false)
    }
  }, [input, isLoading, sendMessage, router])

  // handle enter key
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend],
  )

  return (
    <>
      {/* FLOATING TOGGLE BUTTON - only visible when chat is closed */}
      {!isOpen && (
        <motion.button
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={handleToggle}
          className="group fixed right-5 bottom-5 z-50 flex cursor-pointer items-center gap-3 rounded-xl border border-cyan-500 px-2 py-2 font-medium text-white shadow-xl shadow-cyan-500/20 transition-all duration-200 hover:scale-103 hover:shadow-2xl hover:shadow-cyan-500/40 dark:border-cyan-500/60 dark:bg-gradient-to-r dark:from-cyan-600/30 dark:to-cyan-800/90"
        >
          {/* pulsing ring animation - only when chat is closed */}
          {unreadCount > 0 && (
            <span className="absolute inset-0 animate-ping rounded-xl border-2 border-cyan-400 opacity-75" />
          )}

          <div className="relative flex flex-col items-center gap-0.5 leading-none">
            <FaRobot className="text-3xl text-amber-500 dark:text-amber-400" />
            <span className="text-xs tracking-wider text-amber-400">
              <em className="text-cyan-600 dark:text-cyan-400">Pixel</em>
              <em className="text-amber-600 dark:text-amber-400">Stack</em>
            </span>

            {/* unread badge - only when chat is closed */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg shadow-red-500/50">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          {/* tooltip */}
          <span className="pointer-events-none absolute -top-3 right-full -mr-2 -translate-y-1/2 rounded-full rounded-br-none border border-cyan-400/50 bg-gray-200 px-2 py-2 text-[10px] whitespace-nowrap text-gray-700 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-800 dark:text-gray-200">
            Chat with <p>PixelStack AI</p>
          </span>
        </motion.button>
      )}

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed right-3 bottom-20 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl shadow-black/20 transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-900 dark:shadow-black/50"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b-1 border-gray-500/40 px-3 py-3 text-white dark:bg-gradient-to-r dark:from-cyan-600/30 dark:to-cyan-800/90">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <FaRobot className="text-xl text-amber-400 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-amber-500 dark:text-amber-400">
                    PixelStack AI
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] opacity-90">
                    <FaCircle className="text-[7px] text-green-300" />
                    <span className="text-green-400">online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* clear chat button — only visible when messages exist */}
                {messages.length > 0 && (
                  <Tooltip text="Clear chat history">
                    <button
                      onClick={handleClearMessages}
                      aria-label="Clear chat history"
                      title="Clear chat"
                      className="flex h-5 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
                    >
                      <FaTrash className="rounded-xl border p-1 text-2xl text-amber-500/70 hover:text-amber-400" />
                    </button>
                  </Tooltip>
                )}

                {/* close button */}
                <Tooltip text="Close chat">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-5 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/20"
                  >
                    <FaTimes className="rounded-xl border p-1 text-2xl text-amber-500/70" />
                  </button>{' '}
                </Tooltip>
              </div>
            </div>

            {/* MESSAGES AREA - with styled scrollbar */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/50 px-3 py-6 dark:bg-gray-900/50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/40 [&::-webkit-scrollbar-thumb]:transition-colors hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/60 [&::-webkit-scrollbar-track]:bg-transparent">
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

                    {/* bubble */}
                    <div
                      className={`mt-3 -mr-3 -mb-1 max-w-[80%] rounded-2xl px-2 py-1.5 text-sm ${
                        msg.role === 'user'
                          ? 'darkbg-gradient-to-br rounded-tr-none border-1 border-cyan-500/40 shadow-md shadow-blue-500/20 dark:bg-gray-900 dark:text-white'
                          : 'rounded-tl-none border-1 border-gray-200/50 bg-white text-gray-800 shadow-sm dark:border-cyan-500/30 dark:bg-gray-800 dark:text-gray-100'
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
                            <em className="text-amber-300 italic">
                              {children}
                            </em>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-gray-200/50 px-1 py-0.5 font-mono text-xs dark:bg-gray-700/50">
                              {children}
                            </code>
                          ),
                          a: ({ href, children }) => {
                            console.log('Link founded:', href)
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

              {/* loading indicator */}
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
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  disabled={isLoading || isNavigating}
                  placeholder={
                    isLoading
                      ? 'PixelStack is thinking...'
                      : isNavigating
                        ? 'Opening contact form...'
                        : 'Enter message...'
                  }
                  className="text-md flex-1 border-none bg-transparent text-gray-800 outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-gray-200 dark:placeholder:text-gray-500"
                />
                <Tooltip text="Send message">
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading || isNavigating}
                    className="m-0.5 flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700/90 text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isNavigating ? (
                      <FaCircle className="animate-spin text-sm" />
                    ) : (
                      <FaPaperPlane className="text-sm" />
                    )}
                  </button>
                </Tooltip>
              </div>
              <div className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
                <span>Encrypted • Instant answers</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AgentWidget
