'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar1, HourglassIcon } from 'lucide-react'
import SearchBar from '@/app/components/Search/SearchBar'
import { useSearch } from '@/app/hooks/useSearch'
import type { Post } from '@/types'

interface PostsPageClientProps {
  // posts are fetched server-side (via Prisma) and passed in as props
  posts: Post[]
}

const PostsPageClient = ({ posts }: PostsPageClientProps) => {
  // client-side filtering only - posts themselves already come from DB
  const { query, setQuery, filtered, totalCount, resultCount } = useSearch(
    posts,
    ['name', 'overview'],
  )

  return (
    <div className="mx-10 max-w-7xl py-28 sm:mx-25 2xl:mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-10 text-center text-4xl font-bold"
      >
        Blog Posts
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search posts..."
          resultCount={resultCount}
          totalCount={totalCount}
        />
      </motion.div>

      {/* Grid of post cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
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
                {/* createdAt arrives as an ISO string from server; parsed here for display only */}
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

      {/* Empty state when the search query matches nothing */}
      {filtered.length === 0 && (
        <p className="mt-16 text-center text-gray-400">
          No posts match your search.
        </p>
      )}
    </div>
  )
}

export default PostsPageClient
