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

    // Short description of the project
    overview:
      'A full-stack real estate platform featuring property browsing, filtering, favorites, email contact, admin dashboard, and multilingual support (EN/DE) – built with React, Node.js, Express, PostgreSQL, Supabase Auth and Resend',

    // How the project works
    howItWorks: `HomeSphere is a full-stack real estate platform. Here's how it works:

        1. Browse Listings – Users can explore residential properties across Europe.
        2. Filter & Search – Properties can be filtered by category and deal type.
        3. Save Favorites – Users can save properties to their favorites list.
        4. Contact Agents – Users can send inquiries via email through the contact form (powered by Resend).
        5. Admin Dashboard – Administrators can manage the entire property catalog through a protected dashboard.`,

    // In-depth case study: problem, challenges, solution & tech
    caseStudy: `Project Period
        May – July 2026 (including planning phase in May; active development from June)
        Goal
        The goal was to develop a modern, scalable, and user-friendly real estate platform for both property seekers and administrators. The application provides intuitive property browsing with advanced filtering, detailed views, interactive maps, mortgage calculations, and a secure admin dashboard for complete property management.
        Technical Challenges
        1. Implementing secure authentication and protected admin routes
        2. Building efficient category and deal-type filtering
        3. Integrating third-party services (maps, email delivery, financial calculator)
        4. Managing separate frontend and backend deployments (Vercel + Render)
        5. Ensuring secure server-side validation while using Supabase only for authentication
        Solution & Technologies Used
        I built a clean three-tier architecture:
        - Frontend: React 19 + Vite 8, React Router 7, Framer Motion, Leaflet, react-i18next (EN/DE), Yup for validation
        - Backend: Node.js / Express REST API with raw pg (node-postgres) driver for database queries
        - Database: PostgreSQL hosted on Supabase
        - Auth: Supabase Auth (JWT) + custom middleware using Supabase Admin Client for server-side token validation
        - Additional Tools: Resend, express-rate-limit, he (XSS sanitization)
        
        A notable technical aspect was the hybrid Supabase setup: Supabase is used exclusively for authentication and JWT issuance, while all CRUD operations are performed directly via the pg driver. This provided fine-grained control over database queries while maintaining secure token validation on the backend.
        The platform is fully responsive and includes robust data fetching with a custom useFetch hook and AbortController to prevent race conditions and memory leaks.`,

    // Technologies used in the project
    techStack: [
      'React 19',
      'React Router',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Supabase',
      'JWT',
      'Resend',
      'Vitest',
      'Supertest',
    ],

    // Complete tech stack with all details (displayed in modal)
    fullTechStack: [
      'React 19',
      'React Router DOM 7',
      'Vite 8',
      'Node.js',
      'Express 4',
      'PostgreSQL (Supabase)',
      'Supabase Auth (JWT)',
      'Resend',
      'Yup 1',
      'Phosphor Icons 1',
      'Lucide Icons 1',
      'react-i18next 15',
      'Leaflet + react-leaflet 1 / 4',
      'Framer Motion 12',
      'Vitest 4 + React Testing Library 16',
      'Supertest 7',
      'CORS 2',
      'dotenv 17',
      'express-rate-limit 7',
      'he (XSS sanitization) 1',
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

    overview:
      'A client‑side web application for multilingual text processing, featuring translation, synonym lookup, and automation settings. Built with React, TailwindCSS, and Vite, it consumes external language APIs and stores user preferences locally via localStorage',

    howItWorks: `Linguify is a client-side web application for multilingual text processing. Here's how it works:

      1. Translation – Enter text and select a target language to translate.
      2. Synonym Lookup – Find alternative words for text revision.
      3. Automation Features – Configure auto-clear and auto-copy in the settings.
      4. Language Switching – Switch between supported languages with a single click.`,

    techStack: [
      'React',
      'Vite',
      'TailwindCSS',
      'React Router',
      'Context API',
      'Custom Hooks',
      'Jest',
      'React Testing Library',
      'REST APIs',
      'localStorage',
    ],

    fullTechStack: [
      'React 19+',
      'Vite 7+',
      'TailwindCSS 4+',
      'React Router',
      'Context API',
      'Custom Hooks',
      'Jest 30+',
      'React Testing Library',
      'REST APIs (MyMemory Translation API, Datamuse API)',
      'localStorage',
      'GitHub Pages',
      'Vercel',
    ],

    sourceUrl: 'https://github.com/wkleus/linguify',

    preview: 'https://linguify-web.vercel.app/',

    imageSrc: '/portfolio-img/linguify.png',

    showFullTechStack: true,
  },
  {
    name: 'PixelStack Portfolio',
    overview:
      'An animated and responsive portfolio with Next.js, TypeScript, Tailwind CSS, Framer Motion, PostgreSQL, Resend, and DeepSeek AI – featuring a blog, contact form, newsletter, search, dark mode, and an AI assistant that prefills the contact form',
    techStack: [
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Prisma',
      'PostgreSQL',
      'Resend',
      'DeepSeek AI',
      'Framer Motion',
      'Playwright',
      'Jest',
    ],
    fullTechStack: [
      'Next.js 16 (App Router)',
      'TypeScript 5 (strict mode)',
      'React 19',
      'Tailwind CSS 4',
      'Prisma 7 (driver adapter via pg)',
      'PostgreSQL (hosted on Neon)',
      'Resend SDK',
      'DeepSeek API (OpenAI-compatible)',
      'Framer Motion',
      'Heroicons',
      'React Icons',
      'Jest',
      'Playwright',
      'Vercel (deployment)',
      'IONOS (custom domain)',
      'react-markdown + remark-gfm',
    ],
    sourceUrl: 'https://github.com/wkleus',
    preview: 'https://pixelstack-me.vercel.app/',
    imageSrc: '/portfolio-img/portfolio-fullstack.png',
    showFullTechStack: true,
  },
  {
    name: 'Little Lemon Restaurant',
    overview:
      'A responsive and accessible single-page web app for a fictional restaurant, built with React – featuring client-side routing, form validation, and ARIA-compliant semantic HTML',
    techStack: [
      'React',
      'React Router',
      'CSS Modules',
      'JavaScript (ES6+)',
      'Responsive Design',
      'Form Validation',
      'Accessibility (ARIA)',
      'Component-Based Architecture',
    ],
    sourceUrl: 'https://github.com/wkleus/little-lemon',
    preview: 'https://wkleus.github.io/little-lemon/',
    imageSrc: '/portfolio-img/restaurant-frontend.png',
    showFullTechStack: false,
  },
  {
    name: 'Houseplants Shop',
    overview:
      'An online houseplants shop frontend – a responsive React + Redux application with dynamic cart functionality and multi-page routing',
    techStack: [
      'React',
      'Redux Toolkit',
      'State Management',
      'JavaScript (ES6+)',
      'CSS3',
      'Responsive Design',
      'React Router',
      'Component-Based Architecture',
      'Client-Side Routing',
      'E-Commerce UI',
    ],
    sourceUrl: 'https://github.com/wkleus/houseplants-shop',
    preview: 'https://wkleus.github.io/houseplants-shop/',
    imageSrc: '/portfolio-img/houseplants-shop.png',
    showFullTechStack: false,
  },

  {
    name: 'Portfolio Frontend',
    overview:
      'A responsive portfolio frontend built with React, featuring reusable UI components, form validation, and accessibility',
    techStack: [
      'React',
      'JavaScript (ES6+)',
      'Responsive Design',
      'Form Validation',
      'Accessibility (a11y)',
      'Component-Based Architecture',
      'Client-Side Routing',
    ],
    sourceUrl: 'https://github.com/wkleus/meta-advanced-react-portfolio',
    preview: 'https://wkleus.github.io/meta-advanced-react-portfolio/',
    imageSrc: '/portfolio-img/portfolio-frontend.png',
    showFullTechStack: false,
  },
  {
    name: 'Travel Recommender',
    overview:
      'A client-side travel recommendation tool built with JavaScript, featuring dynamic search filtering, responsive design, and real-time result display using JSON data',
    techStack: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Responsive Design',
      'JSON',
      'Fetch API',
      'Font Awesome',
      'Client-Side Filtering',
    ],
    sourceUrl: 'https://github.com/wkleus/travelRecommendation',
    preview: 'https://wkleus.github.io/travelRecommendation/',
    imageSrc: '/portfolio-img/travel-recommender.png',
    showFullTechStack: false,
  },
  {
    name: 'Web Art Blog',
    overview:
      'A responsive art blog frontend built with HTML5, CSS Grid/Flexbox, and  JavaScript – featuring client-side search, animated UI interactions, and a live clock widget',
    techStack: [
      'HTML5',
      'JavaScript',
      'Responsive Design',
      'CSS Grid & Flexbox',
      'CSS Animations',
      'Media Queries',
    ],
    sourceUrl: 'https://github.com/wkleus/art-blog',
    preview: 'https://wkleus.github.io/art-blog/',
    imageSrc: '/portfolio-img/web-art-blog.png',
    showFullTechStack: false,
  },

  // {
  //   name: 'Luxury Jewels Store',
  //   overview: 'A luxury jewelry store frontend with responsive design.',
  //   techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  //   sourceUrl: 'https://github.com/wkleus/meta-mangata-gallo-frontend',
  //   preview: 'https://wkleus.github.io/meta-mangata-gallo-frontend/',
  //   imageSrc: '/portfolio-img/mangata-gallo.png',
  //  showFullTechStack: false,
  // },

  // {
  //   name: 'Household Exchange Backend',
  //   overview:
  //     'Back-end web application, that links people giving away unwanted household items with those seeking free, recycled items.',
  //   techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js'],
  //   sourceUrl: 'https://github.com/wkleus/backend-nodejs-capstone',
  //   preview: 'https://github.com/wkleus/backend-nodejs-capstone',
  //   imageSrc: '/portfolio-img/household-items-exchange.png',
  //  showFullTechStack: false,
  // },

  // {
  //   name: 'Desktop Widget',
  //   overview:
  //     'A collection of desktop widgets written in Java, using JavaFX and CSS.',
  //   techStack: ['Java', 'JavaFX', 'CSS'],
  //   sourceUrl:
  //     'https://github.com/wkleus/GUI-code-samples/tree/main/WidgetsCollection/src',
  //   preview:
  //     'https://github.com/wkleus/GUI-code-samples/tree/main/WidgetsCollection/src',
  //   imageSrc: '/portfolio-img/desktop-widget.jpg',
  //  showFullTechStack: false,
  // },

  // {
  //   name: 'IP Address Finder',
  //   overview: 'A IP address finder written in Java, using JavaFX and CSS.',
  //   techStack: ['Java', 'JavaFX', 'FXML', 'CSS'],
  //   sourceUrl:
  //     'https://github.com/wkleus/GUI-code-samples/tree/main/IpAddressFinderFXGui/src',
  //   preview:
  //     'https://github.com/wkleus/GUI-code-samples/tree/main/IpAddressFinderFXGui/src',
  //   imageSrc: '/portfolio-img/ip-address-finder.jpg',
  // },
  //  showFullTechStack: false,
]
