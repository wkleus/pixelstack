import fs from 'fs'
import path from 'path'

/**
 * agent context configuration
 * loads system prompt from file (dev) or env var (production)
 * NOTE: only run on server - never exposed to client
 */

export interface AgentContext {
  systemPrompt: string
  currentDate: string
  timestamp: number
}

// get the complete agent context with dynamic data
// in development mode: read from agent-prompt.txt
// in production mode: read from AGENT_CONTEXT_* env var
export const getAgentContext = (): AgentContext => {
  let systemPrompt: string

  // in production mode using Vercel environment variable
  if (process.env.NODE_ENV === 'production') {
    // stored in AGENT_CONTEXT_*: structured context data fed into the AI agent's system prompt
    systemPrompt = (
      (process.env.AGENT_CONTEXT_1 ?? '') +
      (process.env.AGENT_CONTEXT_2 ?? '') +
      (process.env.AGENT_CONTEXT_3 ?? '') +
      (process.env.AGENT_CONTEXT_4 ?? '')
    ).trim()

    // fallback if env var is not set
    if (!systemPrompt) {
      console.warn('AGENT_CONTEXT_* is not set, using default prompt')
      systemPrompt =
        'You are a helpful assistant for a web developer portfolio.'
    }
  }

  // in development mode reading from file
  else {
    try {
      // stored in agent-prompt.txt: structured context data fed into the AI agent's system prompt
      const filePath = path.join(process.cwd(), 'agent-prompt.txt')
      systemPrompt = fs.readFileSync(filePath, 'utf-8')

      // trim whitespace and validate
      systemPrompt = systemPrompt.trim()
      if (!systemPrompt) {
        throw new Error('agent-prompt.txt is empty')
      }
    } catch (error) {
      console.error('Failed to read agent-prompt.txt:', error)
      console.warn('Using default fallback prompt')
      systemPrompt =
        'You are a helpful assistant for a web developer portfolio.'
    }
  }

  // return enriched context with dynamic data
  const now = new Date()
  return {
    systemPrompt,
    currentDate: now.toISOString().split('T')[0], // YYYY-MM-DD
    timestamp: now.getTime(),
  }
}

// for debugging purposes
export const logAgentContext = (): void => {
  if (process.env.NODE_ENV === 'development') {
    const context = getAgentContext()
    console.log('📋 Agent Context loaded:')
    console.log(`  - Date: ${context.currentDate}`)
    console.log(`  - Prompt length: ${context.systemPrompt.length} chars`)
    console.log(`  - Timestamp: ${context.timestamp}`)
  }
}
