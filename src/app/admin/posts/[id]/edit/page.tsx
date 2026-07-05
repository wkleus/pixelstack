import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { getPostByIdForAdmin } from '@/lib/posts'
import { updatePost } from '@/app/admin/actions'
import PostForm from '../../PostForm'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

const EditPostPage = async ({ params }: EditPostPageProps) => {
  // if the user somehow bypasses the middleware, this page will still redirect them to login
  const session = await auth()
  if (!session?.user) {
    redirect('/admin/login')
  }

  const { id } = await params
  const post = await getPostByIdForAdmin(id)

  if (!post) {
    return notFound()
  }

  // pre-fills the id argument so the <form action={...}> only needs to pass the FormData itself
  const updatePostWithId = updatePost.bind(null, id)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-bold">Edit Post</h1>
      <PostForm action={updatePostWithId} defaultValues={post} />
    </div>
  )
}

export default EditPostPage
