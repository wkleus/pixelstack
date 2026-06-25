import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { agentContent } from '@/data/agentContent'

// DeepSeek client — uses OpenAI-compatible API
const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

// Rate limiter — 1 request per IP per 5 seconds
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_WINDOW_MS = 5_000

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// POST /api/agent
export async function POST(request: Request) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const lastRequest = rateLimitMap.get(ip) ?? 0

  if (Date.now() - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { message: 'Too many requests. Please wait a moment.' },
      { status: 429 },
    )
  }

  rateLimitMap.set(ip, Date.now())

  try {
    // Parse conversation history from request body
    const { messages } = (await request.json()) as { messages: Message[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: 'No messages provided.' },
        { status: 400 },
      )
    }

    // Call DeepSeek API with portfolio content as system prompt
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      max_tokens: 1024,
      messages: [{ role: 'system', content: agentContent }, ...messages],
    })

    const reply =
      response.choices[0].message.content ??
      'Sorry, I could not generate a response.'

    return NextResponse.json({ reply })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Agent API error:', error)
    }
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}

// For Testing Purposes:
// Example Test Request in Postman tool or in Terminal with curl:
/*
    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "What skills do you have?"}]}'

    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "Tell me more details about your backend skills"}]}'
*/
