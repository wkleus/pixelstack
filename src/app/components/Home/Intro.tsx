'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkle, Star, Zap } from 'lucide-react'
import { useState } from 'react'

const Intro = () => {
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
      className="relative min-h-screen overflow-hidden py-35"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Grid – Background only */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Main grid — always visible, cyan at rest, cyan-greenish on hover */}
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

        {/* Mouse-following spotlight effect — only visible on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.25) 0%, transparent 250px)`,
          }}
        />
      </div>

      {/* Additional fine dot grid for depth — always visible, color changes on hover */}
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
      <div className="from-primary/20 before:bg-primary/40 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b to-transparent before:absolute before:top-10 before:left-1/2 before:h-[900px] before:w-[900px] before:-translate-x-1/2 before:rounded-full before:opacity-20 before:blur-[120px] before:content-['']" />

      {/* Animated icons */}
      <div className="hidden dark:xl:block">
        <motion.div
          initial={{ opacity: 0, y: 20, x: 120 }}
          animate={{ opacity: 0.5, y: -100, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Sparkle className="dark:fill-primary/8 dark:stroke-primary/0 fill-primary/5 stroke-primary/0 absolute top-15 right-20 h-25 w-25 rotate-45 transform animate-pulse drop-shadow-[0_0_6px_rgba(255,255,200,0.6)] lg:right-100" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -300, x: 120 }}
          animate={{ opacity: 0.5, y: -100, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Zap className="dark:fill-primary/8 dark:stroke-primary/0 fill-primary/5 stroke-primary/0 absolute top-40 left-20 h-36 w-36 -rotate-12 transform animate-pulse drop-shadow-[0_0_6px_rgba(255,200,150,0.6)] lg:left-90" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, x: -120 }}
          animate={{ opacity: 0.5, y: -100, x: 0 }}
          transition={{ duration: 2 }}
        >
          <Star className="dark:fill-primary/7 dark:stroke-primary/0 absolute top-152 right-122 h-15 w-15 rotate-90 transform animate-pulse fill-cyan-500 stroke-cyan-500 drop-shadow-[0_0_6px_rgba(255,255,200,0.6)]" />
          <Star className="dark:fill-primary/10 dark:stroke-primary/0 absolute top-152.5 right-105 h-22 w-22 rotate-45 transform animate-pulse fill-cyan-500 stroke-cyan-500 drop-shadow-[0_0_6px_rgba(255,255,200,0.6)]" />
        </motion.div>
      </div>

      {/* Content with a higher z-index (above the grid) */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Avatar with fade-in + scale animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <Image
            src="/avatars/profile-avatar.png"
            alt="profile picture"
            width={130}
            height={130}
            loading="eager"
            priority
            className="rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-gray-800"
          />
        </motion.div>

        {/* Main headline with slide-in animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20, x: 120 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl leading-tight font-bold tracking-tight md:text-5xl"
        >
          Crafting Digital Experiences
          <span className="block text-cyan-500">with Precision & Style</span>
        </motion.h1>

        {/* Subheadline with opposite slide-in direction */}
        <motion.p
          initial={{ opacity: 0, y: 20, x: -120 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.4 }}
          className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
        >
          Full Stack Developer & Designer — building elegant, fast and modern
          web applications.
        </motion.p>

        {/* Call-to-action buttons with upward fade animation */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="mt-10 flex justify-center gap-4"
        >
          {/* Portfolio button */}
          <Link
            href="/portfolio"
            className="rounded-lg bg-amber-600 px-8 py-3 font-bold text-white transition-colors hover:bg-cyan-600"
          >
            View Portfolio
          </Link>

          {/* Contact button */}
          <Link
            href="/connect"
            className="rounded-lg border-2 border-cyan-300 px-10 py-3 font-bold text-cyan-500 transition-colors hover:border-2 hover:border-amber-500 hover:text-amber-600 dark:border-cyan-700 dark:text-gray-300 dark:hover:text-amber-400"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Intro
