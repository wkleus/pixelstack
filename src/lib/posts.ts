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

/* admin-only queries */
export interface AdminPostSummary {
  id: string
  handle: string
  name: string
  published: boolean
  createdAt: Date
}

// all posts (published and drafts), newest first — for the admin list view
export async function getAllPostsForAdmin(): Promise<AdminPostSummary[]> {
  return prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      handle: true,
      name: true,
      published: true,
      createdAt: true,
    },
  })
}

export interface AdminPostDetail {
  id: string
  handle: string
  name: string
  overview: string
  content: string
  timeToRead: string
  tags: string[]
  published: boolean
}

/* single post (published or draft) by id - for edit form */
export async function getPostByIdForAdmin(
  id: string,
): Promise<AdminPostDetail | null> {
  const post = await prisma.post.findUnique({ where: { id } })
  if (!post) return null

  return {
    id: post.id,
    handle: post.handle,
    name: post.name,
    overview: post.overview,
    content: post.content,
    timeToRead: post.timeToRead,
    tags: post.tags,
    published: post.published,
  }
}
