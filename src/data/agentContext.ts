import fs from 'fs'
import path from 'path'
import { portfolios } from './portfolio'
import { frontendSkills, backendSkills, fullSkillSet } from './skillsData'
import { education } from './educationData'

/**
 * Loads the base system prompt (dev: agent-prompt.txt, prod: AGENT_CONTEXT_*)
 * and appends live data from portfolio.ts, skillsData.ts, and educationData.ts
 * Server-only — never expose to the client
 */

export interface AgentContext {
  systemPrompt: string
  currentDate: string
  timestamp: number
}

/** Exact project names used as the enum for the get_project_details tool */
export const projectNames = portfolios.map((p) => p.name)

/** Short one-liner overview per project (name + truncated description) */
function buildProjectsOverviewSection(): string {
  return portfolios
    .map((p) => {
      const featured = p.featured ? ' (Featured)' : ''
      const short =
        p.overview.length > 120
          ? p.overview.slice(0, 117).trimEnd() + '…'
          : p.overview
      return `- ${p.name}${featured}: ${short}`
    })
    .join('\n')
}

/**
 * Returns full project details (how-it-works, case study, tech stack, links)
 * by name; Used by the get_project_details tool
 */
export function getProjectDetails(name: string): {
  name: string
  overview: string
  howItWorks: string | null
  caseStudy: string | null
  techStack: string
  sourceUrl: string | null
  preview: string | null
} | null {
  const project = portfolios.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  )
  if (!project) return null

  const techStack =
    project.fullTechStack && project.fullTechStack.length > 0
      ? project.fullTechStack.join(', ')
      : project.techStack.join(', ')

  return {
    name: project.name,
    overview: project.overview,
    howItWorks: project.howItWorks ?? null,
    caseStudy: project.caseStudy ?? null,
    techStack,
    sourceUrl: project.sourceUrl ?? null,
    preview: project.preview ?? null,
  }
}

const skillCategoryNames = fullSkillSet.map((cat) => cat.category)

function buildSkillsOverviewLine(): string {
  return `Categories: ${skillCategoryNames.join(', ')}`
}

/** Full skills section with proficiency levels and category breakdown */
function buildSkillsDetail(): string {
  const frontend = frontendSkills
    .map((s) => `- ${s.label} (${s.level}%)`)
    .join('\n')

  const backend = backendSkills
    .map((s) => `- ${s.label} (${s.level}%)`)
    .join('\n')

  const full = fullSkillSet
    .map(
      (cat) =>
        `**${cat.category}**\n${cat.skills.map((sk) => `- ${sk}`).join('\n')}`,
    )
    .join('\n\n')

  return `### Frontend Skills (with proficiency)
${frontend}

### Backend Skills (with proficiency)
${backend}

### Full Skill Set (by category)
${full}`
}

function buildEducationOverviewLine(): string {
  const titles = education.map((e) => e.title).join(', ')
  return `Titles: ${titles}`
}

/** Full education and certificates section */
function buildEducationDetail(): string {
  return education
    .map((e) => {
      const status = e.inProgress ? ' (in progress)' : ''
      const points = e.points.map((p) => `  - ${p}`).join('\n')

      return `### ${e.title}${status}
Organization: ${e.org}
Period: ${e.time}
Learned:
${points}`
    })
    .join('\n\n')
}

export type BackgroundSection = 'skills' | 'education'

/**
 * Returns full skills and/or education details on demand
 * Used by the get_developer_background tool (in-memory, no extra API call)
 */
export function getDeveloperBackground(
  sections: BackgroundSection[],
): Partial<Record<BackgroundSection, string>> {
  const result: Partial<Record<BackgroundSection, string>> = {}
  if (sections.includes('skills')) result.skills = buildSkillsDetail()
  if (sections.includes('education')) result.education = buildEducationDetail()
  return result
}

/** Loads the base personality/rules prompt from file or env vars */
function loadBasePrompt(): string {
  if (process.env.NODE_ENV === 'production') {
    const systemPrompt = (
      (process.env.AGENT_CONTEXT_1 ?? '') +
      (process.env.AGENT_CONTEXT_2 ?? '') +
      (process.env.AGENT_CONTEXT_3 ?? '') +
      (process.env.AGENT_CONTEXT_4 ?? '')
    ).trim()

    if (!systemPrompt) {
      console.warn('AGENT_CONTEXT_* is not set, using default prompt')
      return 'You are a helpful assistant for a web developer portfolio.'
    }

    return systemPrompt
  }

  try {
    const filePath = path.join(process.cwd(), 'agent-prompt.txt')
    const systemPrompt = fs.readFileSync(filePath, 'utf-8').trim()

    if (!systemPrompt) {
      throw new Error('agent-prompt.txt is empty')
    }

    return systemPrompt
  } catch (error) {
    console.error('Failed to read agent-prompt.txt:', error)
    console.warn('Using default fallback prompt')
    return 'You are a helpful assistant for a web developer portfolio.'
  }
}

/**
 * Builds the complete agent context
 * The current date is returned separately (not part of systemPrompt)
 * so the prompt stays byte-identical for DeepSeek prefix caching
 */
export const getAgentContext = (): AgentContext => {
  const basePrompt = loadBasePrompt()

  const projectsSection = buildProjectsOverviewSection()
  const skillsOverview = buildSkillsOverviewLine()
  const educationOverview = buildEducationOverviewLine()

  const systemPrompt = `${basePrompt}

=== SOURCE OF TRUTH RULES (STRICT) ===
- When the user asks about PROJECTS / portfolio / apps / tech stack of a project → answer ONLY from the PROJECTS section below, or from a get_project_details tool result if you called it. Never invent or use outdated knowledge.
- When the user asks about SKILLS / technologies / proficiency in any detail → call get_developer_background(["skills"]) first, then answer ONLY from that result.
- When the user asks about EDUCATION / certificates / courses / certifications / IT training in any detail → call get_developer_background(["education"]) first, then answer ONLY from that result.
- If information is missing even after calling the relevant tool, say you don't have that detail instead of guessing.
- Never claim a project uses a technology that is not listed in its tech stack (e.g. do not say HomeSphere uses MongoDB).

=== ANSWER LENGTH & DEPTH (IMPORTANT) ===
- Be concise. The user wants the key facts, not an essay.
- For project questions: 100–180 words. Cover: what it is, the ONE most interesting technical decision, and the tech stack. Skip the rest.
- For skills questions: 80–150 words. Name the top 3–5 technologies per category, don't list everything.
- NEVER truncate mid-sentence. If you're running long, wrap up gracefully with a complete final sentence.
- Do NOT invent details — but also do NOT pad. Say what matters.
- One or two short paragraphs max. Bullet points are fine.

=== PROJECTS (overview only — call get_project_details for how-it-works, case study, and full tech stack) ===
${projectsSection}

=== SKILLS (overview only) ===
${skillsOverview}

=== EDUCATION & CERTIFICATES (overview only) ===
${educationOverview}
`

  const now = new Date()

  return {
    systemPrompt,
    currentDate: now.toISOString().split('T')[0],
    timestamp: now.getTime(),
  }
}

/** Logs context metadata in development */
export const logAgentContext = (): void => {
  if (process.env.NODE_ENV === 'development') {
    const context = getAgentContext()
    console.log('📋 Agent Context loaded:')
    console.log(`  - Date: ${context.currentDate}`)
    console.log(`  - Prompt length: ${context.systemPrompt.length} chars`)
    console.log(`  - Timestamp: ${context.timestamp}`)
  }
}