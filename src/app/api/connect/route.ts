import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Resend client
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

// Email format validation
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

    // 1.Send the contact message to the inbox
    const { error: notifyError } = await resend.emails.send({
      from: `PixelStack Contact <${process.env.RESEND_FROM}>`,
      to: process.env.RESEND_TO!,
      replyTo: sanitizedData.email,
      subject: `New contact message from ${sanitizedData.name}`,
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

    if (notifyError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend error (notify):', notifyError)
      }
      return NextResponse.json(
        { message: 'Failed to send message. Please try again.' },
        { status: 500 },
      )
    }

    // Send a confirmation email back to the sender
    const { error: replyError } = await resend.emails.send({
      from: `PixelStack <${process.env.RESEND_FROM}>`,
      to: sanitizedData.email,
      subject: `Thanks for reaching out, ${sanitizedData.name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">

          <h2 style="color: #0891b2;">Thanks for your message!</h2>

          <p>Hi ${sanitizedData.name},</p>

          <p>
            I've received your message and will get back to you within
            <strong>1–2 business days</strong>.
          </p>

          <div style="margin: 24px 0; padding: 16px; background: #f4f4f5; border-left: 3px solid #0891b2; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #666;">Your message:</p>
            <p style="margin: 0; font-size: 15px;">${sanitizedData.message}</p>
          </div>

          <p style="color: #666; font-size: 13px;">
            If you have anything to add, simply reply to this email.
          </p>

          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />

          <p style="margin: 0; font-size: 13px; color: #999;">
            PixelStack &mdash;
            <a href="https://pixelstack.me" style="color: #0891b2; text-decoration: none;">pixelstack.me</a>
          </p>

        </div>
      `,
    })

    // If the auto-reply fails, it still returns success
    // The notification to the inbox was already sent
    if (replyError && process.env.NODE_ENV === 'development') {
      console.error('Resend error (auto-reply):', replyError)
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        'Emails sent — notify:',
        process.env.RESEND_TO,
        '/ auto-reply:',
        sanitizedData.email,
      )
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
