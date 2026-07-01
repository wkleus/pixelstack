'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Main grid */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundImage: isHovering
              ? `
                linear-gradient(to right, rgba(20, 184, 166, 0.22) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(20, 184, 166, 0.22) 1px, transparent 1px)
              `
              : `
                linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
              `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Mouse-following spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.2) 0%, transparent 250px)`,
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
        style={{
          opacity: isHovering ? 0.4 : 0.6,
          backgroundImage: isHovering
            ? `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.25) 1.5px, transparent 1.5px)`
            : `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Primary background gradient */}
      <div className="from-primary/20 before:bg-primary/40 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b to-transparent before:absolute before:top-10 before:left-1/2 before:h-[600px] before:w-[600px] before:-translate-x-1/2 before:rounded-full before:opacity-20 before:blur-[120px] before:content-['']" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        {/* 404 number */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-2 text-[10rem] leading-none font-bold tracking-tight text-cyan-500/20 select-none md:text-[14rem]"
        >
          404
        </motion.h1>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="-mt-6 mb-4 text-3xl font-bold tracking-tight md:text-4xl"
        >
          Page not found
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-md text-lg text-gray-500 dark:text-gray-400"
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/"
            className="rounded-lg bg-amber-600 px-8 py-3 font-bold text-white transition-colors hover:bg-cyan-600"
          >
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="rounded-lg border-2 border-cyan-300 px-8 py-3 font-bold text-cyan-500 transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-cyan-700 dark:text-gray-300 dark:hover:text-amber-400"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NotFound
