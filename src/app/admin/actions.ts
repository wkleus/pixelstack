'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export async function updatePost(id: string, formData: FormData) {
  // middleware already blocks unauthenticated access to /admin, but this action re-checks the session on its own too
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const name = String(formData.get('name') ?? '').trim()
  const overview = String(formData.get('overview') ?? '').trim()
  const content = String(formData.get('content') ?? '')
  const timeToRead =
    String(formData.get('timeToRead') ?? '').trim() || '5 min read'
  const tags = parseTags(String(formData.get('tags') ?? ''))
  const published = formData.get('published') === 'on'
  const handle = String(formData.get('handle') ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!name || !overview || !content || !handle) {
    throw new Error('Name, handle, overview and content are required')
  }

  const previous = await prisma.post.findUnique({ where: { id } })

  await prisma.post.update({
    where: { id },
    data: { name, overview, content, timeToRead, handle, tags, published },
  })

  // refresh the cached pages that could show this post
  revalidatePath('/admin/adminDashboard')
  revalidatePath('/posts')
  revalidatePath('/')
  revalidatePath(`/posts/${handle}`)
  if (previous && previous.handle !== handle) {
    revalidatePath(`/posts/${previous.handle}`)
  }

  redirect('/admin/adminDashboard')
}

export async function deletePost(id: string) {
  // middleware already blocks unauthenticated access
  // to /admin, but this action re-checks the session on its own too
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const post = await prisma.post.delete({ where: { id } })

  // refresh the cached pages that could show this post
  revalidatePath('/admin/adminDashboard')
  revalidatePath('/posts')
  revalidatePath('/')
  revalidatePath(`/posts/${post.handle}`)
}
