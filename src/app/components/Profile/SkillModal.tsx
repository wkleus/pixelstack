'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { fullSkillSet } from '@/data/skillsData'

interface SkillModalProps {
  isOpen: boolean
  onClose: () => void
}

const SkillModal = ({ isOpen, onClose }: SkillModalProps) => {
  // close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-2xl dark:border-gray-700/50 dark:bg-gray-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-semibold">Full Skill Set</h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-400/40 [&::-webkit-scrollbar-track]:bg-transparent">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {fullSkillSet.map((group) => (
                  <div key={group.category}>
                    {/* Category title */}
                    <h3 className="mb-3 text-sm font-semibold tracking-wider text-cyan-500 uppercase">
                      {group.category}
                    </h3>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-3 text-center text-xs text-gray-400 dark:border-gray-800">
              Press{' '}
              <kbd className="rounded border border-gray-200 px-1.5 py-0.5 font-mono text-[10px] dark:border-gray-700">
                Esc
              </kbd>{' '}
              to close
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SkillModal
