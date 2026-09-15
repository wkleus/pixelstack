// Renders a pause/play control in the header for the home hero orbit animation

'use client'

import { useMotion } from '@/app/context/MotionContext'
import { Pause, Play } from 'lucide-react'

export default function OrbitToggleButton() {
  const { orbitEnabled, toggleOrbit } = useMotion()

  return (
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
  )
}
