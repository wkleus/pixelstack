// Provides orbitEnabled state and toggleOrbit for the hero TechOrbit animation
// Preference is stored in localStorage and defaults off when prefers-reduced-motion is set

'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface MotionContextType {
  orbitEnabled: boolean
  toggleOrbit: () => void
}

const MotionContext = createContext<MotionContextType | undefined>(undefined)

const STORAGE_KEY = 'pixelstack-orbit-enabled'

export const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  const [orbitEnabled, setOrbitEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  const toggleOrbit = () => {
    setOrbitEnabled((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  useEffect(() => {
    queueMicrotask(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      // Saved preference wins; otherwise respect system reduced-motion
      if (saved !== null) {
        setOrbitEnabled(saved === 'true')
      } else if (prefersReduced) {
        setOrbitEnabled(false)
      }

      setMounted(true)
    })
  }, [])

  if (!mounted) return null

  return (
    <MotionContext.Provider value={{ orbitEnabled, toggleOrbit }}>
      {children}
    </MotionContext.Provider>
  )
}

export const useMotion = () => {
  const ctx = useContext(MotionContext)
  if (!ctx) throw new Error('useMotion must be used within MotionProvider')
  return ctx
}
