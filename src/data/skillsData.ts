/**
 * Frontend skillset used in the Profile page.
 * Each entry represents a skill label, a proficiency level (0–100),
 * and an optional animation delay for the SkillBar component.
 */
export const frontendSkills = [
  { label: 'React.js • Redux Toolkit', level: 85, delay: 0.2 },
  { label: 'Next.js', level: 70, delay: 0.4 },
  { label: 'JavaScript', level: 85, delay: 0.6 },
  { label: 'TypeScript', level: 70, delay: 0.8 },
  { label: 'CSS • Tailwind CSS • Bootstrap', level: 90, delay: 1.0 },
  { label: 'UX/UI • Responsive Design', level: 85, delay: 1.2 },
]

/**
 * Backend skillset used in the Profile page.
 * Same structure as frontendSkills: label, numeric level, and animation delay.
 */
export const backendSkills = [
  { label: 'Node.js • Express.js', level: 80, delay: 0.2 },
  { label: 'Java • Spring Boot', level: 65, delay: 0.4 },
  { label: 'Python • Flask • Django', level: 55, delay: 0.6 },
  {
    label: 'Databases (MongoDB • PostgreSQL • MySQL • SQL/NoSQL)',
    level: 65,
    delay: 0.8,
  },
  { label: 'JSON • HTTP • REST APIs', level: 75, delay: 1.0 },
  { label: 'Testing • Debugging', level: 60, delay: 1.2 },
  { label: 'Git • GitHub', level: 65, delay: 1.4 },
  {
    label: 'Cloud (AWS) • Docker • Microservices',
    level: 50,
    delay: 1.6,
  },
]
