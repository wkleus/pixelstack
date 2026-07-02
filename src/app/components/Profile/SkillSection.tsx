import React from 'react'
import SkillBar from './SkillBar'

interface Skill {
  label: string // Name of the skill (e.g., "React")
  level: number // Skill level as a percentage (0–100)
  delay?: number // Optional animation delay in seconds
}

interface SkillSectionProps {
  title: string // Section title (e.g., "Frontend Skills")
  icon: React.ReactNode // Icon component displayed next to the title
  skills: Skill[] // Array of skills to render
}

export default function SkillSection({
  title,
  icon,
  skills,
}: SkillSectionProps) {
  return (
    // Outer card container with hover animation and theme-aware styling
    <div className="dark:bg-dark/50 bg-light mx-10 rounded-lg p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/20 sm:mx-25 md:mx-3 lg:mx-5">
      {/* Header: title + icon */}
      <div className="flex gap-4 text-4xl">
        <h3 className="mb-6 text-xl font-semibold">{title}</h3>

        {/* Icon aligned to the right */}
        <div className="ml-auto text-cyan-500">{icon}</div>
      </div>

      {/* Skill bars list */}
      <div className="space-y-5 dark:text-gray-300">
        {skills.map((s, i) => (
          <SkillBar
            key={i} // Index as key (safe here because list is static)
            label={s.label} // Skill name
            level={s.level} // Skill percentage
            delay={s.delay} // Optional animation delay
          />
        ))}
      </div>
    </div>
  )
}
