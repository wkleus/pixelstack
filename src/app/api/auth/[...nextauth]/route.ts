import { handlers } from '@/auth'

// auth.js's route handler for all sign-in/sign-out/session requests
// GET handles session/CSRF-token reads, POST handles sign-in/sign-out actions
export const { GET, POST } = handlers
