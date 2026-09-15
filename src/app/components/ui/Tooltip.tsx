'use client'

export default function Tooltip({
  text,
  position = 'top',
  children,
}: {
  text: string
  position?: 'top' | 'left'
  children: React.ReactNode
}) {
  const isLeft = position === 'left'

  const positionClass = isLeft
    ? 'right-full top-1/2 mr-2 -translate-y-1/2'
    : 'bottom-full left-1/2 mb-0.5 -translate-x-1/2'

  // Outer triangle = border color (cyan)
  const tipBorderClass = isLeft
    ? 'top-1/2 left-full -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-l-cyan-400/50'
    : 'top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-t-cyan-400/50'

  // Inner triangle = fill (sits 1px inward)
  const tipFillClass = isLeft
    ? 'top-1/2 left-full -translate-y-1/2 -ml-px border-y-4 border-y-transparent border-l-4 border-l-gray-700/90 dark:border-l-gray-800/80'
    : 'top-full left-1/2 -translate-x-1/2 -mt-px border-x-4 border-x-transparent border-t-4 border-t-gray-700/90 dark:border-t-gray-800/80'

  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span
        className={`pointer-events-none absolute ${positionClass} z-50 rounded-md border border-cyan-400/50 bg-gray-700/90 px-1.5 py-0.5 text-[10px] whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-800/80 dark:text-gray-200`}
      >
        {text}
        {/* border layer */}
        <span aria-hidden className={`absolute h-0 w-0 ${tipBorderClass}`} />
        {/* fill layer */}
        <span aria-hidden className={`absolute h-0 w-0 ${tipFillClass}`} />
      </span>
    </div>
  )
}