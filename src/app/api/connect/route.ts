import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Debug: Check if env is loading correctly
console.log('\n=== Environment Check Start ===')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
console.log(
  'RESEND_API_KEY first 5 chars:',
  process.env.RESEND_API_KEY?.substring(0, 5),
)
console.log('RESEND_FROM:', process.env.RESEND_FROM)
console.log('RESEND_TO:', process.env.RESEND_TO)
console.log('=== Environment Check End ===\n')

// Resend client - initialized once, reused across requests
const resend = new Resend(process.env.RESEND_API_KEY)

// In-memory rate limiter
// Stores the timestamp of the last request per IP address.
// Resets when the server restarts
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 60_000 // 1 request per IP per minute

interface ContactRequestBody {
  name: string
  email: string
  message: string
}

// HELPERS

// Basic email format validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// HTML-escape user input to prevent XSS in the email body
function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// POST /api/connect
export async function POST(request: Request) {
  // Rate limiting
  // Extract the caller's IP from the proxy header
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const lastRequest = rateLimitMap.get(ip) ?? 0

  if (Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      {
        message: 'Too many requests. Please wait a moment before trying again.',
      },
      { status: 429 },
    )
  }

  // Record the timestamp before processing so even failed requests count
  rateLimitMap.set(ip, Date.now())

  try {
    // Parse body
    const body = (await request.json()) as ContactRequestBody

    // Validate: required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { message: 'Missing required fields.' },
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

    // Validate: field lengths
    if (body.name.length < 2 || body.name.length > 50) {
      return NextResponse.json(
        { message: 'Name must be between 2 and 50 characters.' },
        { status: 400 },
      )
    }

    if (body.message.length < 20 || body.message.length > 300) {
      return NextResponse.json(
        { message: 'Message must be between 20 and 300 characters.' },
        { status: 400 },
      )
    }

    // Sanitize
    const sanitizedData = {
      name: sanitizeString(body.name),
      email: sanitizeString(body.email),
      message: sanitizeString(body.message),
    }

    // Debug: Show the complete from-string
    const fromString = `PixelStack Contact <${process.env.RESEND_FROM}>`
    console.log('Sending from:', fromString)
    console.log('\n')

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: `PixelStack Contact <${process.env.RESEND_FROM}>`,
      to: process.env.RESEND_TO!,
      replyTo: sanitizedData.email, // clicking "Reply" goes to the sender
      subject: `New message from ${sanitizedData.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 80px;">Name</td>
              <td style="padding: 8px 0;">${sanitizedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;">${sanitizedData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${sanitizedData.message}</td>
            </tr>
          </table>
        </div>
      `,
    })

    // Handle Resend errors
    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error:', error)
      }
      return NextResponse.json(
        { message: 'Failed to send message. Please try again.' },
        { status: 500 },
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Email sent successfully to:', process.env.RESEND_TO)
    }

    return NextResponse.json({ message: 'Message sent successfully.' })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Unexpected error in /api/connect:', error)
    }

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.'

    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
