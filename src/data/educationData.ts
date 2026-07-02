import { AiOutlineCloudSync, AiOutlineRobot } from 'react-icons/ai'
import { BsColumnsGap, BsDatabaseGear } from 'react-icons/bs'
import { RiCodeBoxLine } from 'react-icons/ri'
import { FiPenTool } from 'react-icons/fi'

/**
 * Education & certification data used in the Profile page.
 * Each entry represents a course, certification, or program
 * and is rendered inside the <EducationCard /> component.
 */
export const education = [
  {
    // Title of the certification or program
    title: 'AWS Certified Developer – Associate',

    // Icon component displayed in the card
    icon: AiOutlineCloudSync,

    // Organization or institution providing the certification
    org: 'Amazon Web Services',

    // Time period or completion year
    time: '2025 - Present',

    // Bullet points describing what was learned
    points: [
      'Developing and deploying AWS-based applications',
      'Building CI/CD pipelines',
      'Monitoring and optimizing distributed systems',
    ],
  },
  {
    title: 'AI Agents in Typescript/Javascript',
    icon: AiOutlineRobot,
    org: 'Vanderbilt University',
    time: '2026',
    points: [
      'Building autonomous AI agents in TypeScript/JavaScript',
      'Agent architecture: reasoning, planning and tool use',
      'Prompt engineering for multi-step problem solving',
      'LLM integration across platforms',
    ],
  },
  {
    title: 'Front-End Developer Professional',
    icon: BsColumnsGap,
    org: 'Meta',
    time: '2025',
    points: [
      'Responsive websites with HTML, CSS, JS',
      'ReactJS Advanced',
      'Version control with Git & GitHub',
      'UX/UI Design',
    ],
  },
  {
    title: 'Backend Developer Professional',
    icon: RiCodeBoxLine,
    org: 'IBM',
    time: '2024 - 2025',
    points: [
      'Backend apps with Node & Express',
      'Docker, Kubernetes, Microservices',
      'REST API development',
      'DevOps & Agile practices',
    ],
  },
  {
    title: 'UI Design for Web Developers',
    icon: FiPenTool,
    org: 'Scrimba',
    time: '2024',
    points: [
      'Visual design principles',
      'Figma → Code conversion',
      'User‑focused interface design',
    ],
  },
  {
    title: 'Certified Computer Scientist',
    icon: BsDatabaseGear,
    org: 'SGD',
    time: '2021 - 2023',
    points: [
      'Computer Science fundamentals',
      'Python development',
      'Data encryption',
      'TCP/IP networking',
      'Software engineering',
      'Java, Swing, JavaFX',
      'Raspberry Pi',
      'Artificial Intelligence',
    ],
  },
]
