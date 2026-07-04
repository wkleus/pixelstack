import { getAllPostsForAdmin } from '@/lib/posts'

const AdminDashboard = async () => {
  const posts = await getAllPostsForAdmin()

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Posts</h1>

        {/* NOTE: placeholder — not wired up yet: create new post button */}
        <button
          type="button"
          disabled
          className="cursor-not-allowed rounded-lg bg-cyan-500/50 px-4 py-2 text-sm font-semibold text-white"
        >
          + New Post
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-400 text-gray-500 dark:border-gray-600">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Handle</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4" />
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                <td className="py-3 pr-4 font-medium">{post.name}</td>
                <td className="py-3 pr-4 text-gray-500">{post.handle}</td>
                <td className="py-3 pr-4">
                  <span
                    className={
                      post.published
                        ? 'rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </td>
                <td className="py-3 pr-4">
                  {/* NOTE: placeholders — not wired up yet: Edit & Delete buttons */}
                  <div className="flex items-center justify-end gap-3 opacity-50">
                    <span className="cursor-not-allowed rounded-lg border border-cyan-500/50 px-2 py-1 font-semibold text-cyan-500">
                      Edit
                    </span>
                    <span className="cursor-not-allowed rounded-lg border border-red-500/50 px-2 py-1 font-semibold text-red-500">
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <p className="py-12 text-center text-gray-400">No posts yet.</p>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
