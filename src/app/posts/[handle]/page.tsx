import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPostHandles, getPostByHandle } from '@/lib/posts'

interface PostProps {
  // Next.js 15+/16: dynamic route params are async
  params: Promise<{ handle: string }>
}

// pre-renders one static page per published post at build time
export async function generateStaticParams() {
  const handles = await getAllPostHandles()
  return handles.map((handle) => ({ handle }))
}

// per-post SEO metadata (title, description, Open Graph)
export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { handle } = await params
  const post = await getPostByHandle(handle)

  if (!post) {
    return { title: 'Blog post not found' }
  }

  return {
    title: `${post.name} | Pixelstack Post`,
    description: post.overview,
    openGraph: {
      title: post.name,
      description: post.overview,
      type: 'article',
    },
  }
}

const PostDetailsSite = async ({ params }: PostProps) => {
  const { handle } = await params
  // Only returns published posts — unpublished handles fall through to notFound()
  const post = await getPostByHandle(handle)

  if (!post) {
    return notFound()
  }

  return (
    <div className="mx-auto max-w-3xl py-16">
      <Link
        href="/posts"
        className="mb-6 inline-block text-cyan-500 hover:underline"
      >
        ← Back to all posts
      </Link>

      <h1 className="mb-4 text-4xl font-bold">{post.name}</h1>

      <p className="mb-6 text-gray-500 dark:text-gray-400">
        {new Date(post.createdAt).toLocaleDateString()} • {post.timeToRead}
      </p>

      {/* Content stored as raw HTML in DB */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}

export default PostDetailsSite
