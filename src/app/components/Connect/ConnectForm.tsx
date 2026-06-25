'use client'

import { motion } from 'framer-motion'
import { useConnectForm } from './useConnectForm'
import SuccessMessage from './../MessagesUI/SuccessMessage'
import ErrorMessage from './../MessagesUI/ErrorMessage'
import { FaEnvelope } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
import Link from 'next/link'

const ConnectForm = () => {
  const { formData, status, handleChange, handleSubmit } = useConnectForm()
  const email = process.env.NEXT_PUBLIC_EMAIL
  const location = process.env.NEXT_PUBLIC_LOCATION

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75 }}
      className="mx-auto max-w-7xl py-10"
    >
      <h1 className="mt-16 mb-10 text-center text-4xl font-bold">Contact Me</h1>

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
        <div className="dark:bg-dark/50 mt-3 mr-5 rounded-lg bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input
                required
                value={formData.name}
                onChange={handleChange}
                name="name"
                placeholder="Your name..."
                className="dark:bg-dark focus:ring-primary w-full rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 dark:border-gray-700"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Your email..."
                className="dark:bg-dark focus:ring-primary w-full rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 dark:border-gray-700"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-medium">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={handleChange}
                name="message"
                rows={4}
                minLength={20}
                placeholder="Your message..."
                className="dark:bg-dark focus:ring-primary w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-2 placeholder:text-gray-400 focus:ring-2 dark:border-gray-700"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status.state === 'submitting'}
              className="btn w-full bg-cyan-600 text-white hover:bg-cyan-600/80 disabled:bg-cyan-400/50"
            >
              {status.state === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            <div className="flex justify-center">
              {status.state === 'submitted' && (
                <SuccessMessage message={status.message} />
              )}

              {status.state === 'failed' && (
                <ErrorMessage message={status.error} />
              )}
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default ConnectForm
