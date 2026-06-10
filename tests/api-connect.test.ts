/**
 * API tests for /api/connect
 * Tests: success, validation errors (3 cases), rate limiting
 * Total: 5 tests
 */

/* MOCKS for Node.js test environment */

// 1. TextEncoder/TextDecoder for Resend
const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

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

/* TESTS */

import { POST } from '@/app/api/connect/route'
import { NextRequest } from 'next/server'

// Helper to create a mock request with custom IP
const createRequest = (body: any, ip: string = '127.0.0.1'): NextRequest => {
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
  })

  // Test 1: Happy path - valid form submission
  test('accepts valid form data', async () => {
    const validData = {
      name: 'Max Mustermann',
      email: 'max@example.com',
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
        message: 'Valid message with 20+ characters...',
      },
      'Invalid email format.',
      '192.168.2.2', // Unique IP for this test case
    ],
    [
      'short message',
      { name: 'Max', email: 'max@example.com', message: 'short' },
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
      message: 'This is a valid message with more than 20 characters.',
    }
    const ip = '10.0.0.99'

    // First request from IP - should succeed
    const firstResponse = await POST(createRequest(validData, ip))
    expect(firstResponse.status).toBe(200)

    // Second request from same IP within rate limit window - should be blocked
    const secondResponse = await POST(createRequest(validData, ip))
    expect(secondResponse.status).toBe(429)

    const body = await secondResponse.json()
    expect(body.message).toBe(
      'Too many requests. Please wait a moment before trying again.',
    )
  })
})
