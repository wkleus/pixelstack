/**
 * API tests for /api/connect
 * Tests: success, validation errors (3 cases), rate limiting
 * Total: 5 tests
 */

/* MOCKS for Node.js test environment */

// 1. TextEncoder/TextDecoder for Resend
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder

// 2. Mock Resend to prevent actual API calls during tests
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest
        .fn()
        .mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

// 3. Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown, init?: Record<string, unknown>) => ({
      status: typeof init?.status === 'number' ? init.status : 200,
      json: async () => data,
    }),
  },
}))

// 4. Mock Upstash-based rate limiter — unit tests shouldn't depend on
// real Redis (slow, needs network etc.) -> each test controls success/failure explicitly via mockLimit below
const mockLimit = jest.fn()
jest.mock('@/lib/rateLimit', () => ({
  connectRateLimit: {
    limit: (...args: unknown[]) => mockLimit(...args),
  },
}))

/* TESTS */

import { POST } from '@/app/api/connect/route'
import { NextRequest } from 'next/server'

interface ConnectRequestBody {
  name?: string
  email?: string
  topic?: string
  message?: string
}

// Helper to create a mock request with custom IP
const createRequest = (
  body: ConnectRequestBody,
  ip: string = '127.0.0.1',
): NextRequest => {
  const headers = new Headers()
  headers.set('x-forwarded-for', ip)
  return {
    json: async () => body,
    headers,
  } as unknown as NextRequest
}

describe('Contact API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default: rate limit allows the request through
    mockLimit.mockResolvedValue({ success: true })
  })

  // Test 1: Happy path - valid form submission
  test('accepts valid form data', async () => {
    const validData = {
      name: 'Max Mustermann',
      email: 'max@example.com',
      topic: 'other',
      message: 'This is a valid message with more than 20 characters.',
    }

    const response = await POST(createRequest(validData, '192.168.1.10'))
    expect(response.status).toBe(200)
  })

  // Test 2: Validation errors - each with UNIQUE IP to avoid rate limiting
  test.each([
    [
      'empty fields',
      { name: '', email: '', message: '' },
      'Missing required fields.',
      '192.168.2.1', // Unique IP for this test case
    ],
    [
      'invalid email',
      {
        name: 'Max',
        email: 'wrong',
        topic: 'other',
        message: 'Valid message with 20+ characters...',
      },
      'Invalid email format.',
      '192.168.2.2', // Unique IP for this test case
    ],
    [
      'short message',
      {
        name: 'Max',
        email: 'max@example.com',
        topic: 'other',
        message: 'short',
      },
      'Message must be between 20 and 300 characters.',
      '192.168.2.3', // Unique IP for this test case
    ],
  ])('rejects %s', async (_, data, expectedError, ip) => {
    const response = await POST(createRequest(data, ip))

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.message).toBe(expectedError)
  })

  // Test 3: Rate limiting per IP
  test('enforces rate limiting per IP', async () => {
    const validData = {
      name: 'Max Mustermann',
      email: 'max@example.com',
      topic: 'other',
      message: 'This is a valid message with more than 20 characters.',
    }
    const ip = '10.0.0.99'

    // First request from IP - rate limiter allows it - should succeed
    mockLimit.mockResolvedValueOnce({ success: true })
    const firstResponse = await POST(createRequest(validData, ip))
    expect(firstResponse.status).toBe(200)

    // Second request from same IP - rate limiter blocks it - should be blocked
    mockLimit.mockResolvedValueOnce({ success: false })
    const secondResponse = await POST(createRequest(validData, ip))
    expect(secondResponse.status).toBe(429)

    const body = await secondResponse.json()
    expect(body.message).toBe(
      'Too many requests. Please wait a moment before trying again.',
    )
  })
})
