'use client'

import { portfolios } from '@/data/portfolio'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'
import {
  HiOutlineGlobeAlt,
  HiOutlineCode,
  HiOutlineInformationCircle,
  HiOutlineDocumentText,
} from 'react-icons/hi'
import SearchBar from '../components/Search/SearchBar'
import { useSearch } from '@/app/hooks/useSearch'
import { useState, useEffect } from 'react'

const Portfolio = () => {
  const { query, setQuery, filtered, totalCount, resultCount } = useSearch(
    portfolios,
    ['name', 'overview', 'techStack'],
  )
  const [selectedTechStack, setSelectedTechStack] = useState<string[] | null>(
    null,
  )
  const [selectedProjectName, setSelectedProjectName] = useState<string>('')
  const [selectedHowItWorks, setSelectedHowItWorks] = useState<string | null>(
    null,
  )
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(
    null,
  )

  const openModal = (techStack: string[], projectName: string) => {
    setSelectedTechStack(techStack)
    setSelectedProjectName(projectName)
  }

  const closeModal = () => {
    setSelectedTechStack(null)
    setSelectedProjectName('')
  }

  const openHowItWorks = (howItWorks: string, projectName: string) => {
    setSelectedHowItWorks(howItWorks)
    setSelectedProjectName(projectName)
  }

  const closeHowItWorks = () => {
    setSelectedHowItWorks(null)
    setSelectedProjectName('')
  }

  const openCaseStudy = (caseStudy: string, projectName: string) => {
    setSelectedCaseStudy(caseStudy)
    setSelectedProjectName(projectName)
  }

  const closeCaseStudy = () => {
    setSelectedCaseStudy(null)
    setSelectedProjectName('')
  }

  // Handle body scroll when modal is open/closed
  useEffect(() => {
    if (selectedTechStack || selectedHowItWorks || selectedCaseStudy) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [selectedTechStack, selectedHowItWorks, selectedCaseStudy])

  return (
    <div className="py-28 sm:mx-15 md:mx-5 lg:mx-15 xl:mx-30">
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
        className="mx-5 mt-6 mb-10 text-center text-lg text-gray-500"
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
        {'.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: -120 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ margin: '0 2rem' }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by name, description or tech..."
          resultCount={resultCount}
          totalCount={totalCount}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-1 gap-6 md:mx-25 lg:mx-0 lg:grid-cols-2 2xl:grid-cols-3"
      >
        {filtered.map((portfolio) => (
          <article
            key={portfolio.name}
            className="dark:bg-dark/50 mx-1 grid min-h-[400px] grid-rows-[auto_auto_1fr_auto] rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
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
            <div className="flex">
              <h3 className="mb-2 text-xl font-semibold">{portfolio.name}</h3>
              {/* howItWorks */}
              {portfolio.howItWorks && (
                <button
                  onClick={() =>
                    openHowItWorks(portfolio.howItWorks!, portfolio.name)
                  }
                  className="group relative -mt-5 flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                  aria-label={`How ${portfolio.name} works`}
                >
                  <HiOutlineInformationCircle className="h-5.5 w-5.5" />
                  {/* custom tooltip */}
                  <span className="absolute bottom-full left-9 -mb-2 -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-yellow-100 dark:text-black">
                    How HomeSphere works
                    {/* small arrow */}
                    <span className="absolute top-full left-1/3 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-yellow-100"></span>
                  </span>
                </button>
              )}

              {/* caseStudy  */}
              {portfolio.caseStudy && (
                <button
                  onClick={() =>
                    openCaseStudy(portfolio.caseStudy!, portfolio.name)
                  }
                  className="group relative -mt-5 flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                  aria-label={`Case study for ${portfolio.name}`}
                >
                  <HiOutlineDocumentText className="h-5 w-5" />
                  {/* custom tooltip */}
                  <span className="absolute bottom-full left-8 -mb-2.5 -translate-x-1/2 rounded-lg bg-gray-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-yellow-100 dark:text-black">
                    Open Case Study
                    {/* with small arrow */}
                    <span className="absolute top-full left-1/3 -translate-x-1/2 border-7 border-transparent border-t-gray-900 dark:border-t-gray-100"></span>
                  </span>
                </button>
              )}
            </div>
            <p className="mb-5 text-gray-600 dark:text-gray-300">
              {portfolio.overview}
            </p>
            <div className="mb-4 flex min-h-[80px] flex-wrap content-center items-center gap-2">
              {portfolio.techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full bg-cyan-200/20 px-3 py-1 text-sm text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-6 md:text-sm lg:text-base">
              {portfolio.showFullTechStack && portfolio.fullTechStack && (
                <button
                  onClick={() =>
                    openModal(portfolio.fullTechStack!, portfolio.name)
                  }
                  className="text-secondary flex cursor-pointer items-center gap-1 transition-colors hover:text-cyan-500"
                >
                  <HiOutlineCode className="h-6 w-6" />
                  <span>Tech Stack</span>
                </button>
              )}
              <Link
                href={portfolio.preview}
                target="_blank"
                className="text-secondary flex items-center gap-1 transition-colors hover:text-cyan-500"
              >
                <HiOutlineGlobeAlt className="h-6 w-6" />
                <span>Preview</span>
              </Link>
              <Link
                href={portfolio.sourceUrl}
                target="_blank"
                className="text-secondary flex items-center gap-1 transition-colors hover:text-cyan-500"
              >
                <FaGithub className="h-5 w-5" />
                <span>Source</span>
              </Link>
            </div>
          </article>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-gray-400">
          No projects match your search.
        </p>
      )}

      {/* How it works Modal */}
      {selectedHowItWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeHowItWorks}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeHowItWorks}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="mb-6 text-2xl font-bold text-cyan-600 dark:text-cyan-100">
              How {selectedProjectName} works
            </h2>

            <div className="prose prose-cyan dark:prose-invert max-w-none">
              {selectedHowItWorks.split('\n').map((paragraph, index) => {
                if (paragraph.trim().match(/^(\d+\.|\*|-)\s/)) {
                  return (
                    <li key={index} className="ml-6 list-disc">
                      {paragraph.trim().replace(/^(\d+\.|\*|-)\s/, '')}
                    </li>
                  )
                }
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className="mb-3 text-gray-700 dark:text-gray-300"
                    >
                      {paragraph.trim()}
                    </p>
                  )
                }
                return null
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeHowItWorks}
                className="cursor-pointer rounded-lg bg-cyan-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeCaseStudy}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl dark:border dark:border-gray-100/10 dark:bg-gray-900 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/40 [&::-webkit-scrollbar-thumb]:transition-colors hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400/60 [&::-webkit-scrollbar-track]:bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeCaseStudy}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="mb-6 text-2xl font-bold text-cyan-600 dark:text-cyan-100">
              Case Study – {selectedProjectName}
            </h2>

            <div className="prose prose-cyan dark:prose-invert max-w-none">
              {selectedCaseStudy.split('\n').map((paragraph, index) => {
                const trimmed = paragraph.trim()

                if (trimmed.match(/^(\d+\.|\*|-)\s/)) {
                  return (
                    <li key={index} className="ml-6 list-disc">
                      {trimmed.replace(/^(\d+\.|\*|-)\s/, '')}
                    </li>
                  )
                }

                // Short, capitalized, punctuation-free lines are treated as
                // section headings (e.g. "Problem / Goal", "Technical Challenges")
                if (
                  trimmed &&
                  trimmed.length < 40 &&
                  /^[A-Z]/.test(trimmed) &&
                  !trimmed.endsWith('.')
                ) {
                  return (
                    <h3
                      key={index}
                      className="mt-5 mb-2 text-lg font-semibold text-gray-900 first:mt-0 dark:text-white"
                    >
                      {trimmed}
                    </h3>
                  )
                }

                if (trimmed) {
                  return (
                    <p
                      key={index}
                      className="mb-3 text-gray-700 dark:text-gray-300"
                    >
                      {trimmed}
                    </p>
                  )
                }
                // blank lines in the source become visible spacing here,
                // instead of being silently dropped
                return <div key={index} className="h-3" />
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeCaseStudy}
                className="cursor-pointer rounded-lg bg-cyan-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tech Stack Modal */}
      {selectedTechStack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="mb-8 text-2xl font-bold text-cyan-600 dark:text-cyan-100">
              Full Tech Stack – {selectedProjectName}
            </h2>

            <div className="flex flex-wrap gap-3">
              {selectedTechStack.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-lg bg-cyan-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-cyan-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Portfolio
