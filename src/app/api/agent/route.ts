import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAgentContext, logAgentContext } from '@/data/agentContext'

// cheapest deepseek model: 'deepseek-v4-flash'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

// DeepSeek API client (OpenAI-compatible)
const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

// rate limiting configuration - prevents abuse by limiting requests per IP
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW_MS = 5_000 // 5 seconds
const MAX_REQUESTS_PER_WINDOW = 1 // 1 request per 5 seconds

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// tool definition — tells DeepSeek what tools it can use
// DeepSeek will decide on its own when to call this tool
const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'prefill_contact_form',
      description:
        'Opens the contact form and pre-selects a topic. Use this when the user expresses intent to contact the developer — for a job offer, collaboration, project inquiry, quote request, feedback, or any other reason.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            // must match the exact values in ConnectForm's <select>
            enum: [
              'job',
              'project',
              'collaboration',
              'quote',
              'feedback',
              'other',
            ],
            description: "The topic that best matches the user's intent",
          },
        },
        required: ['topic'],
      },
    },
  },
]

// maps topic values to human-readable labels for the tool result message
const TOPIC_LABELS: Record<string, string> = {
  job: 'Job Offer',
  project: 'Project Inquiry',
  collaboration: 'Collaboration',
  quote: 'Request a Quote',
  feedback: 'Feedback',
  other: 'Other',
}

// type definition for ToolCall in OpenAI SDK v6.45.0
type ToolCallWithFunction = {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

// type guard to check if tool call has the expected structure
function isToolCallWithFunction(
  toolCall: OpenAI.Chat.ChatCompletionMessageToolCall,
): toolCall is ToolCallWithFunction {
  return (
    toolCall &&
    typeof toolCall === 'object' &&
    'function' in toolCall &&
    toolCall.function !== null &&
    typeof toolCall.function === 'object' &&
    'name' in toolCall.function &&
    'arguments' in toolCall.function
  )
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

  // clean up old entries (prevent memory leak)
  if (rateLimitMap.size > 100) {
    const expiryTime = now - RATE_LIMIT_WINDOW_MS
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.timestamp < expiryTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  // parse and validate request
  try {
    const { messages } = (await request.json()) as { messages: Message[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: 'No messages provided.' },
        { status: 400 },
      )
    }

    // get agent context with dynamic data
    const { systemPrompt, currentDate, timestamp } = getAgentContext()

    // enhanced system prompt with dynamic context and tool instructions
    const enhancedSystemPrompt = `
      ${systemPrompt}

      === DYNAMIC CONTEXT ===
      Current Date: ${currentDate}
      Timestamp: ${timestamp}
      Session ID: ${ip.substring(0, 8)}

      === TOOL USAGE INSTRUCTIONS ===
      You have access to the prefill_contact_form tool.
      Use it whenever the user expresses ANY intent to contact the developer:
      - job offers, hiring, recruitment, positions → topic: "job"
      - project requests, building something → topic: "project"
      - collaboration, working together → topic: "collaboration"
      - pricing, costs, quotes → topic: "quote"
      - feedback, suggestions → topic: "feedback"
      - anything else → topic: "other"
      After calling the tool, respond with ONE short sentence only — confirm you open the contact form with the pre-selected topic. Nothing else. No project details, no suggestions, no questions. Example: "I've just opened the contact form with 'Job Offer' pre-selected for you — you're all set!"
    `

    // log context in development
    if (process.env.NODE_ENV === 'development') {
      logAgentContext()
      console.log('Messages received:', messages.length)
    }

    // first DeepSeek API call — DeepSeek decides whether to call a tool or answer directly
    const firstResponse = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      tools,
      tool_choice: 'auto', // DeepSeek decides on its own
      messages: [
        { role: 'system', content: enhancedSystemPrompt },
        ...messages,
      ],
    })

    const firstChoice = firstResponse.choices[0]

    /* TOOL CALL PATH */
    if (
      firstChoice.finish_reason === 'tool_calls' &&
      firstChoice.message.tool_calls
    ) {
      const toolCall = firstChoice.message.tool_calls[0]

      // validate the tool call structure using the type guard
      if (!isToolCallWithFunction(toolCall)) {
        console.error('Invalid tool call structure:', toolCall)
        return NextResponse.json(
          { message: 'Invalid tool call structure.' },
          { status: 400 },
        )
      }

      const toolName = toolCall.function.name
      const toolArgs = JSON.parse(toolCall.function.arguments) as {
        topic: string
      }

      const topic = toolArgs.topic
      const topicLabel = TOPIC_LABELS[topic] ?? 'Other'

      if (process.env.NODE_ENV === 'development') {
        console.log(`Tool called: "${toolName}" with topic: "${topic}"`)
      }

      // second API call — send tool result back to DeepSeek for final reply
      const secondResponse = await client.chat.completions.create({
        model: MODEL,
        max_tokens: 1024,
        temperature: 0.7,
        tools,
        messages: [
          { role: 'system', content: enhancedSystemPrompt },
          ...messages,
          // DeepSeek's tool call decision
          firstChoice.message,
          // tool execution result
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              success: true,
              topic,
              topicLabel,
              message: `Contact form opened with topic "${topicLabel}" pre-selected.`,
            }),
          },
        ],
      })

      const reply =
        secondResponse.choices[0].message.content?.trim() ??
        'I open the contact form for you!'

      if (process.env.NODE_ENV === 'development') {
        console.log('Final reply after tool call:', reply.substring(0, 100))
      }

      // return reply + toolAction so the frontend knows to navigate
      return NextResponse.json({
        reply,
        toolAction: {
          type: 'prefill_contact_form',
          topic,
        },
        metadata: {
          timestamp: new Date().toISOString(),
          model: secondResponse.model,
        },
      })
    }

    /* NORMAL REPLY PATH */
    const reply =
      firstChoice.message.content?.trim() ??
      'Sorry, I could not generate a response.'

    if (process.env.NODE_ENV === 'development') {
      console.log('Normal reply:', reply.substring(0, 100))
      console.log('Token usage:', firstResponse.usage)
    }

    return NextResponse.json({
      reply,
      metadata: {
        timestamp: new Date().toISOString(),
        model: firstResponse.model,
      },
    })
  } catch (error) {
    // error handling
    console.error('Agent API error:', error)

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
// alternative to using Postman -> Terminal: Example Test Request with curl:
/*
    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "What skills do you have?"}]}'

    curl -X POST http://localhost:4000/api/agent \
    -H "Content-Type: application/json" \
    -d '{"messages": [{"role": "user", "content": "I want to discuss a job opportunity"}]}'
*/
