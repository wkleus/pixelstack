/**
 * Jest Setup
 *
 * Runs before all tests.
 * Mocks browser APIs that do not exist in Node.js.
 */

import '@testing-library/jest-dom'
// Polyfill Web Fetch API for Next.js API route tests
import 'whatwg-fetch'

/**
 * Mock: window.matchMedia
 * Required for components that use media queries (e.g., theme toggles, responsive design)
 * This API doesn't exist in Node.js test environment
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated but still used by some libraries
    removeListener: jest.fn(), // Deprecated but still used by some libraries
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

/**
 * Mock: IntersectionObserver
 * Required for components that use intersection detection (e.g., lazy loading, infinite scroll)
 * This API doesn't exist in Node.js test environment
 */
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {
    return null
  }
  observe() {
    return null
  }
  takeRecords() {
    return []
  }
  unobserve() {
    return null
  }
} as any

/**
 * Mock: ResizeObserver
 * Required for components that observe element resize events
 * This API doesn't exist in Node.js test environment
 */
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {
    return null
  }
  observe() {
    return null
  }
  unobserve() {
    return null
  }
} as any

/**
 * Mock environment variables for API routes
 * Prevents errors when the API route checks for these variables
 */
process.env.RESEND_API_KEY = 'test-key-replace-in-production'
process.env.RESEND_FROM = 'test@example.com'
process.env.RESEND_TO = 'test@example.com'
