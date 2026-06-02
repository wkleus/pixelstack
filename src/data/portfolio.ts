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
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'React Router',
      'Responsive Design',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Vite',
    ],

    // GitHub repository link
    sourceUrl: 'https://github.com/wkleus/homesphere',

    // Live preview link
    preview: 'https://homesphere-web.vercel.app/',

    // Image displayed in the portfolio section
    imageSrc: '/portfolio-img/homesphere.png',
  },
  {
    name: 'Linguify',
    overview:
      'Web application to support users in working with multilingual text',
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'React Router',
      'APIs',
      'Responsive Design',
      'Vite',
      'Jest',
    ],
    sourceUrl: 'https://github.com/wkleus/linguify',
    preview: 'https://linguify-web.vercel.app/',
    imageSrc: '/portfolio-img/linguify.png',
  },
  {
    name: 'PixelStack Portfolio',
    overview:
      'A full-stack portfolio app built with TypeScript, Next.js & Tailwind CSS.',
    techStack: [
      'HTML',
      'Tailwind CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'NextJS',
      'Framer Motion',
      'Responsive Design',
    ],
    sourceUrl: 'https://github.com/wkleus',
    preview: 'https://pixelstack-me.vercel.app/',
    imageSrc: '/portfolio-img/portfolio-fullstack.png',
  },
  {
    name: 'Little Lemon Restaurant',
    overview: 'A responsive restaurant frontend built with React.js.',
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'React Router',
      'ARIA accessibility',
      'Form Validation',
      'Responsive Design',
    ],
    sourceUrl: 'https://github.com/wkleus/little-lemon',
    preview: 'https://wkleus.github.io/little-lemon/',
    imageSrc: '/portfolio-img/restaurant-frontend.png',
  },
  {
    name: 'Houseplants Shop',
    overview: 'An online houseplants shop frontend.',
    techStack: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Redux (Toolkit)',
      'React Router',
      'Responsive Design',
    ],
    sourceUrl: 'https://github.com/wkleus/houseplants-shop',
    preview: 'https://wkleus.github.io/houseplants-shop/',
    imageSrc: '/portfolio-img/houseplants-shop.png',
  },
  {
    name: 'Web Art Blog',
    overview: 'A responsive art blog frontend',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    sourceUrl: 'https://github.com/wkleus/art-blog',
    preview: 'https://wkleus.github.io/art-blog/',
    imageSrc: '/portfolio-img/web-art-blog.png',
  },
  {
    name: 'Travel Recommender',
    overview:
      'A travel recommendation app that provides users with personalized travel recommendations based on their search inputs',
    techStack: ['HTML', 'CSS', 'JavaScript', 'JSON Data', 'Fetch API'],
    sourceUrl: 'https://github.com/wkleus/travelRecommendation',
    preview: 'https://wkleus.github.io/travelRecommendation/',
    imageSrc: '/portfolio-img/travel-recommender.png',
  },
  {
    name: 'Portfolio Frontend',
    overview: 'A responsive portfolio frontend built with React',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Design'],
    sourceUrl: 'https://github.com/wkleus/meta-advanced-react-portfolio',
    preview: 'https://wkleus.github.io/meta-advanced-react-portfolio/',
    imageSrc: '/portfolio-img/portfolio-frontend.png',
  },
  {
    name: 'Luxury Jewels Store',
    overview: 'A luxury jewelry store frontend with responsive design.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    sourceUrl: 'https://github.com/wkleus/meta-mangata-gallo-frontend',
    preview: 'https://wkleus.github.io/meta-mangata-gallo-frontend/',
    imageSrc: '/portfolio-img/mangata-gallo.png',
  },
  {
    name: 'Household Exchange Backend',
    overview:
      'Back-end web application, that links people giving away unwanted household items with those seeking free, recycled items.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js'],
    sourceUrl: 'https://github.com/wkleus/backend-nodejs-capstone',
    preview: 'https://github.com/wkleus/backend-nodejs-capstone',
    imageSrc: '/portfolio-img/household-items-exchange.png',
  },
  {
    name: 'Desktop Widget',
    overview:
      'A collection of desktop widgets written in Java, using JavaFX and CSS.',
    techStack: ['Java', 'JavaFX', 'CSS'],
    sourceUrl:
      'https://github.com/wkleus/GUI-code-samples/tree/main/WidgetsCollection/src',
    preview:
      'https://github.com/wkleus/GUI-code-samples/tree/main/WidgetsCollection/src',
    imageSrc: '/portfolio-img/desktop-widget.jpg',
  },
  {
    name: 'IP Address Finder',
    overview: 'A IP address finder written in Java, using JavaFX and CSS.',
    techStack: ['Java', 'JavaFX', 'FXML', 'CSS'],
    sourceUrl:
      'https://github.com/wkleus/GUI-code-samples/tree/main/IpAddressFinderFXGui/src',
    preview:
      'https://github.com/wkleus/GUI-code-samples/tree/main/IpAddressFinderFXGui/src',
    imageSrc: '/portfolio-img/ip-address-finder.jpg',
  },
]
