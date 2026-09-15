import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import * as Sentry from '@sentry/nextjs'
import {
  getAgentContext,
  logAgentContext,
  getProjectDetails,
  getDeveloperBackground,
  projectNames,
} from '@/data/agentContext'
import { agentRateLimit } from '@/lib/rateLimit'

const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
})

// Throttles streaming speed in development only (chars/sec)
// Production always streams at API speed; the typing effect lives in the frontend
const STREAM_CHARS_PER_SECOND =
  process.env.NODE_ENV === 'development'
    ? parseInt(process.env.STREAM_CHARS_PER_SECOND || '0', 10)
    : 0

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Pauses long enough to emit text at STREAM_CHARS_PER_SECOND. */
const delayForText = async (text: string) => {
  if (STREAM_CHARS_PER_SECOND <= 0) return
  const ms = (text.length / STREAM_CHARS_PER_SECOND) * 1000
  if (ms > 0) await delay(ms)
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Tool definitions; usage instructions live in the descriptions so the
// system prompt stays small and cache-friendly
const tools: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'prefill_contact_form',
      description:
        'Opens the contact form and pre-selects a topic. Use this when the user expresses intent to contact the developer — for a job offer, collaboration, project inquiry, quote request, feedback, or any other reason. ' +
        'IMPORTANT: After calling this tool, respond with ONE short sentence only — confirm you opened the contact form with the pre-selected topic. Nothing else. No project details, no suggestions, no questions. ' +
        "Example: \"I've just opened the contact form with 'Job Offer' pre-selected for you — you're all set!\"",
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            enum: [
              'job',
              'project',
              'collaboration',
              'quote',
              'feedback',
              'other',
            ],
            description:
              "The topic that best matches the user's intent. Mapping: job offers/hiring/recruitment → 'job'; project requests/building something → 'project'; collaboration/working together → 'collaboration'; pricing/costs/quotes → 'quote'; feedback/suggestions → 'feedback'; anything else → 'other'.",
          },
        },
        required: ['topic'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_project_details',
      description:
        "Fetches the full how-it-works explanation, in-depth case study (challenges, architecture, tech decisions), and complete tech stack for one specific project. The system prompt only contains a one-line overview per project — call this before giving an in-depth answer about a project's architecture, technical challenges, or full tech stack. Do NOT call it for a general 'what projects have you built' overview question; the overview section already covers that.",
      parameters: {
        type: 'object',
        properties: {
          projectName: {
            type: 'string',
            enum: projectNames,
            description: 'The exact name of the project to get details for',
          },
        },
        required: ['projectName'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_developer_background',
      description:
        'Fetches the full skills list (with proficiency levels) and/or the full education & certificates details. The system prompt only contains a short overview (category names / titles) — call this before answering any detailed question about skills, proficiency, technologies, education, certificates, courses, or IT training.',
      parameters: {
        type: 'object',
        properties: {
          sections: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['skills', 'education'],
            },
            description:
              'Which sections to fetch. Pass both if the question covers both.',
          },
        },
        required: ['sections'],
      },
    },
  },
]

const TOPIC_LABELS: Record<string, string> = {
  job: 'Job Offer',
  project: 'Project Inquiry',
  collaboration: 'Collaboration',
  quote: 'Request a Quote',
  feedback: 'Feedback',
  other: 'Other',
}

/** Handles chat requests with portfolio context via SSE streaming */
export async function POST(request: Request) {
  const tStart = Date.now()

  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  const tRL = Date.now()
  const { success, reset } = await agentRateLimit.limit(ip)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[timing] rate-limit: ${Date.now() - tRL}ms`)
  }

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

  try {
    const { messages } = (await request.json()) as { messages: Message[] }

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: 'No messages provided.' },
        { status: 400 },
      )
    }

    const tCtx = Date.now()
    const { systemPrompt, currentDate } = getAgentContext()
    if (process.env.NODE_ENV === 'development') {
      console.log(`[timing] context-build: ${Date.now() - tCtx}ms`)
    }

    // Keep the system prompt byte-identical across requests so DeepSeek
    // can cache the prompt prefix; dynamic values (date) go into a
    // separate user message instead
    const enhancedSystemPrompt = systemPrompt

    if (process.env.NODE_ENV === 'development') {
      logAgentContext()
      console.log('Messages received:', messages.length)
      console.log('Session:', ip.substring(0, 8))
      console.log(
        'STREAM_CHARS_PER_SECOND effective value:',
        STREAM_CHARS_PER_SECOND,
      )
    }

    // Inject the current date just before the last user message
    const messagesWithContext: Message[] = [
      ...messages.slice(0, -1),
      {
        role: 'user' as const,
        content: `(Context: today is ${currentDate})`,
      },
      messages[messages.length - 1],
    ]

    const tCall1 = Date.now()
    const deepseekStream = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      tools,
      reasoning_effort: 'low',
      tool_choice: 'auto',
      stream: true,
      stream_options: { include_usage: true },
      messages: [
        { role: 'system', content: enhancedSystemPrompt },
        ...messagesWithContext,
      ],
    })
    if (process.env.NODE_ENV === 'development') {
      console.log(`[timing] deepseek-call-1 TTFB: ${Date.now() - tCall1}ms`)
    }

    const encoder = new TextEncoder()

    /** Emits one SSE data chunk for a piece of streamed text */
    const emitContent = async (
      controller: ReadableStreamDefaultController,
      content: string,
    ) => {
      const payload = JSON.stringify({ content })
      controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
      await delayForText(content)
    }

    // Accumulates tool-call fragments keyed by index (multiple tools
    // can be called in the same turn)
    const toolCallsAcc = new Map<
      number,
      { id: string; name: string; arguments: string }
    >()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of deepseekStream) {
            if (chunk.usage && process.env.NODE_ENV === 'development') {
              console.log('Usage:', chunk.usage)
            }

            const choice = chunk.choices[0]
            const delta = choice?.delta

            if (delta?.tool_calls) {
              for (const tc of delta.tool_calls) {
                const index = tc.index ?? 0
                if (!toolCallsAcc.has(index)) {
                  toolCallsAcc.set(index, {
                    id: tc.id ?? '',
                    name: '',
                    arguments: '',
                  })
                }
                const acc = toolCallsAcc.get(index)!
                if (tc.function?.name) acc.name += tc.function.name
                if (tc.function?.arguments)
                  acc.arguments += tc.function.arguments
              }
            }

            if (delta?.content) {
              await emitContent(controller, delta.content)
            }

            if (choice?.finish_reason === 'stop' && toolCallsAcc.size === 0) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'))
              controller.close()
              if (process.env.NODE_ENV === 'development') {
                console.log(`[timing] TOTAL: ${Date.now() - tStart}ms`)
              }
              return
            }
          }

          const toolCalls = Array.from(toolCallsAcc.values()).filter(
            (tc) => tc.name && tc.arguments,
          )

          if (toolCalls.length > 0) {
            const contactFormCall = toolCalls.find(
              (tc) => tc.name === 'prefill_contact_form',
            )
            const projectDetailCalls = toolCalls.filter(
              (tc) => tc.name === 'get_project_details',
            )
            const backgroundCalls = toolCalls.filter(
              (tc) => tc.name === 'get_developer_background',
            )

            if (process.env.NODE_ENV === 'development') {
              console.log(
                'Tools called:',
                toolCalls.map((tc) => tc.name).join(', '),
              )
            }

            const assistantToolCallMessage = {
              role: 'assistant' as const,
              content: null,
              tool_calls: toolCalls.map((tc) => ({
                id: tc.id,
                type: 'function' as const,
                function: { name: tc.name, arguments: tc.arguments },
              })),
            }

            // One tool-result message per call, in the same order
            const toolResultMessages = toolCalls.map((tc) => {
              if (tc.name === 'get_project_details') {
                const { projectName } = JSON.parse(tc.arguments) as {
                  projectName: string
                }
                const details = getProjectDetails(projectName)
                return {
                  role: 'tool' as const,
                  tool_call_id: tc.id,
                  content: details
                    ? JSON.stringify(details)
                    : JSON.stringify({
                        success: false,
                        message: `No project named "${projectName}" found.`,
                      }),
                }
              }

              if (tc.name === 'get_developer_background') {
                const { sections } = JSON.parse(tc.arguments) as {
                  sections: ('skills' | 'education')[]
                }
                const background = getDeveloperBackground(sections)
                return {
                  role: 'tool' as const,
                  tool_call_id: tc.id,
                  content: JSON.stringify(background),
                }
              }

              // prefill_contact_form
              const { topic } = JSON.parse(tc.arguments) as { topic: string }
              const topicLabel = TOPIC_LABELS[topic] ?? 'Other'
              return {
                role: 'tool' as const,
                tool_call_id: tc.id,
                content: JSON.stringify({
                  success: true,
                  topic,
                  topicLabel,
                  message: `Contact form opened with topic "${topicLabel}" pre-selected.`,
                }),
              }
            })

            const baseMessages = [
              { role: 'system' as const, content: enhancedSystemPrompt },
              ...messagesWithContext,
              assistantToolCallMessage,
              ...toolResultMessages,
            ]

            const hasContentToolCall =
              projectDetailCalls.length > 0 || backgroundCalls.length > 0

            if (hasContentToolCall) {
              // Content tools need a potentially long follow-up — stream it
              // Raise max_tokens to 2048 if answers get truncated (finish_reason: 'length')
              const tCall2 = Date.now()
              const followUpStream = await client.chat.completions.create({
                model: MODEL,
                max_tokens: 1024,
                temperature: 0.7,
                reasoning_effort: 'low',
                stream: true,
                stream_options: { include_usage: true },
                messages: baseMessages,
              })
              if (process.env.NODE_ENV === 'development') {
                console.log(
                  `[timing] deepseek-call-2 TTFB: ${Date.now() - tCall2}ms`,
                )
              }

              for await (const chunk of followUpStream) {
                if (chunk.usage && process.env.NODE_ENV === 'development') {
                  console.log('Usage (follow-up call):', chunk.usage)
                }

                const finishReason = chunk.choices[0]?.finish_reason
                if (finishReason && process.env.NODE_ENV === 'development') {
                  console.log('Follow-up finish_reason:', finishReason)
                  if (finishReason === 'length') {
                    console.warn(
                      '⚠️ Follow-up response truncated — consider raising max_tokens',
                    )
                  }
                }

                const followUpDelta = chunk.choices[0]?.delta
                if (followUpDelta?.content) {
                  await emitContent(controller, followUpDelta.content)
                }
              }

              // Still fire the UI action if prefill was also called this turn
              // Empty reply so the client keeps the text already streamed above
              if (contactFormCall) {
                const { topic } = JSON.parse(contactFormCall.arguments) as {
                  topic: string
                }
                const toolEvent = JSON.stringify({
                  type: 'tool_action',
                  toolAction: { type: 'prefill_contact_form', topic },
                  reply: '',
                })
                controller.enqueue(
                  encoder.encode(`event: tool_result\ndata: ${toolEvent}\n\n`),
                )
              }
            } else if (contactFormCall) {
              // Contact-form only: one short non-streamed confirmation
              // Raise max_tokens to 250 if the reply gets truncated
              const { topic } = JSON.parse(contactFormCall.arguments) as {
                topic: string
              }

              const tCall2 = Date.now()
              const secondResponse = await client.chat.completions.create({
                model: MODEL,
                max_tokens: 150,
                temperature: 0.7,
                reasoning_effort: 'low',
                stream: false,
                tools,
                messages: baseMessages,
              })
              if (process.env.NODE_ENV === 'development') {
                console.log(
                  `[timing] deepseek-call-2 (non-stream): ${Date.now() - tCall2}ms`,
                )
              }

              const reply =
                secondResponse.choices[0].message.content?.trim() ??
                'I open the contact form for you!'

              if (process.env.NODE_ENV === 'development') {
                console.log(
                  'Final reply after tool call:',
                  reply.substring(0, 150),
                )
                console.log('Usage (second call):', secondResponse.usage)
              }

              const toolEvent = JSON.stringify({
                type: 'tool_action',
                toolAction: { type: 'prefill_contact_form', topic },
                reply,
              })
              controller.enqueue(
                encoder.encode(`event: tool_result\ndata: ${toolEvent}\n\n`),
              )
            }
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
          if (process.env.NODE_ENV === 'development') {
            console.log(`[timing] TOTAL: ${Date.now() - tStart}ms`)
          }
        } catch (error) {
          console.error('Stream processing error:', error)
          Sentry.captureException(error, {
            tags: { route: 'api/agent', phase: 'stream' },
          })
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Agent API error:', error)
    Sentry.captureException(error, { tags: { route: 'api/agent' } })

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
