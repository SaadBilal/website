# Saad Bilal — Portfolio Website

> Enterprise-grade personal portfolio for a Senior Full-Stack Engineer & Solutions Architect

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer)](https://framer.com/motion)

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** — [Download](https://nodejs.org)
- **npm 10+** (comes with Node.js)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── experience/         # Experience timeline
│   ├── projects/           # Projects showcase
│   ├── tech-stack/         # Skills & technologies
│   ├── blog/               # Engineering blog
│   │   └── [slug]/         # Individual blog posts
│   ├── contact/            # Contact form
│   ├── api/
│   │   └── contact/        # Secure contact API
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── layout/             # Navbar, Footer, PageLayout
│   ├── sections/           # Hero, Metrics, FeaturedProjects, etc.
│   ├── pages/              # Full page content components
│   ├── ui/                 # Reusable UI components
│   └── providers/          # Theme provider
└── lib/
    ├── data/               # All content data
    │   ├── profile.ts      # Personal info & metrics
    │   ├── experience.ts   # Work history
    │   ├── projects.ts     # Portfolio projects
    │   ├── skills.ts       # Tech skills
    │   └── blog.ts         # Blog posts
    └── utils.ts            # Utility functions
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your domain (e.g., `https://saadbilal.dev`) | Yes |
| `EMAIL_HOST` | SMTP host (e.g., `smtp.gmail.com`) | Yes |
| `EMAIL_USER` | SMTP username / email | Yes |
| `EMAIL_PASS` | SMTP password / app password | Yes |
| `EMAIL_TO` | Where to receive contact emails | Yes |
| `GITHUB_TOKEN` | GitHub PAT for API calls | Optional |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key | Optional |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret | Optional |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | Optional |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly booking URL | Optional |

### Gmail Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use that as `EMAIL_PASS`

---

## 🎨 Customization

### Update Personal Info

Edit `src/lib/data/profile.ts`:
```typescript
export const profile = {
  name: "Your Name",
  email: "you@domain.com",
  github: "https://github.com/yourusername",
  // ...
};
```

### Add Projects

Edit `src/lib/data/projects.ts` — add entries to the `projects` array.

### Add Experience

Edit `src/lib/data/experience.ts` — add entries to the `experiences` array.

### Add Blog Posts

Edit `src/lib/data/blog.ts` — add entries to the `blogPosts` array.

For full MDX blog support, add `.mdx` files to `src/content/blog/`.

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Project Settings → Environment Variables
```

### Docker

```bash
# Build image
docker build -t saad-portfolio .

# Run container
docker run -p 3000:3000 --env-file .env.local saad-portfolio

# Or with docker-compose
docker-compose up -d
```

### Manual (VPS/Server)

```bash
# Build
npm run build

# Start production server
npm start

# Or with PM2
pm2 start npm --name "portfolio" -- start
```

---

## 🔒 Security Features

- **CSP Headers** — Content Security Policy configured in `next.config.ts`
- **Rate Limiting** — Contact form limited to 3 requests/hour per IP
- **Input Validation** — Zod schema validation on all form inputs
- **Input Sanitization** — HTML entity encoding before email sending
- **HTTPS Enforcement** — HSTS headers configured
- **XSS Protection** — X-Content-Type-Options and X-Frame-Options headers
- **No Secrets Exposed** — All sensitive values in environment variables

---

## 📊 Performance

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Optimizations:
- Next.js Image optimization with AVIF/WebP
- Font optimization with `next/font`
- Code splitting per route
- Static generation where possible
- Edge-optimized via Vercel CDN

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| UI Components | Radix UI primitives |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Email | Nodemailer |
| Theme | next-themes |
| Analytics | Vercel Analytics |
| Deployment | Vercel / Docker |

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

---

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

Built with ❤️ by Saad Bilal
