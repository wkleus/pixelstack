/**
 * Shape of a blog post used throughout the posts system.
 * `content` contains the rendered HTML string for the article body.
 */
export interface Post {
  name: string
  overview: string
  timeToRead: string
  createdAt: string
  handle: string
  content: string // HTML string
}

/**
 * Structure of a portfolio project displayed in the portfolio section.
 */
export interface Portfolio {
  imageSrc: string
  name: string
  overview: string
  techStack: string[]
  preview: string
  sourceUrl: string
  fullTechStack?: string[]
  showFullTechStack?: boolean
  howItWorks?: string
}
