import { Portfolio } from '@/types'

/**
 * Portfolio project data used across the application.
 * Each object represents a single project and is rendered
 * inside the <Portfolio /> component.
 */
export const portfolios: Portfolio[] = [
  {
    // Project name
    name: 'HomeSphere',

    // Recommended project
    featured: true,

    // Short description of the project
    overview:
      'A full-stack real estate platform featuring property browsing, advanced filtering, an AI-powered natural-language search agent, favorites, interactive maps, a mortgage calculator, email contact, an admin dashboard, and multilingual support (EN/DE).',

    // How the project works
    howItWorks: `HomeSphere is a full-stack real estate platform. Here's how it works:
        
      1. Browse Listings – Explore residential properties across Europe.
      2. AI Property Matching Agent – Describe what you're looking for in plain language (EN/DE) and get matching listings.
      3. Filter & Search – Combined filtering by category, deal type, rooms, area, price, and energy class.
      4. Save Favorites – Save properties to a personal favorites list.
      5. Mortgage Calculator – Estimate monthly payments directly on property detail pages.
      6. Interactive Map – View property locations on the detail page.
      7. Contact Agents – Send inquiries via email through the contact form (powered by Resend).
      8. Multilingual – Fully available in English and German.
    9. Admin Dashboard – Manage the entire property catalog through a protected dashboard (try it via the read-only demo login: email: demo@homesphere.app, password: 123456).`,

    // In-depth case study: problem, challenges, solution & tech
    caseStudy: `Project Period
        May – August 2026.
        Goal
        The goal was to develop a modern, scalable, and user-friendly real estate platform for both property seekers and administrators. The application provides intuitive property browsing with advanced filtering, detailed views, interactive maps, mortgage calculations, a conversational AI search agent, and a secure admin dashboard for complete property management.
        Technical Challenges
        1. Implementing secure authentication and protected admin routes
        2. Building efficient category and deal-type filtering
        3. Integrating third-party services (maps, email delivery, financial calculator)
        4. Managing separate frontend and backend deployments (Vercel + Render)
        5. Ensuring secure server-side validation while using Supabase only for authentication
        6. Integrating a conversational AI agent for natural-language property search, including multi-turn context merging and cost-optimized prompt caching
        7. Keeping AI costs predictable by routing requests across two providers with different reliability and schema guarantees, without degrading result quality
        8. Ensuring reliable image handling: automatic resizing and WebP conversion on upload via Sharp
        Solution & Technologies Used
        I built a clean three-tier architecture:
        - Frontend: React 19 + Vite 8, React Router 7, Framer Motion, Leaflet, react-i18next (EN/DE), Yup for validation
        - Backend: Node.js / Express REST API with raw pg (node-postgres) driver for database queries
        - Database: PostgreSQL hosted on Supabase
        - Auth: Supabase Auth (JWT) + custom middleware using Supabase Admin Client for server-side token validation
        - AI: a dual-provider setup orchestrated via LangGraph for a two-step parse-then-search pipeline, with Free.ai (self-hosted qwen7b model) tried first and DeepSeek used as a paid fallback once Free.ai's free daily token budget is exhausted
        - Validation: Zod schemas on the backend for entries, contact form, and route params, returning field-level 400 errors
        - Testing: Vitest + React Testing Library (frontend), Vitest + Supertest (backend), enforced via a GitHub Actions CI workflow on every push/PR
        - Additional Tools: Resend, express-rate-limit, he (XSS sanitization), Sharp for image processing

        A notable technical aspect was the hybrid Supabase setup: Supabase is used exclusively for authentication and JWT issuance, while all CRUD operations are performed directly via the pg driver. This provided fine-grained control over database queries while maintaining secure token validation on the backend.
        The AI Property Matching Agent lets users describe what they're looking for in plain language (EN/DE). A LangGraph pipeline extracts structured search criteria, then runs a parameterized SQL query. To keep this cost-effective, Free.ai is tried first; a circuit breaker skips it for a cooldown period after a budget-exhausted response, and DeepSeek takes over as a strict-schema fallback. To keep API costs predictable on the DeepSeek side, the system prompt is kept byte-identical across requests to leverage its automatic prompt caching, and only the last 4 turns of chat history are sent.
        Uploaded photos are automatically resized (max 1200px) and re-encoded as WebP (quality 80) via Sharp before being stored in Supabase Storage.
        The platform is fully responsive and includes robust data fetching with a custom useFetch hook and AbortController to prevent race conditions and memory leaks.`,

    // Technologies used in the project
    techStack: [
      'React',
      'React Router',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'DeepSeek',
      'LangGraph',
      'Resend',
      'Vitest',
    ],

    // Complete tech stack with all details (displayed in modal)
    fullTechStack: [
      'React',
      'React Router DOM',
      'JavaScript',
      'TypeScript',
      'CSS',
      'Vite',
      'Node.js',
      'Express',
      'PostgreSQL (Supabase)',
      'Supabase Auth (JWT)',
      'Free.ai (qwen7b, primary AI provider)',
      'DeepSeek (v4-flash, fallback AI provider)',
      'LangGraph + @langchain/core',
      'Zod (validation)',
      'Multer (file uploads)',
      'Sharp 0.35 (image processing)',
      'Helmet (security headers)',
      'Resend',
      'Yup',
      'Phosphor Icons',
      'Lucide Icons',
      'react-i18next',
      'Leaflet + react-leaflet',
      'Framer Motion',
      'Vitest + React Testing Library',
      'Supertest',
      'CORS',
      'dotenv',
      'express-rate-limit',
      'he (XSS sanitization)',
      'Render.com (Backend)',
      'Vercel (Frontend)',
      'Supabase (Database + Auth)',
    ],

    // GitHub repository link
    sourceUrl: 'https://github.com/wkleus/homesphere',

    // Live preview link
    preview: 'https://homesphere-web.vercel.app/',

    // Image displayed in the portfolio section
    imageSrc: '/portfolio-img/homesphere.png',

    // Flag to show full tech stack button
    showFullTechStack: true,
  },
  {
    name: 'Linguify',

    featured: true,

    overview:
      'A full-stack web app for multilingual text work, featuring live translation, an interactive AI Studio for DeepSeek-powered post-editing, text-to-speech, synonym lookup, user accounts with a persisted translation history (Supabase), and a secure contact form.',

    howItWorks: `Linguify is a full-stack web application for multilingual text processing. Here's how it works:

      1. Translation – Enter text and select a target language to translate.
      2. AI Studio – Refine translations using Quick Actions or custom prompts, powered by DeepSeek.
      3. Text-to-Speech – Listen to input and output text read aloud in the selected language.
      4. Synonym Lookup – Find alternative words for text revision.
      5. User Accounts & History – Sign up or log in to automatically save every translation to your personal history. Try it with the test account (email: user@test.com / password: 123456) to explore Translator, Synonym Finder, and Settings without signing up.
      6. Automation Features – Configure auto-clear, auto-copy, and live translation in the settings.
      7. Language Switching – Switch between supported languages with a single click.
      8. Contact – Reach out via a secure contact form.`,

    caseStudy: `Project Period
        February - July 2026.
        Goal
        The goal was to build a full-stack multilingual text-processing app that goes beyond a simple translator: fast, free translation for everyday use, combined with an optional AI layer for higher-quality, context-aware refinement, plus supporting tools like text-to-speech, synonym lookup, and a personal translation history for registered users.
        Technical Challenges
        1. Keeping AI costs proportional to actual usage while still offering high-quality, DeepSeek-powered translation refinement
        2. Implementing secure user authentication and enforcing per-user data access at the database level
        3. Running the same backend logic (contact form, rate limiting) across two different environments: Vercel Serverless Functions in production and a local Express server in development
        4. Minimizing unnecessary API calls during live translation while typing
        5. Preventing render crashes and API/network failures from breaking the entire app
        Solution & Technologies Used
        I built a clean, cost-conscious architecture:
        - Frontend: React 19 + Vite 7, TailwindCSS 4, React Router, Framer Motion, Context API + Custom Hooks
        - Translation: MyMemory API for free, default translation; DeepSeek v4 Flash for optional, on-demand AI Post-Editing via a dedicated AI Studio
        - Auth & Data: Supabase Auth (email/password) for user accounts, Supabase Postgres for translation history, secured entirely through Row Level Security (auth.uid() = user_id) instead of application-level checks
        - Backend: Vercel Serverless Functions in production (api/contact.js, api/improve.js), a local Express.js server for development — sharing the same underlying service logic (shared/) to avoid duplicated code
        - Additional Tools: Resend (email), Upstash Redis + express-rate-limit (rate limiting), Web Speech API (text-to-speech), Datamuse API (synonym lookup)
        - Testing: Jest 30 + React Testing Library, enforced via a GitHub Actions CI workflow (lint, dependency audit, tests) on every push/PR

        A key architectural decision was keeping AI usage cost-conscious by design: the free MyMemory API handles all default and live translation, while the paid DeepSeek API is only called when a user explicitly opens AI Studio. This keeps per-request AI costs proportional to actual demand for higher-quality output, rather than scaling with every keystroke or translation.
        For live translation, I used a custom useDebounce hook to delay API calls until the user stops typing, reducing unnecessary requests without sacrificing responsiveness.
        On the data side, translation history reads and writes go directly from the client to Supabase, with authorization enforced entirely at the database level via Row Level Security rather than through custom backend endpoints — reducing both backend surface area and the risk of authorization bugs.
        An app-wide ErrorBoundary catches render crashes and shows a fallback instead of a blank screen, while API and network failures are handled inside custom hooks like useTranslator, so neither takes down the whole app.`,

    techStack: [
      'React',
      'Vite',
      'TailwindCSS',
      'React Router',
      'Supabase',
      'DeepSeek AI',
      'Express',
      'Jest',
      'GitHub Actions (CI/CD)',
      'React Testing Library',
    ],

    fullTechStack: [
      'React',
      'JavaScript',
      'TailwindCSS',
      'React Router',
      'Context API',
      'Custom Hooks',
      'Vite',
      'Framer Motion',
      'Phosphor Icons',
      'React Icons',
      'Web Speech API',
      'localStorage',
      'Supabase Auth (email + password)',
      'Supabase Postgres (translation_history, Row Level Security)',
      'Vercel',
      'DeepSeek v4 Flash (AI Studio Post-Editing)',
      'Resend API (email sending)',
      'REST APIs (MyMemory Translation API, Datamuse API)',
      'Vercel Serverless Functions',
      'Express.js (local dev backend)',
      'Upstash Redis (rate limiting)',
      'Jest',
      'React Testing Library',
      'ESLint',
      'GitHub Actions (CI: lint, audit, tests)',
    ],

    sourceUrl: 'https://github.com/wkleus/linguify',

    preview: 'https://linguify-web.vercel.app/',

    imageSrc: '/portfolio-img/linguify.png',

    showFullTechStack: true,
  },
  {
    name: 'PixelStack Portfolio',

    featured: true,

    overview:
      'An animated, responsive portfolio featuring a database-backed blog, a contact form with real email delivery, newsletter subscriptions, portfolio and blog search, dark/light mode, and an AI assistant that answers questions and intelligently prefills the contact form based on user intent.',

    howItWorks: `PixelStack is a full‑stack portfolio platform with dynamic content, AI assistance, and real email delivery. Here’s how it works:

      1. Portfolio & Projects – Explore showcased apps with descriptions, tech stacks and live links
      2. Blog System – Read developer posts with clean formatting and easy navigation
      3. Search – Filter portfolio items and blog posts by title, tags, or keywords
      4. AI Assistant – Ask questions about skills, projects, or tech stack; the AI can also prefill the contact form based on your intent
      5. Contact Form – Send real messages with validation, sanitization and automatic reply
      6. Newsletter – Subscribe to updates; admin receives notifications instantly
      7. Admin Area – Create, edit, publish, or delete posts through a protected dashboard, which also shows live all-time visitor stats pulled from the self-hosted Umami analytics instance
      8. Dark Mode – Switch themes with a persisteSnt preference`,

    caseStudy: `Project Period

        February – July 2026.
        Goal
        The goal was to build a full-stack developer portfolio that goes beyond a static showcase: a database-backed blog, real email delivery for contact and newsletter, portfolio/blog search, and an AI assistant that not only answers questions about the developer's background but actively helps visitors get in touch by detecting their intent and prefilling the contact form.
        Technical Challenges
        1. Migrating blog content management away from hand-edited HTML in a database cell to a proper, password-protected admin dashboard
        2. Making the Prisma ORM work without its bundled Rust query engine (dropped in Prisma 7), requiring a driver adapter setup
        3. Storing an admin credential safely in environment variables without it getting corrupted by shell/'.env' expansion
        4. Enabling the AI assistant to reliably detect user intent and trigger the correct action (contact form prefill) rather than just answering questions
        5. Protecting a public AI endpoint from abuse while keeping responses fast
        6. Safely rendering blog post content (stored as HTML in the database) on the public site without introducing XSS risks or broken layout
        7. Rolling out a Content-Security-Policy without breaking React's development-mode tooling (which relies on eval() for debugging) or third-party scripts (analytics, error reporting) already in use
        Solution & Technologies Used
        I built a full-stack architecture on top of Next.js:
        - Frontend: Next.js 16 (App Router) + TypeScript 5 (strict mode), React 19, Tailwind CSS 4, Framer Motion
        - Database: PostgreSQL hosted on Neon, accessed via Prisma 7 using the @prisma/adapter-pg driver adapter (required since Prisma 7 dropped the bundled Rust query engine)
        - Admin & Auth: Auth.js v5 with a Credentials provider for a single admin account; the password hash is stored Base64-encoded in an environment variable to survive shell/.env expansion, then decoded at runtime before comparison
        - Route protection: two independent layers — middleware.ts redirects unauthenticated requests before rendering, and every protected page/Server Action re-checks the session server-side via auth()
        - AI: DeepSeek (OpenAI-compatible API) powering a floating chat widget with Tool Calling and intent detection, rate-limited to 1 request per 5 seconds per IP
        - Content: authored in a plain textarea in the admin dashboard, stored as HTML in PostgreSQL and rendered on the public site via dangerouslySetInnerHTML
        - Email: Resend for contact form delivery (with auto-reply) and newsletter admin notifications, both with server-side validation, XSS sanitization, and rate limiting
        - Testing: Jest (unit + API tests) and Playwright (E2E), covering hook logic, route validation, and full browser flows
        - CI/CD: GitHub Actions runs lint and the unit/API test suite on every push and pull request to main, catching regressions before they reach production
        - Observability: Sentry error tracking wired into all three Next.js runtimes (client, server, edge) via instrumentation.ts, with alerting on high-priority issues
        - Security: HTTP security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) applied via next.config.ts, with the Content-Security-Policy scoped to the app's actual third-party origins rather than broadly permissive defaults
        - Analytics: self-hosted Umami (separate Vercel deployment + Neon Postgres), tracking visits across the custom domain and the Vercel URL under one unified dashboard; all-time stats are also surfaced directly in the admin dashboard via a server-side fetch authenticated against Umami's login endpoint

        A key feature is the AI assistant's contact form prefill via Tool Calling: DeepSeek analyzes the user's message, decides whether to call a prefill_contact_form tool with a topic (job, project, collaboration, quote, feedback, other), and the chat widget then navigates to /connect?topic=[topic], where the contact form reads the URL parameter and pre-selects the matching option with a visual indicator — turning a conversational request into a ready-to-submit form without manual selection.
        On the data side, blog posts moved from static seed files to a proper PostgreSQL table, with all reads centralized in a single access layer (src/lib/posts.ts) that only ever returns published posts, and pages fetching through it as Server Components.
        Every admin create/update/delete action calls revalidatePath() for the affected routes, so changes made in the dashboard appear on the live site immediately without a redeploy.
        Site analytics run through a self-hosted Umami instance with its own Neon-backed database. Since the custom domain is DNS-routed to the same Vercel deployment rather than being separately hosted, a single tracking script captures visits across both the custom domain and the Vercel URL in one unified dashboard.`,

    techStack: [
      'Next.js',
      'TypeScript',
      'React',
      'TailwindCSS',
      'Prisma',
      'PostgreSQL',
      'Resend',
      'DeepSeek AI',
      'Framer Motion',
      'Jest',
    ],

    fullTechStack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'Heroicons',
      'React Icons',
      'PostgreSQL (hosted on Neon)',
      'Prisma (driver adapter via pg)',
      'Auth.js (Credentials)',
      'Resend SDK',
      'bcryptjs (password hashing)',
      'DeepSeek API (OpenAI-compatible)',
      'Tool Calling',
      'Intent Detection',
      'react-markdown + remark-gfm (AI chat widget)',
      'Jest (unit & API tests)',
      'Playwright (E2E tests)',
      'Sentry (error tracking)',
      'GitHub Actions (CI/CD)',
      'Vercel (deployment)',
      'IONOS (custom domain)',
    ],

    sourceUrl: 'https://github.com/wkleus/pixelstack',

    preview: 'https://pixelstack-me.vercel.app/',

    imageSrc: '/portfolio-img/portfolio-fullstack.png',

    showFullTechStack: true,
  },
  {
    name: 'Booking App',
    featured: false,
    overview:
      'A lightweight full‑stack reservation demo built to demonstrate MongoDB integration, Docker containerization, and a clean Express and React (TypeScript) setup.',
    caseStudy: `Project Period
    August 2026.
    Goal
     The goal here was to create a focused, clean showcase of two specific skills: Docker containerization and MongoDB integration. The result is a small full-stack reservation app with a clean Express + React (TypeScript) setup.
     Technical Challenges
    1. Structuring a multi-container setup (frontend, API, database) that starts reliably with a single command
    2. Avoiding a bloated, insecure production image by keeping build tooling out of the final container
    3. Making the API wait for MongoDB to be ready instead of crashing on startup
    4. Serving a Vite-built React app in production without a Node runtime
    5. Keeping the frontend's API calls environment-agnostic across local dev and containerized runs
    Solution & Technologies Used
    I built a three-service architecture orchestrated entirely through Docker Compose:
    - Frontend: React 19 + Vite, TypeScript, calling a REST API through a small typed fetch layer
    - Backend: Node.js / Express 5 + TypeScript, with Mongoose for schema validation and data access
    - Database: MongoDB running in its own container, with a named volume so data survives container restarts
    - Containerization: multi-stage Dockerfiles for both frontend and backend — a build stage compiles TypeScript (backend) or runs the Vite production build (frontend), while a separate, minimal runtime stage ships only the compiled output. The backend runtime installs production dependencies only (npm ci --omit=dev) and runs as a non-root user; the frontend runtime is a lightweight nginx:alpine image that serves the static build and reverse-proxies /api/* to the backend container
    - Orchestration: a single docker-compose.yml wires up all three services on an internal network, with a MongoDB healthcheck gating API startup so the API only comes up once the database is actually ready to accept connections

    The whole stack — frontend, API, and database — starts with one command: docker compose up --build. No local Node installation, no separate npm run dev step, and no manual database setup required, making the project easy to run and inspect end to end.`,
    techStack: [
      'React',
      'TypeScript',
      'MongoDB',
      'Mongoose',
      'Docker',
      'Node.js',
      'Express.js',
      'Vite',
    ],
    fullTechStack: [
      'React',
      'TypeScript',
      'MongoDB',
      'Docker',
      'Node.js',
      'Express.js',
      'tsx',
      'Mongoose',
      'Docker Compose',
      'Vite',
      'cors',
      'dotenv',
      'ES modules',
    ],
    sourceUrl: 'https://github.com/wkleus/booking-app/',
    imageSrc: '/portfolio-img/booking-form.png',
    showFullTechStack: true,
  },
  {
    name: 'VIPE Media',
    overview:
      'An editorial news feed for art and culture. Users can browse articles by category, search live, bookmark stories and read them in detail — complete with smooth loading states and a refined dark mode.',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'App Router',
      'Dark Mode',
      'Infinite Scroll',
    ],
    fullTechStack: [
      'Next.js 16 (App Router, Turbopack)',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'lucide-react',
      'next-themes',
      'Prisma',
      '@upstash/redis',
      'clsx / tailwind-merge',
      'IntersectionObserver',
      'localStorage',
    ],
    sourceUrl: 'https://github.com/wkleus/vipe-media/',
    preview: 'https://vipe-media.vercel.app/',
    imageSrc: '/portfolio-img/vipe-media.png', // anpassen falls nötig
    showFullTechStack: true,
  },
  {
    name: 'Little Lemon Restaurant',
    overview:
      'A responsive and accessible single-page restaurant website featuring client-side routing, a table booking form with validation, and a modular, component-based architecture — built as part of the Meta Front-End Developer Capstone.',
    techStack: [
      'React',
      'React Router',
      'JavaScript (ES6+)',
      'Responsive Design',
      'Accessibility (ARIA)',
      'Component-Based Architecture',
      'Form Validation',
    ],
    fullTechStack: [
      'React',
      'React Router',
      'JavaScript (ES6+)',
      'CSS',
      'Create React App',
      'Font Awesome',
      'Form Validation',
      'Accessibility (ARIA)',
      'Responsive Design',
      'Component-Based Architecture',
      'Jest',
      'React Testing Library',
      'Cloudflare Pages',
    ],
    sourceUrl: 'https://github.com/wkleus/little-lemon/',
    preview: 'https://little-lemon-drt.pages.dev/',
    imageSrc: '/portfolio-img/restaurant-frontend.png',
    showFullTechStack: true,
  },
  {
    name: 'Web Art Blog',
    overview:
      'A responsive personal art blog showcasing articles on prose, lyrics, quotes, digital art, cinema and web design. Features live keyword search across articles, interactive cards with hover effects, a sticky sidebar with social links, and a live digital clock.',
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Client-Side Search',
      'Media Queries',
      'Responsive Design',

      'DOM Manipulation',
    ],
    fullTechStack: [
      'HTML5',
      'CSS3',
      'CSS Grid & Flexbox',
      'JavaScript',
      'CSS Animations',
      'Media Queries',
      'Responsive Design',
      'Client-Side Search',
      'DOM Manipulation',
      'Github Pages',
    ],
    sourceUrl: 'https://github.com/wkleus/art-blog',
    imageSrc: '/portfolio-img/web-art-blog.png',
    showFullTechStack: true,
  },
  {
    name: 'Houseplants Shop',
    overview:
      'An online houseplants shop frontend that lets users browse plants, add them to a cart, adjust quantities, and view an order summary across multiple pages — built as part of the IBM Back-End Developer Capstone.',
    techStack: [
      'React',
      'Redux Toolkit',

      'JavaScript (ES6+)',
      'CSS3',
      'Responsive Design',
      'Client-Side Routing',
      'E-Commerce UI',
      'Component-Based Architecture',
    ],
    fullTechStack: [
      'React',
      'Redux Toolkit',
      'React Redux',
      'React Router',
      'Vite',
      'JavaScript (ES6+)',
      'CSS3',
      'Responsive Design',
      'State Management',
      'Component-Based Architecture',
      'Client-Side Routing',
      'E-Commerce UI',
    ],
    sourceUrl: 'https://github.com/wkleus/houseplants-shop',
    imageSrc: '/portfolio-img/houseplants-shop.png',
    showFullTechStack: true,
  },
  {
    name: 'Travel Recommender',
    overview:
      'A client-side travel recommendation tool that lets users search for destinations, temples, or beaches and displays matching results with images and descriptions in real time.',
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Fetch API',
      'JSON',
      'Font Awesome',
      'Responsive Design',
      'Client-Side Filtering',
      'DOM Manipulation',
    ],
    sourceUrl: 'https://github.com/wkleus/travelRecommendation',
    imageSrc: '/portfolio-img/travel-recommender.png',
    showFullTechStack: false,
  },
  {
    name: 'Java Projects',
    overview:
      'A collection of Java desktop GUI applications — including a password generator, word counter, IP address finder, and floating website-launcher widgets — built with Swing and JavaFX',
    techStack: [
      'Java (JDK 8+)',
      'Swing',
      'JavaFX',
      'FXML',
      'CSS',
      'java.net (InetAddress)',
      'java.util.regex',
      'Event Handling',
      'Desktop GUI Development',
    ],
    sourceUrl: 'https://github.com/wkleus/GUI-code-samples',
    imageSrc: '/portfolio-img/widget-websites-starter-2.png',
    showFullTechStack: false,
  },
]
