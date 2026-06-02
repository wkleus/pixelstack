import type { Metadata } from 'next'
import './globals.css'
import HeaderNav from './components/Header/HeaderNav'
import { ThemeProvider } from './context/ThemeContext'
import Footer from './components/Footer/Footer'

/**
 * Global metadata for the entire application.
 * This defines SEO information, Open Graph data,
 * and the base URL for all metadata links.
 */
export const metadata: Metadata = {
  title: 'PixelStack',
  description:
    'Web App Portfolio, a Full Stack Web Developer specializing in React, Next.js, and modern web technologies.',
  metadataBase: new URL('https://pixelstack.me'),
  openGraph: {
    title: 'WebFolio – Full Stack Developer Portfolio',
    description:
      'Explore portfolio works, blog posts and skills, a Full Stack Web Developer.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* Global body wrapper with theme-aware background */}
      <body
        className={`bg-white antialiased transition-colors dark:bg-gray-900 dark:text-white`}
      >
        {/* ThemeProvider makes the theme accessible across the entire app */}
        <ThemeProvider>
          {/* Global navigation bar */}
          <HeaderNav />

          {/* Main content area with spacing below the fixed header */}
          <main className="min-h-screen pt-24">{children}</main>

          {/* Global footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
