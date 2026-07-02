/**
 * Frontend skillset used in the Profile page.
 * Each entry represents a skill label, a proficiency level (0–100),
 * and an animation delay for the SkillBar component.
 */
export const frontendSkills = [
  { label: 'React.js • Redux Toolkit', level: 85, delay: 0.2 },
  { label: 'Next.js', level: 75, delay: 0.4 },
  { label: 'JavaScript', level: 85, delay: 0.6 },
  { label: 'TypeScript', level: 75, delay: 0.8 },
  {
    label: 'CSS • Tailwind CSS • Bootstrap • Animations',
    level: 90,
    delay: 1.0,
  },
  { label: 'UX/UI • Responsive Design', level: 85, delay: 1.2 },
]

/**
 * Backend skillset used in the Profile page.
 */
export const backendSkills = [
  { label: 'Node.js • Express.js', level: 80, delay: 0.2 },
  { label: 'Java • Spring Boot', level: 65, delay: 0.4 },
  { label: 'Python • Flask • Django', level: 50, delay: 0.6 },
  {
    label: 'Databases (MongoDB • PostgreSQL • MySQL • SQL/NoSQL)',
    level: 70,
    delay: 0.8,
  },
  { label: 'JSON • HTTP • REST APIs', level: 75, delay: 1.0 },
  { label: 'Testing • Debugging', level: 65, delay: 1.2 },
  { label: 'Git • GitHub', level: 75, delay: 1.4 },
  { label: 'Cloud (AWS) • Docker • Microservices', level: 50, delay: 1.6 },
  {
    label: 'AI Integration • LLM APIs • Tool Calling • Prompt Engineering',
    level: 65,
    delay: 1.8,
  },
]

/**
 * Complete skill list shown in the "View full skill set" modal
 * Structured by categories
 */
export const fullSkillSet = [
  {
    category: 'Programming Languages',
    skills: [
      'JavaScript (ES6+)',
      'TypeScript',
      'HTML5',
      'CSS3',
      'SASS/SCSS',
      'SQL',
      'Java',
      'Python',
    ],
  },
  {
    category: 'Frontend Frameworks & Libraries',
    skills: [
      'React.js',
      'Redux Toolkit',
      'React Router',
      'Next.js',
      'Bootstrap',
      'Tailwind CSS',
      'Chakra UI',
      'Ant Design',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend & API Development',
    skills: [
      'Node.js',
      'Express.js',
      'Spring Boot',
      'Django',
      'Flask',
      'RESTful APIs',
      'API Security',
      'JWT Authentication',
      'JSON & HTTP',
      'Client-Server Communication',
      'Postman',
      'OpenAPI Documentation',
      'Model View Controller (MVC)',
      'Unit Testing',
      'Integration Testing',
    ],
  },
  {
    category: 'Databases & Data Management',
    skills: [
      'MongoDB (NoSQL)',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'Spring Data JPA (ORM)',
      'Database Design',
    ],
  },
  {
    category: 'DevOps, Cloud & Deployment',
    skills: [
      'Docker',
      'Kubernetes',
      'Serverless Computing',
      'Microservices Architecture',
      'AWS Cloud (EC2, VPC, S3, RDS, IAM)',
      'CI/CD Pipelines',
      'GitHub Actions',
      'Vercel',
      'Render',
      'Netlify',
      'Dockerizing Spring Boot Apps',
    ],
  },
  {
    category: 'Build Tools & Development',
    skills: [
      'Vite',
      'Webpack',
      'Babel',
      'ESLint',
      'Prettier',
      'npm',
      'yarn',
      'pnpm',
    ],
  },
  {
    category: 'Design, CSS & Tools',
    skills: [
      'Responsive Web Design',
      'CSS Flexbox & Grid',
      'CSS Variables & Animations',
      'UX/UI Design',
      'Figma (Wireframing, Prototyping, Mockups)',
      'Jest (Unit Testing)',
      'Chrome DevTools',
      'Debugging',
      'Git',
      'GitHub',
      'Command Line (CLI)',
      'VS Code',
      'IntelliJ IDEA',
    ],
  },
  {
    category: 'AI & Intelligent Systems',
    skills: [
      'AI Agent Development',
      'Tool Calling',
      'Function Calling',
      'Prompt Engineering',
      'LLM Integration',
      'DeepSeek API',
      'OpenAI-compatible APIs',
      'Multi-step Planning',
    ],
  },
]
