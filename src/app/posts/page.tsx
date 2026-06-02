'use client'

import { posts } from '@/data/posts'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar1, HourglassIcon } from 'lucide-react'

const Posts = () => {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="mx-auto max-w-7xl py-28">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-16 text-center text-4xl font-bold"
      >
        Blog Posts
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {sortedPosts.map((post) => (
          <motion.article
            key={post.handle}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="dark:bg-dark/50 rounded-lg bg-white p-6 shadow-md"
          >
            <Link href={`/posts/${post.handle}`}>
              <h3 className="mb-2 text-xl font-semibold transition-colors hover:text-cyan-500">
                {post.name}
              </h3>
            </Link>

            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {post.overview}
            </p>

            <div className="flex items-center gap-8 space-x-4 text-xs text-gray-500 opacity-80 dark:text-gray-400">
              <span className="flex items-center">
                <HourglassIcon className="mr-2" size={18} />
                {post.timeToRead}
              </span>{' '}
              <span className="flex items-center">
                <Calendar1 className="mr-2 size-5" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default Posts
