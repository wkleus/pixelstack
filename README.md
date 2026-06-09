# PixelStack Web Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/FramerMotion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![ReactIcons](https://img.shields.io/badge/ReactIcons-000000?style=for-the-badge&logo=react&logoColor=white)](https://react-icons.github.io/react-icons/)
[![Status: Deployed](https://img.shields.io/badge/Status-Deployed-22c55e?style=for-the-badge)](/)
[![Status: Live](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)](https://pixelstack.me)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

An animated and responsive portfolio for web apps — built with **Next.js**, **TypeScript**, **React.js**, **Tailwind CSS**, **Framer Motion** and **Resend**.
Features: portfolio showcase, blog system, contact form with real email delivery via Resend, profile page and dark/light mode.

## Live Demo

Check out the live demo of the project here:

→ **https://pixelstack-me.vercel.app/**

## Preview / Screenshots

<p align="center">
<img src="public/preview/homepage.png" width="700" alt="Homepage preview" />
<br />
<em>Homepage with animated hero section</em>
</p>

<p align="center">
<img src="public/preview/portfolio-page.png" width="700" alt="Portfolio page preview" />
<br />
<em>Portfolio page showcasing projects and tech stack</em>
</p>

<p align="center">
<img src="public/preview/contact-page.png" width="700" alt="Contact page preview" />
<br />
<em>Contact form with API integration</em>
</p>

<p align="center">
<img src="public/preview/skills-page.png" width="700" alt="Skills page preview" />
<br />
<em>Profile & skills section with animated progress bars</em>
</p>

<p align="center">
<img src="public/preview/darkmode.png" width="700" alt="Dark mode preview" />
<br />
<em>Dark mode theme using custom ThemeContext</em>
</p>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Contact Form & Email](#contact-form--email)
- [Dark Mode](#dark-mode)
- [Testing](#testing)
- [License](#license)

---

## Features

### Modern UI & UX

- Fully responsive layout
- Smooth Framer Motion animations
- Light/Dark mode with custom ThemeContext
- Clean typography and polished visual design

### Components & Pages

- **Hero section** with animated intro
- **Portfolio** with project previews, tech stack, and live links
- **Blog system** with dynamic routes (`/posts/[handle]`)
- **Contact form** with real email delivery via Resend (`/api/connect`)
- **Mobile navigation** with hamburger menu
- **Footer** with social links and branding

### Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router)                 |
| Language   | TypeScript 5                            |
| UI         | React 19, Tailwind CSS 4, Framer Motion |
| Icons      | Heroicons, React Icons                  |
| Email      | Resend SDK                              |
| Testing    | Jest, Playwright                        |
| Deployment | Vercel + IONOS (custom domain)          |

---

## Project Structure

```
📁 project-root
│
├── 📂 src                              # Main source folder
│   │
│   ├── 📂 app                          # Next.js App Router – pages & server routes
│   │   │
│   │   ├── 📂 connect                  # "Contact Me" page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📂 components               # Reusable UI components
│   │   │   │
│   │   │   ├── 📂 Connect              # Contact form components
│   │   │   │   ├── 📄 ConnectForm.tsx
│   │   │   │   └── 📄 useConnectForm.ts
│   │   │   │
│   │   │   ├── 📂 Footer               # Footer with social links
│   │   │   │   ├── 📄 Footer.tsx
│   │   │   │   ├── 📄 FooterLogo.tsx
│   │   │   │   └── 📄 FooterSocialLinks.tsx
│   │   │   │
│   │   │   ├── 📂 Header               # Header with theme toggle & mobile menu
│   │   │   │   ├── 📄 HeaderNav.tsx
│   │   │   │   ├── 📄 MobileMenu.tsx
│   │   │   │   └── 📄 ThemeSwitchButton.tsx
│   │   │   │
│   │   │   ├── 📂 Home                 # Homepage sections
│   │   │   │   ├── 📂 InfoMail         # Newsletter components
│   │   │   │   │   ├── 📄 InfoMail.tsx
│   │   │   │   │   └── 📄 useMailStatus.ts
│   │   │   │   ├── 📄 Intro.tsx
│   │   │   │   ├── 📄 Portfolio.tsx
│   │   │   │   └── 📄 Posts.tsx
│   │   │   │
│   │   │   ├── 📂 MessageUI            # Error & success messages
│   │   │   │   ├── 📄 ErrorMessage.tsx
│   │   │   │   └── 📄 SuccessMessage.tsx
│   │   │   │
│   │   │   └── 📂 Profile              # About me components
│   │   │       ├── 📄 EducationCard.tsx
│   │   │       ├── 📄 SkillBar.tsx
│   │   │       └── 📄 SkillSection.tsx
│   │   │
│   │   ├── 📂 portfolio                # Portfolio overview page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📂 posts                    # Blog system
│   │   │   ├── 📂 [handle]             # Dynamic blog post route
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 page.tsx             # Blog index page
│   │   │
│   │   ├── 📂 profile                  # Profile / About Me page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📂 api                      # Serverless API routes
│   │   │   └── 📂 connect              # Contact form endpoint with email delivery
│   │   │       └── 📄 route.ts
│   │   │
│   │   ├── 📂 context
│   │   │   └── 📄 ThemeContext.tsx     # Custom theme logic
│   │   │
│   │   ├── 📄 layout.tsx               # Root layout (header, footer, providers)
│   │   ├── 📄 globals.css              # Global Tailwind styles
│   │   └── 📄 page.tsx                 # Homepage
│   │
│   ├── 📂 data                         # Static content
│   │   ├── 📂 content                  # Blog post details
│   │   │   └── 📄 post-details.tsx
│   │   ├── 📄 posts.ts                 # Blog metadata
│   │   └── 📄 portfolio.ts             # Portfolio metadata
│   │
│   └── 📂 types                        # Shared TypeScript types
│       └── 📄 index.ts
│
├── 📂 tests                            # Unit & API tests
│   ├── 📄 useConnectForm.test.ts       # Hook tests
│   └── 📄 api-connect.test.ts          # API route tests
│
├── 📂 e2e                              # Playwright E2E browser tests
│   └── 📄 contact-form.e2e.spec.ts    # Contact form E2E test
│
├── 📂 public                           # Static assets
│   ├── 📂 avatars
│   ├── 📂 logos
│   ├── 📂 portfolio-img
│   └── 📂 icons
│
├── 📄 jest.config.ts
├── 📄 jest.setup.ts
├── 📄 playwright.config.ts
├── 📄 .env.local                       # Local environment variables (not committed)
├── 📄 .gitignore
├── 📄 README.md
├── 📄 package.json
└── 📄 tsconfig.json
```

---

## Contact Form & Email

The contact form at `/connect` sends a `POST` request to `/api/connect`.
The API route handles input validation, XSS sanitization, rate limiting (1 request per IP per minute), and real email delivery via **[Resend](https://resend.com)**.

---

## Dark Mode

Dark mode is handled through a custom `ThemeContext`:

- Saves preference in `localStorage`
- Detects system theme on first visit
- Avoids FOUC with a mounted-state check
- Instant theme switching without page reload

---

## Testing

The project includes three layers of tests — unit, API, and E2E browser tests via Playwright.

### Results

| Suite                    | Tests  | Status             |
| ------------------------ | ------ | ------------------ |
| Unit (hook logic)        | 4      | ✅ passing         |
| API (backend validation) | 3      | ✅ passing         |
| E2E (browser flow)       | 3      | ✅ passing         |
| **Total**                | **10** | **✅ all passing** |

---

## License

This project is private and serves as a personal portfolio.

---
