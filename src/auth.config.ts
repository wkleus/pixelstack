import type { NextAuthConfig } from 'next-auth'

/* edge-safe auth.js configuration for Next.js */
export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log('PROXY DEBUG:', {
        path: nextUrl.pathname,
        hasAuth: !!auth,
        hasUser: !!auth?.user,
      })

      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname === '/admin/login'

      if (isOnLoginPage) {
        // if signed in -> skip login form & go directly to dashboard
        if (isLoggedIn) {
          return Response.redirect(new URL('/admin/adminDashboard', nextUrl))
        }
        return true
      }

      return true
    },
  },
  providers: [], // configured in src/auth.ts
} satisfies NextAuthConfig
