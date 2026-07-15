import type { NextAuthConfig } from 'next-auth'

/* edge-safe auth.js configuration for Next.js */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname === '/admin/login'
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin')

      // if signed in -> skip login form & go directly to dashboard
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/admin/adminDashboard', nextUrl))
      }

      // not signed in + trying to access any /admin page (but not the login page itself)  → redirect to login
      if (isOnAdminPage && !isOnLoginPage && !isLoggedIn) {
        return Response.redirect(new URL('/admin/login', nextUrl))
      }

      // all other cases → allow
      return true
    },
  },
  providers: [], // configured in src/auth.ts
} satisfies NextAuthConfig
