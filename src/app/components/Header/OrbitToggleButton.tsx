// Renders a pause/play control in the header for the home hero orbit animation
// Hidden off the homepage and below the 1600px breakpoint where the orbit is not shown

'use client'

import { useEffect, useState } from 'react'
import { useMotion } from '@/app/context/MotionContext'
import { Pause, Play } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Tooltip from '@/app/components/ui/Tooltip'

export default function OrbitToggleButton() {
  const { orbitEnabled, toggleOrbit } = useMotion()
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1600px)')
    const checkSize = () => setIsLargeScreen(mq.matches)
    checkSize()
    mq.addEventListener('change', checkSize)
    return () => mq.removeEventListener('change', checkSize)
  }, [])

  // Orbit only exists on the home hero and at ≥1600px
  if (pathname !== '/' || !isLargeScreen) return null

  return (
    <Tooltip
      text={orbitEnabled ? 'Pause orbit animation' : 'Play orbit animation'}
    >
      <button
        type="button"
        onClick={toggleOrbit}
        className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-cyan-500 dark:text-white dark:hover:bg-gray-800"
        aria-pressed={orbitEnabled}
        aria-label={
          orbitEnabled ? 'Pause orbit animation' : 'Play orbit animation'
        }
        title={orbitEnabled ? 'Pause orbit animation' : 'Play orbit animation'}
      >
        {orbitEnabled ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>
    </Tooltip>
  )
}
