// import { NextResponse } from 'next/server'

// console.log('=== MIDDLEWARE FILE LOADED ===')

// export function middleware() {
//   console.log('=== MIDDLEWARE FUNCTION CALLED ===')
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// }

import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

// checks the session on every /admin request before the page renders,
// redirecting based on the "authorized" callback in auth.config.ts
export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/admin/:path*'],
}
