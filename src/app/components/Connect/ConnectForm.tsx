'use client'

import { motion, Variants } from 'framer-motion'
import { useConnectForm } from './useConnectForm'
import SuccessMessage from './../MessagesUI/SuccessMessage'
import ErrorMessage from './../MessagesUI/ErrorMessage'
import { FaEnvelope, FaGithub } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
import ConnectIconRain from './ConnectIconRain'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

// valid topic values for the contact form - used for validation and pre-filling
const VALID_TOPICS = [
  'job',
  'project',
  'collaboration',
  'quote',
  'feedback',
  'support',
  'interview',
  'networking',
  'other',
] as const

type ValidTopic = (typeof VALID_TOPICS)[number]

// Stagger container for the form fields — each direct child fades/slides in
// slightly after the previous one, driven by the "field" variant below
const formContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Individual field entrance — subtle fade + slide, matches the rest of the
// site's motion language (Intro, Profile timeline)
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const ConnectForm = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL
  const location = process.env.NEXT_PUBLIC_LOCATION

  const { formData, status, errors, handleChange, handleSubmit, isSubmitting } =
    useConnectForm()

  const searchParams = useSearchParams()

  // initialize state directly from URL params
  const [isPrefilled, setIsPrefilled] = useState(() => {
    const topic = searchParams.get('topic')
    return !!(topic && VALID_TOPICS.includes(topic as ValidTopic))
  })

  // use a ref to track if the form was already prefilled (prevents infinite loops)
  const hasPrefilled = useRef(false)

  // pre-fill topic from URL parameter (?topic=job etc.)
  useEffect(() => {
    // skip if already prefilled
    if (hasPrefilled.current) return

    const topic = searchParams.get('topic')

    // only proceed if there is a topic and it's a valid topic
    if (topic && VALID_TOPICS.includes(topic as ValidTopic)) {
      console.log(`Pre-filling form with topic: ${topic}`)

      // mark as prefilled IMMEDIATELY to prevent any re-runs
      hasPrefilled.current = true

      // directly update the form data by calling handleChange
      // create event object
      const event = {
        target: {
          name: 'topic',
          value: topic,
        },
      } as React.ChangeEvent<HTMLSelectElement>

      // call the form's change handler
      handleChange(event)
    }
  }, [searchParams, handleChange])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75 }}
      className="relative mx-auto mb-20 max-w-7xl overflow-hidden"
    >
      {/* Decorative background: contact icons */}
      <ConnectIconRain />

      <div className="relative z-10">
        <h1 className="mt-16 mb-10 text-center text-4xl font-bold 2xl:mt-20">
          Contact Me
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {/* Left side: contact info */}

          <div className="relative space-y-8 pt-4">
            {/* Decorative horizontal lines */}
            <div
              className="flex flex-col gap-2 pt-2 opacity-60 dark:opacity-20"
              aria-hidden="true"
            >
              <div className="h-0.75 w-full rounded-full bg-cyan-500" />
              <div className="h-0.75 w-full rounded-full bg-amber-500" />
            </div>

            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              If you have any questions or inquiries, feel free to reach out.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="space-y-5">
                  {/* Email */}
                  <div className="group flex items-center gap-4">
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, -6, 6, 0],
                        transition: { duration: 0.5, ease: 'easeInOut' },
                      }}
                    >
                      <FaEnvelope className="h-6 w-6 text-cyan-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <Link
                        href={`mailto:${email}`}
                        className="text-lg text-gray-600 hover:text-cyan-600 dark:text-gray-400"
                      >
                        {email}
                      </Link>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="group flex items-center gap-4">
                    <motion.div
                      whileHover={{
                        y: [0, -6, 0],
                        transition: { duration: 0.4, ease: 'easeOut' },
                      }}
                    >
                      <FaMapLocationDot className="h-6 w-6 text-cyan-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {location}
                      </p>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="group flex items-center gap-4">
                    <motion.div
                      whileHover={{
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.15, 1.15, 1],
                        transition: { duration: 0.45, ease: 'easeInOut' },
                      }}
                    >
                      <FaGithub className="h-6 w-6 text-cyan-600" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold">GitHub</h3>
                      <Link
                        href="https://github.com/wkleus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 hover:text-cyan-600 dark:text-gray-400"
                      >
                        github.com/wkleus
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative horizontal lines */}
            <div
              className="flex flex-col gap-2 pt-2 opacity-60 dark:opacity-20"
              aria-hidden="true"
            >
              <div className="h-0.75 w-full rounded-full bg-amber-500" />
              <div className="h-0.75 w-full rounded-full bg-cyan-500" />
            </div>
          </div>

          {/* Right side: form */}
          <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-900/70">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={formContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Name */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Your name..."
                  className="dark:bg-dark focus:ring-primary w-full rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 disabled:opacity-50 dark:border-gray-700"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Your email..."
                  className="dark:bg-dark focus:ring-primary w-full rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 disabled:opacity-50 dark:border-gray-700"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              {/* Topic */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="topic"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Topic
                </label>
                <div className="relative">
                  <select
                    id="topic"
                    disabled={isSubmitting}
                    value={formData.topic || ''}
                    onChange={(e) => {
                      handleChange(e)
                      // reset prefilled state when user manually changes the topic
                      if (isPrefilled) setIsPrefilled(false)
                    }}
                    name="topic"
                    className={`dark:bg-dark focus:ring-primary w-full rounded-md border bg-white px-4 py-2 focus:ring-2 disabled:opacity-50 dark:border-gray-700 ${
                      isPrefilled && formData.topic
                        ? 'border-green-500 dark:border-green-400'
                        : 'border-gray-300 text-gray-400'
                    }`}
                    aria-invalid={!!errors.topic}
                  >
                    <option value="" disabled>
                      Select a topic...
                    </option>
                    <option value="project">Project Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="job">Job Offer</option>
                    <option value="quote">Request a Quote</option>
                    <option value="feedback">Feedback</option>
                    <option value="support">Technical Support</option>
                    <option value="interview">Interview Request</option>
                    <option value="networking">Networking</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Show pre-filled indicator */}
                  {isPrefilled && formData.topic && (
                    <span className="absolute top-2.5 right-8 text-xs text-green-600 dark:text-green-400">
                      ✓ Pre-filled
                    </span>
                  )}
                </div>
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-500">{errors.topic}</p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div variants={fieldVariants}>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={handleChange}
                  name="message"
                  rows={3}
                  minLength={15}
                  placeholder="Your message..."
                  className="dark:bg-dark focus:ring-primary w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 disabled:opacity-50 dark:border-gray-700"
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={fieldVariants}
                type="submit"
                disabled={isSubmitting}
                className="btn w-full cursor-pointer bg-cyan-600 text-white hover:bg-cyan-600/80 disabled:bg-cyan-400/50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status.state === 'submitted' && (
                <div role="status" aria-live="polite">
                  <SuccessMessage message={status.message} />
                </div>
              )}

              {status.state === 'failed' && (
                <div role="alert" aria-live="assertive">
                  <ErrorMessage message={status.error} />
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ConnectForm
