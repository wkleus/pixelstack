import {
  BookOpen,
  FileText,
  PenLine,
  Rss,
  Code2,
  Terminal,
  Hash,
  Bookmark,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Curated set of icons that fit a dev blog
const ICONS: LucideIcon[] = [
  BookOpen,
  FileText,
  PenLine,
  Rss,
  Code2,
  Terminal,
  Hash,
  Bookmark,
]

// Subtle, theme-aware color classes
const COLOR_CLASSES = [
  'text-primary/15 dark:text-primary/20',
  'text-secondary/15 dark:text-secondary/20',
  'text-gray-400/25 dark:text-gray-500/20',
]

const ICON_COUNT = 10

// Deterministic pseudo-random helper (sine hash)
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

interface IconConfig {
  key: number
  Icon: LucideIcon
  colorClass: string
  left: number // vw
  size: number // px
  fallDuration: number // s
  fallDelay: number // s (negative → already mid-fall on load)
  swayDuration: number // s
  swayDelay: number // s
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
    fallDelay: -pseudoRandom(i * 19 + 3) * fallDuration, // stagger on load
    swayDuration: 3 + pseudoRandom(i * 37 + 6) * 3, // 3–6s
    swayDelay: -pseudoRandom(i * 41 + 7) * 6,
    opacity: 0.4 + pseudoRandom(i * 23 + 9) * 0.5, // 0.4–0.9 of the color's own alpha
  }
})

/**
 * Purely decorative background: blog-related icons drifting down behind the
 * page content; hidden automatically for prefers-reduced-motion
 */
const BlogIconRain = () => {
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

export default BlogIconRain
