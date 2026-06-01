'use client'

import Image from 'next/image'
import Link from 'next/link'
import { portfolios } from '@/data/portfolio'
import { motion } from 'framer-motion'
import { AiFillGithub } from 'react-icons/ai'
import { HiOutlineGlobeAlt } from 'react-icons/hi'

const Portfolio = () => {
  // Limit the displayed portfolio items to the first 5
  const limitedPortfolio = portfolios.slice(0, 4)

  return (
    <section className="dark:bg-dark/30 bg-white py-24">
      {/* Section title with fade-in animation */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-20 text-center text-4xl font-extrabold tracking-wide"
      >
        My Portfolio
      </motion.h2>

      <div className="mx-auto max-w-7xl space-y-40 px-4">
        {limitedPortfolio.map((portfolio, index) => {
          // Alternate layout: reverse every second item
          const isReversed = index % 2 !== 0

          return (
            <motion.div
              key={portfolio.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 items-center gap-16 md:grid-cols-2 ${
                isReversed ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Portfolio image */}
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={portfolio.imageSrc}
                  alt={portfolio.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-2xl border border-gray-700 object-center"
                />
              </div>

              {/* Text content */}
              <div className={`${isReversed ? 'md:order-first' : ''}`}>
                {/* Project title */}
                <h3 className="mb-6 text-3xl font-bold">{portfolio.name}</h3>

                {/* Project description */}
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  {portfolio.overview}
                </p>

                {/* Tech stack badges */}
                <div className="mb-8 flex flex-wrap gap-3">
                  {portfolio.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-bold text-gray-500 dark:bg-gray-700/50 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links: preview + source code */}
                <div className="mt-2 flex gap-8">
                  <Link
                    href={portfolio.preview}
                    target="_blank"
                    className="flex items-center gap-2 font-semibold text-cyan-600 transition-colors hover:underline dark:text-cyan-400/80 dark:hover:text-cyan-400"
                  >
                    <HiOutlineGlobeAlt className="h-5 w-5" />
                    <span>Preview</span>
                  </Link>

                  <Link
                    href={portfolio.sourceUrl}
                    target="_blank"
                    className="flex items-center gap-2 font-semibold text-cyan-600 transition-colors hover:underline dark:text-cyan-400/80"
                  >
                    <AiFillGithub className="h-5 w-5" />
                    <span>Source</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* "More" button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-25 text-center"
      >
        <Link
          href="/portfolio"
          className="inline-block rounded-full border border-gray-300 px-10 py-3 text-lg font-bold transition-colors hover:border-cyan-500 hover:text-cyan-600 dark:border-dotted dark:border-gray-400/40 dark:bg-gray-700/20 dark:text-cyan-400 dark:hover:border-amber-500/80 dark:hover:text-amber-600/70"
        >
          More →
        </Link>
      </motion.div>
    </section>
  )
}

export default Portfolio
