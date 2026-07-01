// type definitions for the AI agent system -> provide type safety across the frontend and API

export interface AgentMessage {
  role: 'user' | 'assistant'
  content: string
}

// tool action types that the agent can perform
export interface AgentToolAction {
  type: 'prefill_contact_form'
  topic:
    | 'job'
    | 'project'
    | 'collaboration'
    | 'quote'
    | 'feedback'
    | 'support'
    | 'interview'
    | 'networking'
    | 'other'
}

// response structure from the agent API
export interface AgentResponse {
  reply: string
  toolAction?: AgentToolAction
  metadata?: {
    timestamp: string
    model: string
  }
}

// rrror response structure
export interface AgentErrorResponse {
  message: string
  retryAfter?: number
}

// conversation history stored in localStorage
export interface StoredConversation {
  messages: AgentMessage[]
  lastUpdated: string
}
