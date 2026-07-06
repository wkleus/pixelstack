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
      'A full-stack site for discovering residential properties across Europe - from city apartments to alpine chalets',

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
      'Web application to support users in working with multilingual text',
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
      'A full-stack portfolio app built with TypeScript, Next.js & Tailwind CSS.',
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
