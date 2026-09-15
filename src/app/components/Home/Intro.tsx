'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimationFrame } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  SiReact,
  SiGit,
  SiNextdotjs,
  SiTypescript,
  SiAiohttp,
} from 'react-icons/si'
import { useMotion } from '@/app/context/MotionContext'

// Tech Orbit Component: Displays tech icons orbiting around a central point
const TechOrbit = () => {
  // Web Framework & Tech Tool Icons
  const techSymbols = [
    { icon: SiReact, label: 'React' },
    { icon: SiGit, label: 'Git' },
    { icon: SiNextdotjs, label: 'Next.js' },
    { icon: SiTypescript, label: 'TypeScript' },
    { icon: SiAiohttp, label: 'AI HTTP' },
  ]

  const { orbitEnabled } = useMotion()

  // Same radii for SVG and icons
  const orbitRadiusX = 620
  const orbitRadiusY = 330

  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useAnimationFrame((t) => {
    const time = t / 1000 // Seconds instead of ms

    techSymbols.forEach((_, index) => {
      const baseAngle = (index / techSymbols.length) * Math.PI * 2
      const currentAngle = baseAngle + time * 0.2
      const x = Math.cos(currentAngle) * orbitRadiusX
      const y = Math.sin(currentAngle) * orbitRadiusY

      const el = iconRefs.current[index]

      if (!orbitEnabled) return

      if (el) {
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }
    })
  })

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Orbit Container with SVG */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative -rotate-10">
          <svg
            className="absolute top-1/2 left-1/2 h-200 w-350 -translate-x-1/2 -translate-y-1/2 opacity-70"
            viewBox="-700 -400 1400 800"
          >
            <ellipse
              cx="0"
              cy="0"
              rx={orbitRadiusX}
              ry={orbitRadiusY}
              fill="none"
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="10 3"
            />
          </svg>

          {/* Icons follow the orbit line exactly */}
          {techSymbols.map((symbol, index) => {
            const IconComponent = symbol.icon

            return (
              <div
                key={symbol.label}
                ref={(el) => {
                  iconRefs.current[index] = el
                }}
                className="absolute top-1/2 left-1/2 will-change-transform"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/5 ring-1 ring-cyan-500/30 backdrop-blur-sm transition-all hover:scale-110">
                  <IconComponent size={32} className="text-cyan-500/30" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Intro = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const [isDark, setIsDark] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  const { orbitEnabled } = useMotion()

  useEffect(() => {
    const root = document.documentElement
    const checkDark = () => setIsDark(root.classList.contains('dark'))
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    const mq = window.matchMedia('(min-width: 1600px)')
    const checkSize = () => setIsLargeScreen(mq.matches)
    checkSize()
    mq.addEventListener('change', checkSize)

    return () => {
      observer.disconnect()
      mq.removeEventListener('change', checkSize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      className="3xl:py-20 relative min-h-[80vh] overflow-hidden py-0 lg:min-h-screen"
      style={{
        paddingTop: 'clamp(2rem, 7rem, 8rem)',
        paddingBottom: 'clamp(2rem, 2vw, 8rem)',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Orbit Background */}
      {isDark && isLargeScreen && orbitEnabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <TechOrbit />
        </motion.div>
      )}

      {/* Grid – Background only */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
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

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.25) 0%, transparent 250px)`,
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
        style={{
          opacity: isHovering ? 0.4 : 0.6,
          backgroundImage: isHovering
            ? `radial-gradient(circle at 2px 2px, rgba(20, 184, 166, 0.25) 1.5px, transparent 1.5px)`
            : `radial-gradient(circle at 2px 2px, rgba(6, 182, 212, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="from-primary/20 before:bg-primary/40 pointer-events-none absolute inset-0 z-0 bg-linear-to-b to-transparent before:absolute before:top-10 before:left-1/2 before:h-225 before:w-225 before:-translate-x-1/2 before:rounded-full before:opacity-20 before:blur-[120px] before:content-['']" />

      {/* Content with a higher z-index (above the grid) */}
      <div className="4xl:py-15 relative z-10 mx-auto max-w-4xl px-4 py-0 pb-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="4xl:mb-8 mb-4 flex justify-center"
        >
          <div className="relative h-42 w-42 overflow-hidden rounded-full shadow-xl ring-4 ring-white/40 dark:ring-cyan-700/70">
            <Image
              src={
                isDark
                  ? '/avatars/profile-avatar10.png'
                  : '/avatars/profile-avatar3.png'
              }
              alt="profile picture"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              className="object-cover"
              style={{
                objectPosition: 'center',
                transform: isDark
                  ? 'scale(1.5) translateX(-10px) translateY(16%)'
                  : 'scale(1.5) translateX(-5px) translateY(16%)',
              }}
              loading="eager"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20, x: 120 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl leading-tight font-bold tracking-tight md:text-5xl"
        >
          Crafting Digital Experiences
          <span className="block text-cyan-500">with Precision & Style</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, x: -120 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.4 }}
          className="mx-auto mt-5 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
        >
          Full Stack Developer & Designer — building elegant, fast and modern
          web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8 }}
          className="4xl:mt-12 mt-8 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/portfolio"
            className="w-full rounded-lg bg-amber-600 px-8 py-3 font-bold text-white transition-colors hover:bg-cyan-600 sm:w-auto"
          >
            View Portfolio
          </Link>

          <Link
            href="/connect"
            className="w-full rounded-lg border-2 border-cyan-300 px-10 py-3 font-bold text-cyan-500 transition-colors hover:border-2 hover:border-amber-500 hover:text-amber-600 sm:w-auto dark:border-cyan-700 dark:text-gray-300 dark:hover:text-amber-400"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Intro
