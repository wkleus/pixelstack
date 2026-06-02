import { Post } from '@/types'
import { fundamentalsOfHtml } from './content/fundamentals-of-html'
import { fundamentalsOfCss } from './content/fundamentals-of-css'
import { fundamentalsOfJS } from './content/fundamentals-of-js'
import { fundamentalsOfTS } from './content/fundamentals-of-ts'

/**
 * Blog post metadata used throughout the application.
 * Each entry represents a single article and is rendered
 * inside the Posts list and individual Post pages.
 */
export const posts: Post[] = [
  {
    // Title displayed in lists and on the article page
    name: 'Mastering Modern CSS: Core Concepts Explained',

    // Short summary shown in previews
    overview:
      'A practical guide to today’s CSS — covering selectors, layout systems, and the patterns every developer should know.',

    // Publication date (ISO format)
    // createdAt: '2025-11-03',
    createdAt: '11/03/25',

    // Estimated reading time
    timeToRead: '14 min',

    // URL-friendly identifier used for routing
    handle: 'fundamentals-of-css',

    // Imported article content (MDX or JSX)
    content: fundamentalsOfCss,
  },
  {
    name: 'Modern HTML Essentials: What Every Developer Should Understand',
    overview:
      'A clear introduction to the foundational HTML elements, modern semantics, and best practices for structuring content.',
    createdAt: '2025-10-11',
    timeToRead: '11 min',
    handle: 'fundamentals-of-html',
    content: fundamentalsOfHtml,
  },
  {
    name: 'Modern JavaScript Basics: The Foundations of Today’s Web',
    overview:
      'A concise and practical walkthrough of the core JavaScript concepts that power modern web applications.',
    createdAt: '2025-11-25',
    timeToRead: '15 min',
    handle: 'fundamentals-of-js',
    content: fundamentalsOfJS,
  },
  {
    name: 'TypeScript Fundamentals: From Core Types to Advanced Patterns',
    overview:
      'A comprehensive introduction to TypeScript — covering the type system, generics, narrowing, and powerful language patterns.',
    createdAt: '2025-12-15',
    timeToRead: '20 min',
    handle: 'fundamentals-of-ts',
    content: fundamentalsOfTS,
  },
]
