'use client'

import { portfolios } from '@/data/portfolio'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

const Portfolio = () => {
  return (
    <div className="mx-auto max-w-7xl py-28">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-4 text-center text-4xl font-bold"
      >
        My App Portfolio
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 0, x: 120 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1.0 }}
        className="mt-6 mb-10 text-center text-lg text-gray-500"
      >
        Here are some of my Web App Portfolio Works. Click on the links below to
        view them. You can find more of them on my{' '}
        <a
          href="https://github.com/wkleus"
          target="_blank"
          className="font-semibold underline hover:text-cyan-600"
        >
          GitHub profile
        </a>
        .
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
      >
        {portfolios.map((portfolio) => (
          <article
            key={portfolio.name}
            className="dark:bg-dark/50 rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <div className="relative mb-4 aspect-video h-auto w-full overflow-hidden rounded-lg">
              <Image
                src={portfolio.imageSrc}
                alt={portfolio.name}
                fill
                priority
                loading="eager"
                className="object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{portfolio.name}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {portfolio.overview}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {portfolio.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-cyan-200/20 px-3 py-1 text-sm text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-2 flex gap-4">
              <Link
                href={portfolio.preview}
                target="_blank"
                className="text-secondary flex items-center gap-2 transition-colors hover:text-cyan-500"
              >
                <HiOutlineGlobeAlt className="h-6 w-6" />
                <span>Preview</span>
              </Link>
              <Link
                href={portfolio.sourceUrl}
                target="_blank"
                className="text-secondary flex items-center gap-2 transition-colors hover:text-cyan-500"
              >
                <FaGithub className="h-5 w-5" />
                <span>Source</span>
              </Link>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  )
}

export default Portfolio
