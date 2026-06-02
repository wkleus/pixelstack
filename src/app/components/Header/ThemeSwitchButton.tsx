import { useTheme } from '@/app/context/ThemeContext'
import { LightbulbIcon, LightbulbOff } from 'lucide-react'

export default function ThemeSwitchButton() {
  // Access the current theme and the function to toggle it
  const { theme, toggleTheme } = useTheme()

  return (
    // Button that toggles between light and dark mode
    <button
      className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 hover:text-cyan-500 dark:text-white dark:hover:bg-gray-800"
      onClick={toggleTheme} // Switch theme on click
      aria-pressed={theme === 'dark'} // Accessibility: indicates toggle state
      aria-label="Toggle theme" // Screen reader label
    >
      {/* Render the appropriate icon depending on the current theme */}
      {theme === 'dark' ? (
        <LightbulbIcon className="h-5 w-5" /> // Show sun icon in dark mode
      ) : (
        <LightbulbOff className="h-5 w-5" /> // Show moon icon in light mode
      )}
    </button>
  )
}
