'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SkillSection from '../components/Profile/SkillSection'
import SkillModal from '../components/Profile/SkillModal'
import EducationCard from '../components/Profile/EducationCard'
import { frontendSkills, backendSkills } from '@/data/skillsData'
import { education } from '@/data/educationData'
import { FiMonitor } from 'react-icons/fi'
import { HiOutlineServer } from 'react-icons/hi'

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: 'easeIn' }}
      className="mx-auto my-15 max-w-7xl overflow-x-clip"
    >
      <h1 className="mb-5 text-center text-4xl font-bold">Hey,</h1>

      {/* Hero Section */}
      <section className="mb-15">
        <p className="mx-auto max-w-4xl px-4 text-center text-lg dark:text-gray-300">
          I&apos;m a Full Stack Web Developer with a passion for creating
          user-friendly and visually stunning websites.
        </p>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="section-title">My Technical Skillset</h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-2">
          <SkillSection
            title="Frontend Engineering"
            icon={<FiMonitor />}
            skills={frontendSkills}
          />

          <SkillSection
            title="Backend Engineering"
            icon={<HiOutlineServer />}
            skills={backendSkills}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-10 cursor-pointer rounded-lg border-2 border-cyan-300 px-8 py-3 font-bold text-cyan-500 transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-cyan-700 dark:text-gray-300 dark:hover:border-amber-400 dark:hover:text-amber-300"
          >
            View full skill set
          </button>
        </div>
      </section>

      {/* Education & Experience Section */}
      <section className="mb-20">
        <h2 className="section-title mt-16">My Education & Experience</h2>

        <div className="mx-auto max-w-2xl space-y-20">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="relative">
                <EducationCard {...item} />

                {/* Connecting arrow to next card */}
                {i < education.length - 1 && (
                  <div
                    className={`pointer-events-none absolute top-3/4 hidden min-[840px]:block h-64 w-24 -translate-y-1/6 ${
                      i % 2 === 0 ? '-right-20' : '-left-20'
                    }`}
                  >
                    <svg
                      className="h-full w-full"
                      viewBox="0 0 48 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {i % 2 === 0 ? (
                        // Right arrow with shorter horizontal line
                        <>
                          <motion.path
                            d="M 8 124 L 22 124 C 25 124, 27 122, 27 119 L 27 9 C 27 6, 25 4, 22 4 L 15 4"
                            stroke="url(#arrowGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.8"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + i * 0.15,
                            }}
                          />
                          <motion.polygon
                            points="8,4 15,1 15,7"
                            fill="url(#arrowGradient)"
                            opacity="0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.8 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: 1.5 + i * 0.15, // 1.5s nach Pfeil-Start
                            }}
                          />
                        </>
                      ) : (
                        // Left arrow with shorter horizontal line
                        <>
                          <motion.path
                            d="M 40 124 L 26 124 C 23 124, 21 122, 21 119 L 21 9 C 21 6, 23 4, 26 4 L 33 4"
                            stroke="url(#arrowGradient)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.8"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              delay: 0.3 + i * 0.15,
                            }}
                          />
                          <motion.polygon
                            points="40,4 33,1 33,7"
                            fill="url(#arrowGradient)"
                            opacity="0"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.8 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: 1.5 + i * 0.15, // 1.5s nach Pfeil-Start
                            }}
                          />
                        </>
                      )}
                      <defs>
                        <linearGradient
                          id="arrowGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skill Modal */}
      <SkillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}
