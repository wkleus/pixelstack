import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'

async function authenticate(formData: FormData) {
  'use server'

  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/admin/adminDashboard',
    })
  } catch (error) {
    // NEXT_REDIRECT is thrown by signIn() on success
    if (error instanceof AuthError) {
      redirect('/admin/login?error=1')
    }
    throw error
  }
}

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Admin Login</h1>

      <form action={authenticate} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">Invalid email or password.</p>
        )}

        <button
          type="submit"
          className="mt-2 cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-cyan-600"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginPage
