import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAgentContext, logAgentContext } from '@/data/agentContext'

// cheapest deepseek model: 'deepseek-v4-flash',
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

// DeepSeek API client (OpenAI-compatible)
const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

/* rate limiting configuration - prevents abuse by limiting requests per IP */
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW_MS = 5_000 // 5 seconds
const MAX_REQUESTS_PER_WINDOW = 1 // 1 request per 5 seconds

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// POST /api/agent - handles chat requests with portfolio context
export async function POST(request: Request) {
  // rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const clientData = rateLimitMap.get(ip)

  if (clientData) {
    // reset counter if window expired
    if (now - clientData.timestamp > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, timestamp: now })
    }
    // check if limit exceeded
    else if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          message: 'Too many requests. Please wait a moment.',
          retryAfter: Math.ceil(
            (RATE_LIMIT_WINDOW_MS - (now - clientData.timestamp)) / 1000,
          ),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(
              Math.ceil(
                (RATE_LIMIT_WINDOW_MS - (now - clientData.timestamp)) / 1000,
              ),
            ),
          },
        },
      )
    } else {
      // increment counter
      rateLimitMap.set(ip, {
        count: clientData.count + 1,
        timestamp: clientData.timestamp,
      })
    }
  } else {
    // first request from this IP
    rateLimitMap.set(ip, { count: 1, timestamp: now })
  }

  /* clean up old entries (prevent memory leak) */
  if (rateLimitMap.size > 100) {
    const expiryTime = now - RATE_LIMIT_WINDOW_MS
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.timestamp < expiryTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  /* parse and validate request */
  try {
    const { messages } = (await request.json()) as { messages: Message[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: 'No messages provided.' },
        { status: 400 },
      )
    }

    /* get agent context with dynamic data */
    const { systemPrompt, currentDate, timestamp } = getAgentContext()

    // DEBUG: log context in development
    console.log('CONTEXT_1 length:', process.env.AGENT_CONTEXT_1?.length ?? 0)
    console.log('CONTEXT_2 length:', process.env.AGENT_CONTEXT_2?.length ?? 0)
    console.log('CONTEXT_3 length:', process.env.AGENT_CONTEXT_3?.length ?? 0)
    console.log('CONTEXT_4 length:', process.env.AGENT_CONTEXT_4?.length ?? 0)

    // enhanced system prompt with dynamic context
    const enhancedSystemPrompt = `
        ${systemPrompt}

        === DYNAMIC CONTEXT ===
        Current Date: ${currentDate}
        Timestamp: ${timestamp}
        Session ID: ${ip.substring(0, 8)}

        Remember to keep responses focused on the developer's portfolio and expertise.
        Always be helpful, professional, and accurate.
    `

    // log context in development
    if (process.env.NODE_ENV === 'development') {
      logAgentContext()
      console.log('Messages received:', messages.length)
      console.log('Enhanced prompt length:', enhancedSystemPrompt.length)
    }

    /* call DeepSeek API */
    const response = await client.chat.completions.create({
      model: MODEL,
      // model: 'deepseek-chat', // = alternative model -> more expensive than deepseek-v4-flash
      max_tokens: 1024, // alternative: 1024
      temperature: 0.7, // balanced creativity vs consistency
      messages: [
        { role: 'system', content: enhancedSystemPrompt },
        ...messages,
      ],
    })

    /* extract and return response */
    const reply =
      response.choices[0].message.content?.trim() ??
      'Sorry, I could not generate a response.'

    // log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Response generated:', reply.substring(0, 100) + '...')
      console.log('Token usage:', response.usage)
    }

    return NextResponse.json({
      reply,
      metadata: {
        timestamp: new Date().toISOString(),
        model: response.model,
      },
    })
  } catch (error) {
    /* error handling */
    console.error('Agent API error:', error)

    // specific error handling
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { message: 'API key configuration error.' },
          { status: 500 },
        )
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { message: 'DeepSeek API rate limit exceeded. Please try later.' },
          { status: 429 },
        )
      }
    }

    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}

// For Testing Purposes:
// Postman
// + in Terminal: Example Test Request with curl:
/*
    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "What skills do you have?"}]}'

    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "Tell me more details about your backend skills"}]}'
*/
