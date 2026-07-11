import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { isAllowedOrigin } from '@/lib/origin'

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
  topic: string
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
  // block cross-origin abuse from other websites' fetch() calls — this
  // route has no session, so Auth.js/Server-Action CSRF protection doesn't
  // apply here (-> src/lib/origin.ts s)
  const origin = request.headers.get('origin')
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ message: 'Forbidden.' }, { status: 403 })
  }

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
    if (!body.name || !body.email || !body.topic || !body.message) {
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
      topic: sanitizeString(body.topic),
      message: sanitizeString(body.message),
    }

    // Helper function to get human-readable topic labels
    function getTopicLabel(topic: string): string {
      const labels: Record<string, string> = {
        job: 'Job Offer',
        project: 'Project Inquiry',
        collaboration: 'Collaboration',
        quote: 'Quote Request',
        feedback: 'Feedback',
        support: 'Technical Support',
        interview: 'Interview Request',
        networking: 'Networking',
        other: 'Other',
      }
      return labels[topic] || topic.charAt(0).toUpperCase() + topic.slice(1)
    }

    // Send the contact message to the inbox
    const { error: notifyError } = await resend.emails.send({
      from: `PixelStack Contact <${process.env.RESEND_FROM}>`,
      to: process.env.RESEND_TO!,
      replyTo: sanitizedData.email,
      subject: `[${getTopicLabel(sanitizedData.topic)}] New contact message from ${sanitizedData.name}`,
      html: `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; background: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      
      <!-- Header -->
      <div style="padding: 28px 32px 0 32px; border-bottom: 1px solid #f0f0f0;">
        <p style="margin: 0; font-size: 13px; font-weight: 500; color: #0891b2; letter-spacing: 0.4px; text-transform: uppercase;">PixelStack</p>
        <h2 style="margin: 6px 0 20px 0; font-size: 20px; font-weight: 400; color: #1a1a1a; letter-spacing: -0.2px;">New Contact Message</h2>
      </div>
      
      <!-- Body -->
      <div style="padding: 28px 32px 20px 32px;">
        <table style="width: 100%; border-collapse: collapse; font-family: inherit;">
          <tr>
            <td style="padding: 10px 0 10px 0; font-weight: 500; color: #6b7280; width: 100px; font-size: 13px; border-bottom: 1px solid #f0f0f0;">Name</td>
            <td style="padding: 10px 0 10px 0; color: #1a1a1a; font-size: 15px; border-bottom: 1px solid #f0f0f0;">${sanitizedData.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0 10px 0; font-weight: 500; color: #6b7280; width: 100px; font-size: 13px; border-bottom: 1px solid #f0f0f0;">Email</td>
            <td style="padding: 10px 0 10px 0; color: #1a1a1a; font-size: 15px; border-bottom: 1px solid #f0f0f0;">
              <a href="mailto:${sanitizedData.email}" style="color: #0891b2; text-decoration: none;">${sanitizedData.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0 10px 0; font-weight: 500; color: #6b7280; width: 100px; font-size: 13px; border-bottom: 1px solid #f0f0f0;">Topic</td>
            <td style="padding: 10px 0 10px 0; color: #1a1a1a; font-size: 15px; border-bottom: 1px solid #f0f0f0;">
              <span style="background: #f0f7ff; color: #0891b2; padding: 3px 14px; border-radius: 4px; font-size: 13px; font-weight: 500; border: 1px solid #e0edfa;">
                ${getTopicLabel(sanitizedData.topic)}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding: 14px 0 4px 0; font-weight: 500; color: #6b7280; width: 100px; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 14px 0 4px 0; color: #1a1a1a; font-size: 15px; line-height: 1.7; vertical-align: top;">
              ${sanitizedData.message}
            </td>
          </tr>
        </table>
        
        <!-- Footer Note -->
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f0f0; text-align: left; font-size: 13px; color: #6b7280;">
          <p style="margin: 0; line-height: 1.6;">
            Reply directly to this email or use the reply-to address above.
          </p>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">
            Sent via PixelStack Contact Form
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="padding: 16px 32px; background: #f7f9fc; border-top: 1px solid #eaeaea;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          <a href="https://pixelstack.me" style="color: #0891b2; text-decoration: none; font-weight: 500;">pixelstack.me</a>
        </p>
      </div>
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
      subject: `Your ${getTopicLabel(sanitizedData.topic).toLowerCase()} inquiry – ${sanitizedData.name}`,
      html: `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; background: #ffffff; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      
      <!-- Header -->
      <div style="padding: 32px 32px 0 32px; border-bottom: 1px solid #f0f0f0;">
        <p style="margin: 0; font-size: 14px; font-weight: 500; color: #0891b2; letter-spacing: 0.3px; text-transform: uppercase;">PixelStack</p>
        <h1 style="margin: 8px 0 20px 0; font-size: 22px; font-weight: 400; color: #1a1a1a; letter-spacing: -0.2px;">Thank you for your message</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 32px;">
        <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #333333;">
          Dear ${sanitizedData.name},
        </p>
        
        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.7; color: #333333;">
          Thank you for reaching out regarding your 
          <span style="font-weight: 500; color: #0891b2;">${getTopicLabel(sanitizedData.topic).toLowerCase()}</span> 
          inquiry. I have received your message and will respond within 
          <span style="font-weight: 500;">1-2 business days</span>.
        </p>
        
        <!-- Topic -->
        <div style="margin: 0 0 24px 0; padding: 16px 20px; background: #f7f9fc; border-left: 3px solid #0891b2; border-radius: 4px;">
          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Topic</p>
          <p style="margin: 0; font-size: 15px; font-weight: 400; color: #1a1a1a;">${getTopicLabel(sanitizedData.topic)}</p>
        </div>
        
        <!-- Message Preview -->
        <div style="margin: 0 0 24px 0; padding: 16px 20px; background: #f7f9fc; border-radius: 4px;">
          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 500; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Your message</p>
          <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #1a1a1a;">${sanitizedData.message}</p>
        </div>
        
        <p style="margin: 0 0 8px 0; font-size: 15px; line-height: 1.7; color: #333333;">
          Should you need to add any additional information, please feel free to reply directly to this email.
        </p>
        
        <p style="margin: 24px 0 0 0; font-size: 15px; line-height: 1.7; color: #333333;">
          I look forward to connecting with you soon.
        </p>
        
        <p style="margin: 24px 0 0 0; font-size: 15px; color: #333333; line-height: 1.7;">
          Best regards,<br>
          <span style="font-weight: 500;">PixelStack</span>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px 32px; background: #f7f9fc; border-top: 1px solid #eaeaea; text-align: left;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          <a href="https://pixelstack.me" style="color: #0891b2; text-decoration: none; font-weight: 500;">pixelstack.me</a>
          <span style="margin: 0 8px; color: #d1d5db;">|</span>
          <span style="color: #6b7280;">This is an automated confirmation</span>
        </p>
      </div>
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
