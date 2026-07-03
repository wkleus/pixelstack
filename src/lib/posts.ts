import { prisma } from '@/lib/prisma'
import type { Post } from '@/types'

// maps a Prisma 'Post' row to the UI-facing 'Post' shape used by the components (only the fields the UI needs)
function toUiPost(post: {
  name: string
  overview: string
  timeToRead: string
  createdAt: Date
  handle: string
  content: string
}): Post {
  return {
    name: post.name,
    overview: post.overview,
    timeToRead: post.timeToRead,
    createdAt: post.createdAt.toISOString(),
    handle: post.handle,
    content: post.content,
  }
}

// all published posts, newest first
export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return posts.map(toUiPost)
}

// the 'limit' most recent published posts (used on homepage)
export async function getRecentPosts(limit: number): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return posts.map(toUiPost)
}

// a single published post by its handle, or null if it doesn't exist (or isn't published)
export async function getPostByHandle(handle: string): Promise<Post | null> {
  const post = await prisma.post.findFirst({
    where: { handle, published: true },
  })

  return post ? toUiPost(post) : null
}

// all handles of published posts (used by generateStaticParams)
export async function getAllPostHandles(): Promise<string[]> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { handle: true },
  })

  return posts.map((p) => p.handle)
}
