'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMailStatus } from './useMailStatus'
import SuccessMessage from '../../MessagesUI/SuccessMessage'
import ErrorMessage from '../../MessagesUI/ErrorMessage'
import { LucideInbox } from 'lucide-react'

const InfoMail = () => {
  const { status, setSubmitting, setSubmitted, setFailed, reset } =
    useMailStatus()

  /**
   * Handles form submission and performs basic email validation.
   */
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const email = (form.elements.namedItem('email') as HTMLInputElement).value

    setSubmitting()

    const isValid = /\S+@\S+\.\S+/.test(email)

    if (!isValid) {
      setFailed()
      setTimeout(() => reset(), 3000)
      return
    }

    setSubmitted()

    // Clear input after success
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    setTimeout(() => reset(), 3000)
  }

  return (
    <section className="dark:bg-dark/80 w-full border-t border-black/5 bg-[#f2f2f2] px-4 py-28 dark:border-white/5">
      <div className="mx-auto max-w-3xl text-center">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 text-4xl font-semibold tracking-tight"
        >
          Stay in the Loop
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300"
        >
          Get updates on new articles, insights and exclusive content.
        </motion.p>

        {/* Email subscription form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <input
            name="email"
            type="email"
            ref={inputRef}
            placeholder="Your email address..."
            className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-800 placeholder-gray-500 transition-all focus:ring-2 focus:ring-cyan-700 focus:outline-none sm:w-auto dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-200 dark:placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={status.state === 'submitting'}
            className="group text-md relative cursor-pointer overflow-hidden rounded-xl border border-white/30 bg-cyan-500 px-10 py-2.75 text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all hover:bg-amber-600/90 disabled:cursor-not-allowed disabled:bg-cyan-400/50 dark:border-white/20 dark:bg-amber-600/90 dark:hover:bg-cyan-600"
          >
            <span className="absolute inset-0 translate-x-[-150%] rotate-12 bg-linear-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-1500 ease-out group-hover:translate-x-[150%] group-hover:opacity-100" />
            {status.state === 'submitting' ? (
              'Submitting...'
            ) : (
              <div className="flex items-center gap-2">
                <LucideInbox className="mr-2" size={20} />
                <span className="font-bold">Join</span>
              </div>
            )}
          </button>
        </motion.form>

        {/* Animated success/error messages */}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            transition={{ layout: { duration: 0.45, ease: 'easeOut' } }}
            className="mt-8 min-h-[3.5rem]"
            aria-live="polite"
          >
            {status.state === 'submitted' && (
              <SuccessMessage message="Successfully subscribed!" />
            )}

            {status.state === 'failed' && (
              <ErrorMessage message="Please enter a valid email address." />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default InfoMail
