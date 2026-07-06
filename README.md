# PixelStack Web Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-0070F3?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-2EAD33?style=for-the-badge&logo=vercel&logoColor=000000)](https://vercel.com/)
[![Resend](https://img.shields.io/badge/Resend-E93D28?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)
[![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react-icons.github.io/react-icons/)
[![DeepSeek](https://img.shields.io/badge/DeepSeek-4D6BFE?style=for-the-badge&logo=deepseek&logoColor=white)](https://deepseek.com/)
[![Search](https://img.shields.io/badge/Search-Enabled-22c55e?style=for-the-badge&logo=search&logoColor=white)]()
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-2EADEE?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Status: Deployed](https://img.shields.io/badge/Status-Deployed-22c55e?style=for-the-badge)](/)
[![Status: Live](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)](https://pixelstack.me)

An animated and responsive portfolio for web apps — built with **Next.js**, **TypeScript**, **React.js**, **Tailwind CSS**, **Framer Motion**, **PostgreSQL** (hosted on **Neon**, via **Prisma 7**), **Resend** and **DeepSeek**.

Comes with: portfolio showcase, a **database-backed blog system**, contact form with real email delivery and auto-reply, newsletter subscription with admin notification, search for portfolio and posts, interactive grid hero section with mouse tracking, profile page, dark/light mode and an AI-powered assistant (PixelStack AI) that answers questions about skills, projects, and IT education — and intelligently prefills the contact form based on your intent. All emails delivered via Resend.

## Live Demo

The project is deployed on Vercel and IONOS.

## Preview / Screenshots

<p align="center">
<img src="public/preview/intro.png" width="700" alt="Homepage preview" />
<br />
<em>Homepage with animated hero section</em>
</p>

<p align="center">
<img src="public/preview/portfolio-page.png" width="700" alt="Portfolio page preview" />
<br />
<em>Portfolio page showcasing projects and tech stack</em>
</p>

<p align="center">
<img src="public/preview/blog-page.png" width="700" alt="Blog page preview" />
<br />
<em>The blog features posts about tech topics</em>
</p>

<p align="center">
<img src="public/preview/contact-page.png" width="700" alt="Contact page preview" />
<br />
<em>Contact form with API integration and Unread-Badge</em>
</p>

<p align="center">
<img src="public/preview/skills-page.png" width="700" alt="Skills page preview" />
<br />
<em>Profile & skills section with animated progress bars</em>
</p>

<p align="center">
<img src="public/preview/intro-darkmode.png" width="700" alt="Dark mode preview" />
<br />
<em>Dark mode theme using custom ThemeContext</em>
</p>

<p align="center">
<img src="public/preview/AI-assistant.png" width="700" alt="AI assistant preview" />
<br />
<em>AI-powered assistant (right side of the screenshot)</em>
</p>

<p align="center">
<img src="public/preview/login-page.png" width="700" alt="Admin Login page preview" />
<br />
<em>Admin Login page</em>
</p>

<p align="center">
<img src="public/preview/admin-dashboard-page.png" width="700" alt="Admin Dashboard page preview" />
<br />
<em>Admin Dashboard page with buttons for create, edit, delete posts</em>
</p>

<p align="center">
<img src="public/preview/create-post-page.png" width="700" alt="Create New Post page preview" />
<br />
<em>Form for creating a new post by Admin</em>
</p>

<p align="center">
<img src="public/preview/not-found.png" width="700" alt="Not Found page preview" />
<br />
<em>404 Not Found Page (dark mode) with PixelStack AI Widget</em>
</p>

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Blog & Database](#blog--database)
- [Admin Area](#admin-area)
- [AI Assistant](#ai-assistant)
- [Contact Form & Email](#contact-form--email)
- [Newsletter](#newsletter)
- [Interactive Grid](#interactive-grid)
- [Dark Mode](#dark-mode)
- [Testing](#testing)
- [Upcoming Work](#upcoming-work)
- [License](#license)

---

## Features

### Modern UI & UX

- Fully responsive layout / Mobile-friendly navigation
- Smooth Framer Motion animations
- Light/Dark mode with custom ThemeContext

### Components & Pages

- **Hero section** with animated intro, persistent grid background and mouse-following spotlight effect
- **Portfolio** with project previews, tech stack, and live links
- **Blog system** backed by **PostgreSQL** via **Prisma 7**, with dynamic routes (`/posts/[handle]`)
- **Search bar** filters portfolio items and blog posts by title, keyword in the description or technology
- **Contact form** with real email delivery via Resend (`/api/connect`)
  -> includes client & server-side validation, XSS sanitization, rate limiting and auto-reply to sender
- **Newsletter** subscription with admin email notification via Resend (`/api/newsletter`)
- **Admin Login** and **Admin Dashboard** to create, edit, delete blog posts
- **PixelStack AI assistant** — floating chat widget powered by DeepSeek, answers questions about skills, projects, tech stack and certifications (`/api/agent`)
- **Contact form prefill** via AI assistant — the AI automatically detects the user's intent and pre-selects the appropriate topic when opening the contact form
- **Mobile navigation** with hamburger menu
- **Footer** with social links and branding
- **Imprint** with privacy policy and legal informations
- **Custom 404 Not Found Page**

### Tech Stack

| Layer            | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 16 (App Router)                          |
| Language         | TypeScript 5 (strict mode)                       |
| UI               | React 19, Tailwind CSS 4, Framer Motion          |
| Icons            | Heroicons, React Icons                           |
| Database         | PostgreSQL (hosted on [Neon](https://neon.tech)) |
| ORM              | Prisma 7 (driver adapter via `pg`)               |
| Auth             | Auth.js v5 (Credentials, single admin account)   |
| Password Hashing | bcryptjs                                         |
| Email            | Resend SDK                                       |
| AI Model         | DeepSeek API (OpenAI-compatible)                 |
| AI Capabilities  | Tool Calling, Intent Detection                   |
| Markdown         | react-markdown + remark-gfm + rehype-raw         |
| Testing          | Jest, Playwright                                 |
| Deployment       | Vercel + IONOS (custom domain)                   |

---

## Project Structure

```
📁 pixelstack
│
├── 📂 prisma
│   ├── 📂 migrations               # Prisma migration history
│   └── 📄 schema.prisma            # Post model definition
│
├── 📂 scripts
│   ├── 📄 import-posts.ts          # Seeds the DB from src/data/posts.ts
│   └── 📄 test-db.ts               # Verifies the DB connection
│
├── 📂 src
│   ├── 📂 app
│   │   ├── 📂 admin                # Password-protected post management (see Admin Area)
│   │   │   ├── 📂 adminDashboard   # /admin/adminDashboard — list, sign-out
│   │   │   ├── 📂 login            # /admin/login
│   │   │   ├── 📂 posts
│   │   │   │   ├── 📂 new          # /admin/posts/new
│   │   │   │   ├── 📂 [id]/edit    # /admin/posts/[id]/edit
│   │   │   │   └── 📄 PostForm.tsx # Shared create/edit form (Markdown textarea)
│   │   │   └── 📄 actions.ts       # Server Actions: createPost, updatePost, deletePost
│   │   ├── 📂 api
│   │   │   ├── 📂 auth              # Auth.js route handler
│   │   │   ├── 📂 newsletter       # Newsletter subscription endpoint
│   │   │   ├── 📂 agent           # AI assistant endpoint (DeepSeek)
│   │   │   └── 📂 connect          # Contact form API endpoint with email
│   │   ├── 📂 components           # Reusable UI components
│   │   │   ├── 📂 Agent            # AI assistant chat widget
│   │   │   ├── 📂 Connect          # Contact form (hook + component)
│   │   │   ├── 📂 Footer           # Footer with social links (incl. discreet Admin link)
│   │   │   ├── 📂 Header           # Header + theme toggle
│   │   │   ├── 📂 Home             # Homepage sections (Posts.tsx fetches from DB)
│   │   │   ├── 📂 MessageUI        # Error/success messages
│   │   │   └── 📂 Profile          # About me components
│   │   ├── 📂 portfolio            # Portfolio overview
│   │   ├── 📂 posts                # Blog system — pages fetch from PostgreSQL, render Markdown
│   │   ├── 📂 profile               # Profile page
│   │   ├── 📂 context              # ThemeContext provider
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 globals.css
│   │   └── 📄 page.tsx             # Homepage
│   │
│   ├── 📂 data                     # Static content
│   │   ├── 📂 content              # Blog post seed content (used by import-posts.ts)
│   │   ├── 📄 agentContext.ts      # AI assistant system prompt
│   │   ├── 📄 posts.ts             # Blog seed data (imported into PostgreSQL, not read live)
│   │   └── 📄 portfolio.ts         # Portfolio data
│   │
│   ├── 📂 hooks                    # Custom React hooks
│   │   ├── 📄 useAgent.ts          # AI assistant state & fetch logic
│   │   └── 📄 useSearch.ts         # Generic search/filter hook
│   │
│   ├── 📂 lib
│   │   ├── 📄 prisma.ts            # Prisma Client (pg driver adapter)
│   │   └── 📄 posts.ts             # DB access layer for blog posts (incl. admin queries)
│   │
│   ├── 📄 auth.ts                  # Auth.js: Credentials provider, session config
│   ├── 📄 auth.config.ts           # Edge-safe Auth.js config, shared with middleware.ts
│   ├── 📄 middleware.ts            # Route protection for /admin (see Admin Area)
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
├── 📄 prisma.config.ts
├── 📄 jest.config.ts
├── 📄 playwright.config.ts
├── 📄 package.json
└── 📄 README.md
```

---

## Blog & Database

Blog posts are stored in a **PostgreSQL** database (`Post` table) - hosted on **[Neon](https://neon.tech)**, connected via **Vercel's Neon integration** - and served through **Prisma 7**, using the `@prisma/adapter-pg` driver adapter (required since Prisma 7 dropped the bundled Rust query engine). Local development and Vercel production both point at the same Neon database via `DATABASE_URL`.

### Schema

The `Post` model (`prisma/schema.prisma`) includes: `handle` (unique slug), `name`, `overview`, `content` (HTML), `timeToRead`, `createdAt`, `updatedAt`, `published`, and `tags`.

### How pages read the data

`src/lib/posts.ts` centralizes all reads and only ever returns **published** posts:

- `getAllPosts()` — all published posts, newest first (used by `/posts`)
- `getRecentPosts(limit)` — the most recent posts, up to the given limit (used on the homepage)
- `getPostByHandle(handle)` — single post (used by `/posts/[handle]`)
- `getAllPostHandles()` — used by `generateStaticParams`

Pages that display posts (`src/app/posts/page.tsx`, `src/app/posts/[handle]/page.tsx`, `src/app/components/Home/Posts.tsx`) are **Server Components** that fetch via this layer and pass the data down as props to client components handling animation and search.

### Managing content today

Posts are managed through the **[Admin Area](#admin-area)** at `/admin` — no more hand-editing HTML in a database cell. For one-off tweaks or bulk edits, the **[Neon SQL Editor](https://neon.tech/docs/get-started-with-neon/query-with-neon-sql-editor)** or pgAdmin4 (connected to the remote Neon connection string) still work directly against the `Post` table.

`src/data/posts.ts` + `src/data/content/*.ts` remain in the repo purely as the **original seed source** for `scripts/import-posts.ts`; they are no longer read by the live app.

---

## Admin Area

A password-protected area at `/admin/adminDashboard` for creating, editing, deleting and (un)publishing posts — no more editing raw HTML/Markdown in a database cell.

### Authentication

- **[Auth.js v5](https://authjs.dev)** with a **Credentials** provider - single admin account
- The admin identity lives entirely in environment variables: `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH_B64` (a **Base64-encoded** bcrypt hash - the plaintext password is never stored anywhere).
- Sessions are JWT-based (`session: { strategy: 'jwt' }`), signed with `AUTH_SECRET`.

> **Why Base64 and not the raw bcrypt hash?** A raw hash looks like `$2b$12$abc...` — the `$`-prefixed segments get silently corrupted by `.env` variable expansion and by some shells' quoting rules. Base64 contains no `$` at all, so it survives copy-pasting into `.env` and into Vercel's environment variables intact. `src/auth.ts` decodes it back to the real hash at runtime before comparing.

### Route protection

`/admin/*` is protected in **two independent layers**:

1. **`src/middleware.ts`** — redirects unauthenticated requests before the page even starts rendering, based on the `authorized` callback in `src/auth.config.ts`.
2. **Every protected page itself** (`adminDashboard/page.tsx`, `posts/new/page.tsx`, `posts/[id]/edit/page.tsx`) re-checks the session server-side via `auth()`. Server Actions in `src/app/admin/actions.ts` do the same before touching the database.

### Content format: Markdown

Post `content` is authored as **Markdown** in a plain `<textarea>` — no rich-text editor needed. Rendering uses:

- `react-markdown` + `remark-gfm` for the Markdown itself
- `rehype-raw` so any raw HTML tags still pass through — this keeps the original posts (written in full HTML before the Markdown switch) rendering correctly without needing to be rewritten

### What the admin area can do

- **`/admin/adminDashboard`** — list all posts (published **and** drafts) with status, handle and creation date, plus a sign-out button
- **`/admin/posts/new`** — create a new post (title, handle/slug — auto-generated from the title if left blank —, overview, Markdown content, time-to-read, tags, published toggle)
- **`/admin/posts/[id]/edit`** — edit an existing post, pre-filled with its current values
- **Delete** — with a browser confirmation prompt before submitting
- **`published` toggle** — hide/show a post on the live site without deleting it

Every create/update/delete Server Action calls `revalidatePath()` for the affected routes (`/admin/adminDashboard`, `/posts`, `/`, `/posts/[handle]`).

---

## AI Assistant

**PixelStack AI** is an AI-powered assistant built into the portfolio as a floating chat widget, visible on every page.

It answers questions about the developer's skills, projects, tech stack, blog posts and certifications — powered by **[DeepSeek](https://deepseek.com)** via an OpenAI-compatible API.

### How it works

The AI assistant uses a structured system prompt (`agentContext.ts`) containing all portfolio data. This context is sent with every request so DeepSeek has full knowledge of the developer's background.

The full conversation history is included in each API call — giving the assistant memory of the current session.

### Contact Form Prefill via Tool Calling

The AI assistant has a powerful feature: intelligent contact form prefill. When a user expresses interest in contacting the developer, the AI automatically detects the intent, calls the prefill_contact_form tool, and opens the contact form with the correct topic pre-selected.

This creates a seamless user experience — instead of manually selecting a topic, the user simply tells the AI what they want, and the form is ready for them.

#### How It Works (Technical)

1. Tool Definition: The AI assistant has access to the prefill_contact_form tool, which accepts a topic parameter (job, project, collaboration, quote, feedback, other).

2. Intent Detection: DeepSeek analyzes the user's message and decides whether to call the tool. If the user expresses intent to contact the developer, the tool is triggered.

3. Navigation: The chat widget receives the toolAction from the API and navigates to /connect?topic=[topic].

4. Form Prefill: The contact form reads the topic from the URL parameter and pre-selects the matching dropdown option, with a visual "Pre-filled" indicator.

#### Examples

| User Says                                          | AI Detects           | Topic Prefilled |
| -------------------------------------------------- | -------------------- | --------------- |
| "Would you like to collaborate on something?"      | Collaboration intent | `collaboration` |
| "How much would a website cost?"                   | Quote request        | `quote`         |
| "I have some feedback about your work"             | Feedback intent      | `feedback`      |
| "I'm hiring developers"                            | Job offer intent     | `job`           |
| "I want you for my project"                        | Project inquiry      | `project`       |
| "Let's work together on open source"               | Collaboration intent | `collaboration` |
| "I want to give you my thoughts on your portfolio" | Feedback intent      | `feedback`      |

#### Example Chat Flow

User: "I really like your portfolio and I have a job opportunity for you. Can we discuss this?"

AI Assistant: "I've just opened the contact form with "Job Offer" pre-selected for you. You can fill in your details and message there, and the developer will receive it directly..."

→ The user is automatically navigated to the contact form with the topic pre-filled.

### AI Assistant Features in Detail

- **Floating chat button** — visible on all pages with smooth animations
- **Proactive behavior** — widget opens automatically with a page-aware message
- **Smart contact form prefill** — automatically selects the right topic based on user intent
- **Unread message badge** — pulsing ring animation when new messages arrive
- **Conversation history** — persisted via `localStorage`, survives page reloads
- **Clear chat button** — reset conversation history with one click
- **Custom styling** — for bold, italic, code blocks and links
- **Animated typing indicator** — bouncing dots while AI responds
- **Auto-scroll** — scrolls to latest message via `useRef`
- **Custom scrollbar** — styled for better UX in messages area
- **Rate limiting** — 1 request per 5 seconds per IP, auto-cleanup
- **Retry-After header** — included on 429 responses, tells clients when to retry
- **Configurable model** — switch via `DEEPSEEK_MODEL` env var
- **Dynamic context** — date, timestamp, session ID per request
- **Markdown rendering** — supports `react-markdown` + `remark-gfm`
- **Markdown link handling** — opens links safely in new tabs
- **Tool tips** — hover tooltips on chat buttons (send, clear, close) for better UX

### Proactive Messages by Page

| Page           | Message                                                                           |
| -------------- | --------------------------------------------------------------------------------- |
| `/` (homepage) | "Hi! I'm PixelStack — ask me anything about this developer's skills or projects." |
| `/portfolio`   | "Want me to explain any of these projects?"                                       |
| `/posts`       | "New developer blog posts will appear here from time to time..."                  |
| `/connect`     | "Need help filling out the contact form?"                                         |
| `/profile`     | "Want to know more about the developer's background or certifications?"           |

### Environment Variables

```bash
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxx
DEEPSEEK_MODEL=deepseek-v4-flash
```

### Example questions

**AI assistant answers to:**

- "What skills do you have?"
- "What projects have you built?"
- "Explain HomeSphere."
- "What certifications do you have?"
- "What is your tech stack?"

**Trigger the pre-filling of the contact form via tool calling**:

- "I want ooffer you a job" → prefills contact form with "Job Offer"
- "How much do you charge?" → prefills contact form with "Quote Request"

## Contact Form & Email

The contact form at `/connect` sends a `POST` request to `/api/connect`.

The API route handles:

- Input validation and XSS sanitization
- Rate limiting (1 request per IP per minute)
- Sending the contact message to the inbox and
- Sending an automatic confirmation email back to the sender

Both emails are delivered via **[Resend](https://resend.com)**. If the auto-reply fails, the request still returns success — the notification to the inbox was already sent.

### Email Templates

Both the notification email (to the admin) and the confirmation email (to the sender) feature a **clean, professional layout** with:

- PixelStack branding
- Name, email and topic field displayed prominently
- Responsive design optimized for all email clients

---

## Newsletter

The newsletter form on the homepage sends a `POST` request to `/api/newsletter`.

The API route handles:

- Email format validation and XSS sanitization
- Rate limiting (1 request per IP per minute)
- Sending an admin notification to the inbox with the subscriber's email and signup date

Delivered via **[Resend](https://resend.com)**.

---

## Interactive Grid

The hero section (`/`) features a multi-layer grid background built entirely with React state and CSS `backgroundImage`.

- Persistent grid always visible
- Color transitions on hover
- Mouse-following radial spotlight effect tracks cursor position via `getBoundingClientRect`
- Secondary dot grid layer adds visual depth

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

## Upcoming Work

### AI‑Agent (Portfolio Guide)

- Continuous refinement of the AI agent to deliver smarter, faster, more robust automation
- Enhance Tool Calling with additional tools (e.g. project recommendations)
- Improve intent detection for more accurate topic prefill

### More Features Planned

- Language Switcher (EN/DE)

---

## License

This project is private and serves as a personal portfolio.
