import { useEffect } from 'react'

interface Props {
  message: string
  onDismiss?: () => void
  autoDismissDelay?: number
}

const SuccessMessage = ({
  message,
  onDismiss,
  autoDismissDelay = 5000,
}: Props) => {
  // auto-dismiss after delay if onDismiss is provided
  useEffect(() => {
    if (onDismiss && autoDismissDelay > 0) {
      const timer = setTimeout(() => {
        onDismiss()
      }, autoDismissDelay)

      return () => clearTimeout(timer)
    }
  }, [onDismiss, autoDismissDelay])

  return (
    <div className="relative rounded-md bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-200">
      <div className="flex items-center justify-between">
        <p className="flex-1">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
            aria-label="Dismiss message"
          >
            <span className="text-xl font-bold">×</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default SuccessMessage
