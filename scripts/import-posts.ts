import 'dotenv/config'
import { prisma } from '../src/lib/prisma'
import { posts } from '../src/data/posts'

async function importPosts() {
  console.log('Import posts in PostgreSQL...')

  let success = 0
  let errors = 0

  for (const post of posts) {
    try {
      await prisma.post.create({
        data: {
          handle: post.handle,
          name: post.name,
          overview: post.overview,
          content: post.content,
          timeToRead: post.timeToRead,
          createdAt: new Date(post.createdAt),
          published: true,
        },
      })
      console.log(`${post.name} imported successfully!`)
      success++
    } catch (error) {
      console.error(`Error on ${post.name}:`, error)
      errors++
    }
  }

  console.log(`\nImport completed!`)
  console.log(`Success: ${success}`)
  console.log(`Errors: ${errors}`)

  await prisma.$disconnect()
}

importPosts()
