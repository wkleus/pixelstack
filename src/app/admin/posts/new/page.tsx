import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { createPost } from '@/app/admin/actions'
import PostForm from '../PostForm'

const NewPostPage = async () => {
  // re-checks the session on every request before the page renders
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">New Post</h1>
      <PostForm action={createPost} />
    </div>
  )
}

export default NewPostPage
