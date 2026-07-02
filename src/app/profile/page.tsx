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
      className="mx-auto my-15 max-w-7xl"
    >
      <h1 className="mb-5 text-center text-4xl font-bold">Hey,</h1>

      <section className="mb-15">
        <p className="mx-auto max-w-4xl text-center text-lg dark:text-gray-300">
          I&apos;m a Full Stack Web Developer with a passion for creating
          user-friendly and visually stunning websites.
        </p>
      </section>

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

        {/* View full skill set button — centered below the grid */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-10 cursor-pointer rounded-lg border-2 border-cyan-300 px-8 py-3 font-bold text-cyan-500 transition-colors hover:border-amber-500 hover:text-amber-600 dark:border-cyan-700 dark:text-gray-300 dark:hover:text-amber-400"
          >
            View full skill set
          </button>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="section-title mt-16">My Education & Experience</h2>

        <div className="mx-auto max-w-2xl space-y-10">
          {education.map((item, i) => (
            <EducationCard key={i} {...item} />
          ))}
        </div>
      </section>

      {/* Skill modal */}
      <SkillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  )
}
