// allowed origins for public POST endpoints (/api/connect, /api/newsletter)
// that don't have Auth.js/Server-Action CSRF protection, since they're
// reachable without a login -> blocks cross-origin abuse from other
// websites' fetch() calls, while still allowing legitimate requests
const ALLOWED_ORIGINS = [
  'https://pixelstack.me',
  'https://pixelstack-me.vercel.app',
  'http://localhost:4000',
]

export function isAllowedOrigin(origin: string | null): boolean {
  // no origin header (e.g. server-to-server calls, curl) — allow
  if (!origin) return true

  if (ALLOWED_ORIGINS.includes(origin)) return true

  // Vercel sets VERCEL_URL automatically per deployment — covers also preview deployments
  if (
    process.env.VERCEL_URL &&
    origin === `https://${process.env.VERCEL_URL}`
  ) {
    return true
  }

  return false
}
