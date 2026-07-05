'use client'

import { deletePost } from '@/app/admin/actions'

interface DeletePostButtonProps {
  postId: string
  postName: string
}

const DeletePostButton = ({ postId, postName }: DeletePostButtonProps) => {
  return (
    <form
      action={deletePost.bind(null, postId)}
      onSubmit={(event) => {
        if (!confirm(`Delete "${postName}"? This cannot be undone.`)) {
          event.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="cursor-pointer rounded-lg border border-red-500/50 px-2 py-1 font-semibold text-red-500 hover:bg-red-500/10"
      >
        Delete
      </button>
    </form>
  )
}

export default DeletePostButton
