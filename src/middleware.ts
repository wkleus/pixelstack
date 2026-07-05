import { NextResponse } from 'next/server'

console.log('=== MIDDLEWARE FILE LOADED ===')

export function middleware() {
  console.log('=== MIDDLEWARE FUNCTION CALLED ===')
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
