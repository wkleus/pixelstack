import type { Metadata } from 'next'
import './globals.css'
import HeaderNav from './components/Header/HeaderNav'
import { ThemeProvider } from './context/ThemeContext'
import { AgentProvider } from './context/AgentContext'
import Footer from './components/Footer/Footer'
import AgentWidget from './components/Agent/AgentWidget'
import Script from 'next/script'
import { MotionProvider } from './context/MotionContext'

const ionosWebsite = process.env.NEXT_PUBLIC_IONOS_WEBSITE

/**
 * Global metadata for entire app -> defines SEO information, Open Graph data + base URL for metadata links
 */
export const metadata: Metadata = {
  title: 'PixelStack',
  description:
    'Web App Portfolio, a Full Stack Web Developer specializing in React, Next.js, and modern web technologies.',
  metadataBase: new URL(`${ionosWebsite}`),
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
          <MotionProvider>
            {/* AgentProvider gives HeaderNav and AgentWidget one shared
              conversation/unread state instead of two independent copies */}
            <AgentProvider>
              {/* Global navigation bar */}
              <HeaderNav />

              {/* Main content area with spacing below the fixed header */}
              <main className="min-h-screen pt-24">{children}</main>

              {/* Global footer */}
              <Footer />

              {/* AI-powered agent — floating widget visible on all pages */}
              <AgentWidget />
            </AgentProvider>
          </MotionProvider>
        </ThemeProvider>

        {/* Self-hosted Umami analytics — tracks visits across both the
            IONOS and Vercel deployments under a single website ID */}
        <Script
          src="https://umami-eta-tan.vercel.app/script.js"
          data-website-id="fd1d0790-db23-47be-ae23-8db9823fc5c8"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
