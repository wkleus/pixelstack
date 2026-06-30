import { useEffect, useState } from 'react'

export type FormStatus =
  | { state: 'pristine' }
  | { state: 'submitting' }
  | { state: 'submitted'; message: string }
  | { state: 'failed'; error: string }

export interface FormData {
  name: string
  email: string
  topic: string
  message: string
}

export const useConnectForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topic: '',
    message: '',
  })

  const [status, setStatus] = useState<FormStatus>({ state: 'pristine' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const isSubmitting = status.state === 'submitting'

  // auto-dismiss success/error messages after 3 seconds
  // resets form only on successful submission
  useEffect(() => {
    if (status.state === 'submitted' || status.state === 'failed') {
      const timer = setTimeout(() => {
        setStatus({ state: 'pristine' })
        if (status.state === 'submitted') {
          resetForm()
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [status.state])

  // update form state and clear field-specific errors on user input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // clear error for this field when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // validate all fields before submission
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a topic'
    }

    if (formData.message.length < 20) {
      newErrors.message = 'Message must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', topic: '', message: '' })
    setErrors({})
    setStatus({ state: 'pristine' })
  }

  // submit form data to API endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setStatus({ state: 'submitting' })

    try {
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Server error')
      }

      setStatus({
        state: 'submitted',
        message: data.message || 'Message sent successfully.',
      })
    } catch (err) {
      setStatus({
        state: 'failed',
        error:
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
      })
    }
  }

  return {
    formData,
    status,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
