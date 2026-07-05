'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

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
