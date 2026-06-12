import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 60_000

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// POST /api/newsletter
export async function POST(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const lastRequest = rateLimitMap.get(ip) ?? 0

  if (Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { message: 'Too many requests. Please wait a moment before trying again.' },
      { status: 429 },
    )
  }

  rateLimitMap.set(ip, Date.now())

  try {
    // Parse body
    const body = (await request.json()) as { email: string }

    // Validate: required field
    if (!body.email) {
      return NextResponse.json(
        { message: 'Email is required.' },
        { status: 400 },
      )
    }

    // Validate: email format
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { message: 'Invalid email format.' },
        { status: 400 },
      )
    }

    // Sanitize
    const email = sanitizeString(body.email)

    // Notify admin about new newsletter subscription
    const { error } = await resend.emails.send({
      from: `PixelStack Newsletter <${process.env.RESEND_FROM}>`,
      to: process.env.RESEND_TO!,
      subject: 'New newsletter subscription',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Newsletter Subscriber</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 80px;">Email</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Date</td>
              <td style="padding: 8px 0;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
          </table>
        </div>
      `,
    })

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error (newsletter):', error)
      }
      return NextResponse.json(
        { message: 'Failed to subscribe. Please try again.' },
        { status: 500 },
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Newsletter subscription from:', email)
    }

    return NextResponse.json({ message: 'Subscribed successfully.' })

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Unexpected error in /api/newsletter:', error)
    }

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.'

    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}