# PixelStack Web Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-0070F3?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-2EAD33?style=for-the-badge&logo=vercel&logoColor=000000)](https://vercel.com/)
[![Resend](https://img.shields.io/badge/Resend-E93D28?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react-icons.github.io/react-icons/)
[![Search](https://img.shields.io/badge/Search-Enabled-22c55e?style=for-the-badge&logo=search&logoColor=white)]()
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-2EADEE?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Status: Deployed](https://img.shields.io/badge/Status-Deployed-22c55e?style=for-the-badge)](/)
[![Status: Live](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)](https://pixelstack.me)

An animated and responsive portfolio for web apps - built with **Next.js**, **TypeScript**, **React.js**, **Tailwind CSS**, **Framer Motion** and **Resend**.
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

- Fully responsive layout / Mobile-friendly navigation
- Smooth Framer Motion animations
- Light/Dark mode with custom ThemeContext

### Components & Pages

- **Hero section** with animated intro
- **Portfolio** with project previews, tech stack, and live links
- **Blog system** with dynamic routes (`/posts/[handle]`)
- **Search bar** filters portfolio items and blog posts by title, keyword in the description or technology
- **Contact form** with real email delivery via Resend (`/api/connect`)
  -> includes client & server-side validation, XXS sanitization, rate limiting and auto-reply to sender
- **Mobile navigation** with hamburger menu
- **Footer** with social links and branding
- **Imprint** with privat policy and legal informations

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
📁 pixelstack
│
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 api/connect          # Contact form API endpoint
│   │   ├── 📂 components           # Reusable UI components
│   │   │   ├── 📂 Connect          # Contact form (hook + component)
│   │   │   ├── 📂 Footer           # Footer with social links
│   │   │   ├── 📂 Header           # Header + theme toggle
│   │   │   ├── 📂 Home             # Homepage sections
│   │   │   ├── 📂 MessageUI        # Error/success messages
│   │   │   └── 📂 Profile          # About me components
│   │   ├── 📂 portfolio            # Portfolio overview
│   │   ├── 📂 posts                # Blog system
│   │   ├── 📂 profile              # Profile page
│   │   ├── 📂 context              # ThemeContext provider
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 globals.css
│   │   └── 📄 page.tsx             # Homepage
│   │
│   ├── 📂 data                     # Static content
│   │   ├── 📂 content              # Blog post details
│   │   ├── 📄 posts.ts             # Blog metadata
│   │   └── 📄 portfolio.ts         # Portfolio data
│   │
│   └── 📂 types                    # TypeScript definitions
│
├── 📂 tests                        # Unit & API tests
│   ├── 📄 useConnectForm.test.ts
│   └── 📄 api-connect.test.ts
│
├── 📂 e2e                          # Playwright E2E tests
│   └── 📄 contact-form.e2e.spec.ts
│
├── 📂 public                       # Static assets
│
├── 📄 jest.config.ts
├── 📄 playwright.config.ts
├── 📄 package.json
└── 📄 README.md
```

---

## Contact Form & Email

The contact form at `/connect` sends a `POST` request to `/api/connect`.

The API route handles:

- Input validation and XSS sanitization
- Rate limiting (1 request per IP per minute)
- Sending the contact message to the inbox and
- Sending an automatic confirmation email back to the sender

Both emails are delivered via **[Resend](https://resend.com)**. If the auto-reply fails, the request still returns success — the notification to the inbox was already sent.

---

## Dark Mode

Dark mode is handled through a custom `ThemeContext`:

- Saves preference in `localStorage`
- Detects system theme on first visit
- Avoids FOUC with a mounted-state check
- Instant theme switching without page reload

---

## Testing

The project includes three layers of tests — unit, API, and E2E browser tests via Playwright:

- Unit Tests: React Hook logic (form state, change handlers, submission)
- API Tests: Route validation, error handling & rate limiting (5 scenarios)
- E2E Tests: Browser flow with Playwright (form fill, submission, validation)

Run tests locally:

```
npm run test        # Unit & API tests (watch mode)
npm run test:run    # Unit & API tests (single run)
npm run test:e2e    # Playwright E2E tests
```

### Results

| Suite                    | Tests  | Status             |
| ------------------------ | ------ | ------------------ |
| Unit (hook logic)        | 4      | ✅ passing         |
| API (backend validation) | 5      | ✅ passing         |
| E2E (browser flow)       | 3      | ✅ passing         |
| **Total**                | **12** | **✅ all passing** |

---

## License

This project is private and serves as a personal portfolio.
