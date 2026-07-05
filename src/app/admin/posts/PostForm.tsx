interface PostFormDefaultValues {
  name: string
  handle: string
  overview: string
  content: string
  timeToRead: string
  tags: string[]
  published: boolean
}

interface PostFormProps {
  action: (formData: FormData) => Promise<void>
  defaultValues: PostFormDefaultValues
}

const inputClass =
  'w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-700 dark:bg-gray-800'

const PostForm = ({ action, defaultValues }: PostFormProps) => {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={defaultValues.name}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Handle (URL slug)
        </label>
        <input
          name="handle"
          type="text"
          required
          defaultValue={defaultValues.handle}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Overview</label>
        <textarea
          name="overview"
          required
          rows={2}
          defaultValue={defaultValues.overview}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Content — Markdown (GitHub-flavored). Raw HTML tags also allowed.
        </label>
        <textarea
          name="content"
          required
          rows={18}
          defaultValue={defaultValues.content}
          className={`${inputClass} font-mono text-sm`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Time to read</label>
          <input
            name="timeToRead"
            type="text"
            defaultValue={defaultValues.timeToRead}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Tags (comma-separated)
          </label>
          <input
            name="tags"
            type="text"
            defaultValue={defaultValues.tags.join(', ')}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex w-fit items-center gap-2 text-sm font-medium">
        <input
          name="published"
          type="checkbox"
          defaultChecked={defaultValues.published}
        />
        Published (visible on the live site)
      </label>

      <button
        type="submit"
        className="w-fit cursor-pointer rounded-lg bg-cyan-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-600"
      >
        Save
      </button>
    </form>
  )
}

export default PostForm
