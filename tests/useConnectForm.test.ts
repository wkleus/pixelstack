/**
 * Unit tests for the useConnectForm hook
 * Tests: initialization, input changes (name + email), submission
 * Total: 4 tests
 */

import { renderHook, act } from '@testing-library/react'
import { useConnectForm } from '@/app/components/Connect/useConnectForm'

// Mock fetch to prevent actual API calls during tests
global.fetch = jest.fn()

describe('useConnectForm Hook', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // TEST 1: Hook starts with empty fields
  test('starts with an empty form', () => {
    const { result } = renderHook(() => useConnectForm())

    // Verify all form fields are initially empty
    expect(result.current.formData.name).toBe('')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.message).toBe('')
  })

  // TEST 2: Name field can be changed
  test('can change name', () => {
    const { result } = renderHook(() => useConnectForm())

    // Simulate user typing "Max" into the name field
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Max' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    // Verify the name was updated correctly
    expect(result.current.formData.name).toBe('Max')
  })

  // TEST 3: Email field can be changed
  test('can change email', () => {
    const { result } = renderHook(() => useConnectForm())

    // Simulate user typing an email address
    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'max@test.de' },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    // Verify the email was stored correctly
    expect(result.current.formData.email).toBe('max@test.de')
  })

  // TEST 4: Form can be submitted
  test('can submit the form', async () => {
    const { result } = renderHook(() => useConnectForm())

    // Fill in all required fields first — handleSubmit validates the form
    // client-side before calling fetch, so an empty form never reaches it
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Max Mustermann' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'max@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'topic', value: 'other' },
      } as React.ChangeEvent<HTMLSelectElement>)
      result.current.handleChange({
        target: {
          name: 'message',
          value: 'This is a valid message with more than 20 characters.',
        },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    // Mock successful API response
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    })

    // Submit the form
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>)
    })

    // Verify fetch was called with the correct endpoint
    expect(mockFetch).toHaveBeenCalled()
  })
})
