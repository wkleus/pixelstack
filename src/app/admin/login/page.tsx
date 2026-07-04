const LoginPage = async () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Admin Login</h1>

      <form className="flex flex-col gap-4">
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

        <button
          type="submit"
          className="mt-2 cursor-pointer rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-600"
        >
          Sign in
        </button>
      </form>
    </div>
  )
}

export default LoginPage
