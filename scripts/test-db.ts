import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

async function testConnection() {
  console.log('Testing PostgreSQL connection...')

  try {
    // test the connection to the database
    await prisma.$connect()

    console.log(
      'DATABASE_URL:',
      process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@'),
    )

    // count the number of posts in the database
    const count = await prisma.post.count()
    console.log(`Currently ${count} posts in the database`)

    console.log('Everything works!')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
