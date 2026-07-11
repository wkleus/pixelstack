import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getAgentContext, logAgentContext } from '@/data/agentContext'
import { agentRateLimit } from '@/lib/rateLimit'

// cheapest deepseek model: 'deepseek-v4-flash'
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

// DeepSeek API client (OpenAI-compatible)
const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

// stream delay in milliseconds – set via STREAM_DELAY_MS env variable, 0 = no delay
const STREAM_DELAY_MS = parseInt(process.env.STREAM_DELAY_MS || '0', 10)

// helper: pause for a given duration
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

// POST /api/agent - handles chat requests with portfolio context (streaming)
export async function POST(request: Request) {
  // rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const { success, reset } = await agentRateLimit.limit(ip)

  if (!success) {
    const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))

    return NextResponse.json(
      {
        message: 'Too many requests. Please wait a moment.',
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
        },
      },
    )
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

    // start streaming DeepSeek API call
    const deepseekStream = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      tools,
      tool_choice: 'auto', // DeepSeek decides on its own
      stream: true, // enable streaming
      messages: [
        { role: 'system', content: enhancedSystemPrompt },
        ...messages,
      ],
    })

    // prepare streaming response
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    // accumulator for potential tool call (DeepSeek sends fragments in separate chunks)
    let accumulatedToolCall: {
      id: string
      name: string
      arguments: string
    } | null = null

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of deepseekStream) {
            const delta = chunk.choices[0]?.delta

            // case 1: tool call fragments – accumulate them
            if (delta?.tool_calls) {
              for (const tc of delta.tool_calls) {
                if (!accumulatedToolCall) {
                  accumulatedToolCall = {
                    id: tc.id ?? '',
                    name: '',
                    arguments: '',
                  }
                }
                if (tc.function?.name)
                  accumulatedToolCall.name += tc.function.name
                if (tc.function?.arguments)
                  accumulatedToolCall.arguments += tc.function.arguments
              }
            }

            // case 2: text content – send as SSE data event (with optional delay)
            if (delta?.content) {
              const payload = JSON.stringify({ content: delta.content })
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
              if (STREAM_DELAY_MS > 0) await delay(STREAM_DELAY_MS)
            }

            // normal completion without tool call
            if (
              chunk.choices[0]?.finish_reason === 'stop' &&
              !accumulatedToolCall
            ) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              if (STREAM_DELAY_MS > 0) await delay(STREAM_DELAY_MS)
              controller.close()
              return
            }
          }

          // stream ended – check if we have an accumulated tool call
          if (accumulatedToolCall) {
            if (!accumulatedToolCall.name || !accumulatedToolCall.arguments) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              if (STREAM_DELAY_MS > 0) await delay(STREAM_DELAY_MS)
              controller.close()
              return
            }

            const toolName = accumulatedToolCall.name
            const toolArgs = JSON.parse(accumulatedToolCall.arguments) as {
              topic: string
            }
            const topic = toolArgs.topic
            const topicLabel = TOPIC_LABELS[topic] ?? 'Other'

            if (process.env.NODE_ENV === 'development') {
              console.log(`Tool called: "${toolName}" with topic: "${topic}"`)
            }

            // second API call (non‑streaming) to get the final reply after tool execution
            const secondResponse = await client.chat.completions.create({
              model: MODEL,
              max_tokens: 1024,
              temperature: 0.7,
              tools,
              messages: [
                { role: 'system', content: enhancedSystemPrompt },
                ...messages,
                // assistant message that triggered the tool call
                {
                  role: 'assistant',
                  content: null,
                  tool_calls: [
                    {
                      id: accumulatedToolCall.id,
                      type: 'function',
                      function: {
                        name: accumulatedToolCall.name,
                        arguments: accumulatedToolCall.arguments,
                      },
                    },
                  ],
                },
                // tool execution result
                {
                  role: 'tool',
                  tool_call_id: accumulatedToolCall.id,
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
              console.log(
                'Final reply after tool call:',
                reply.substring(0, 100),
              )
            }

            // send tool action metadata + reply as a special SSE event (with optional delay)
            const toolEvent = JSON.stringify({
              type: 'tool_action',
              toolAction: { type: 'prefill_contact_form', topic },
              reply,
            })
            controller.enqueue(
              encoder.encode(`event: tool_result\ndata: ${toolEvent}\n\n`),
            )
            if (STREAM_DELAY_MS > 0) await delay(STREAM_DELAY_MS)
          }

          // signal end of stream (with optional delay)
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          if (STREAM_DELAY_MS > 0) await delay(STREAM_DELAY_MS)
          controller.close()
        } catch (error) {
          console.error('Stream processing error:', error)
          controller.error(error)
        }
      },
    })

    // return SSE response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
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
