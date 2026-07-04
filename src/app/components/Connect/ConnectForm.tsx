'use client'

import { motion } from 'framer-motion'
import { useConnectForm } from './useConnectForm'
import SuccessMessage from './../MessagesUI/SuccessMessage'
import ErrorMessage from './../MessagesUI/ErrorMessage'
import { FaEnvelope } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
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
      className="mx-auto mb-20 max-w-7xl"
    >
      <h1 className="mt-16 mb-10 text-center text-4xl font-bold 2xl:mt-20">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left side: contact info */}
        <div className="ml-24 space-y-8">
          <h2 className="mt-16 mb-4 text-2xl font-semibold">Get in Touch</h2>
          <p className="mr-10 text-lg text-gray-600 dark:text-gray-400">
            If you have any questions or inquiries, feel free to reach out.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="space-y-5">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <FaEnvelope className="h-6 w-6 text-cyan-600" />
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
                <div className="flex items-center gap-4">
                  <FaMapLocationDot className="h-6 w-6 text-cyan-600" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: form */}
        <div className="dark:bg-dark/50 l mt-3 mr-auto mb-10 ml-auto min-w-100 rounded-lg bg-white p-5 shadow-md sm:min-w-120 md:-ml-15 md:min-w-85 lg:min-w-80 lg:min-w-120 xl:min-w-150">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
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
            </div>

            {/* Email */}
            <div>
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
            </div>

            {/* Topic */}
            <div>
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
            </div>

            {/* Message */}
            <div>
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
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-full cursor-pointer bg-cyan-600 text-white hover:bg-cyan-600/80 disabled:bg-cyan-400/50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

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
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default ConnectForm
