'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '../../context/ThemeContext'
import Image from 'next/image'
import ThemeSwitchButton from './ThemeSwitchButton'
import MobileMenu from './MobileMenu'

const HeaderNav = () => {
  // Access the current theme from the custom ThemeContext
  const { theme } = useTheme()

  // Navigation items for both desktop and mobile menus
  const menuItems = [
    { label: 'Welcome', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Posts', href: '/posts' },
    { label: 'Connect', href: '/connect' },
    { label: 'Profile', href: '/profile' },
  ]

  // Get the current route to highlight the active menu item
  const pathname = usePathname()

  return (
    // Sticky navigation bar with dynamic blur based on theme
    <nav
      className="dark:bg-primary/10 fixed z-50 w-full border-b border-gray-200 bg-white/80 shadow-sm transition-colors dark:border-cyan-900"
      style={{
        backdropFilter: theme === 'dark' ? 'blur(40px)' : 'blur(10px)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop navigation layout */}
        <div className="flex items-center justify-between">
          {/* Logo linking back to the homepage */}
          <Link href="/" className="text-xl font-bold text-cyan-500">
            <div className="relative h-24 w-32">
              <Image
                src="/logos/logo-4.png"
                alt="logo"
                fill
                sizes="auto"
                className="object-contain"
                priority
                // loading="eager"
              />
            </div>
          </Link>

          {/* Desktop menu items (hidden on mobile) */}
          <ul className="hidden items-center space-x-8 md:flex">
            {menuItems.map((item) => {
              const isActive = item.href === pathname

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`text-lg transition-colors hover:text-cyan-500 ${
                      isActive ? 'font-bold text-cyan-500' : 'font-semibold'
                    }`}
                    style={{
                      // Add subtle text shadow in dark mode for readability
                      textShadow: theme === 'dark' ? '1px 1px 0 black' : 'none',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}

            {/* Theme toggle button (light/dark mode) */}
            <ThemeSwitchButton />
          </ul>
        </div>

        {/* Mobile menu (hamburger + drawer) */}
        <MobileMenu />
      </div>
    </nav>
  )
}

export default HeaderNav
