import { Mail, Phone, MessageCircle, Send, AtSign, Contact } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Contact-themed icons
const ICONS: LucideIcon[] = [Mail, Phone, MessageCircle, Send, AtSign, Contact]

// Subtle, theme-aware color classes
const COLOR_CLASSES = [
  'text-primary/15 dark:text-primary/20',
  'text-secondary/15 dark:text-secondary/20',
  'text-gray-400/25 dark:text-gray-500/20',
]

// NOTE: Kept low on purpose — the connect page is a form the user needs to focus
// on, so the effect should read as a hint, not a distraction
const ICON_COUNT = 8

// Deterministic pseudo-random helper
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

interface IconConfig {
  key: number
  Icon: LucideIcon
  colorClass: string
  left: number
  size: number
  fallDuration: number
  fallDelay: number
  swayDuration: number
  swayDelay: number
  opacity: number
}

const iconConfigs: IconConfig[] = Array.from({ length: ICON_COUNT }, (_, i) => {
  const fallDuration = 16 + pseudoRandom(i * 13 + 2) * 14 // 16–30s
  return {
    key: i,
    Icon: ICONS[Math.floor(pseudoRandom(i * 31 + 5) * ICONS.length)],
    colorClass:
      COLOR_CLASSES[
        Math.floor(pseudoRandom(i * 17 + 8) * COLOR_CLASSES.length)
      ],
    left: pseudoRandom(i * 7 + 1) * 100,
    size: 28 + pseudoRandom(i * 29 + 4) * 34, // 28–62px
    fallDuration,
    fallDelay: -pseudoRandom(i * 19 + 3) * fallDuration,
    swayDuration: 3 + pseudoRandom(i * 37 + 6) * 3,
    swayDelay: -pseudoRandom(i * 41 + 7) * 6,
    opacity: 0.4 + pseudoRandom(i * 23 + 9) * 0.5,
  }
})

/* Purely decorative background: a sparse drift of mail/phone/contact icons */
const ConnectIconRain = () => {
  return (
    <div
      className="icon-rain pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {iconConfigs.map(
        ({
          key,
          Icon,
          colorClass,
          left,
          size,
          fallDuration,
          fallDelay,
          swayDuration,
          swayDelay,
          opacity,
        }) => (
          <div
            key={key}
            className="icon-rain-item absolute top-0"
            style={{
              left: `${left}%`,
              animationDuration: `${fallDuration}s`,
              animationDelay: `${fallDelay}s`,
            }}
          >
            <div
              className="icon-rain-sway"
              style={{
                animationDuration: `${swayDuration}s`,
                animationDelay: `${swayDelay}s`,
              }}
            >
              <Icon
                size={size}
                className={colorClass}
                style={{ opacity }}
                strokeWidth={1.5}
              />
            </div>
          </div>
        ),
      )}
    </div>
  )
}

export default ConnectIconRain
