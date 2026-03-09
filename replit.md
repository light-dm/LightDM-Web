# LIGHT DM - Creative Studio Website

## Overview

LIGHT DM is a modern multi-page website for a creative studio (Light Digital Marketing) offering IT consulting, web design/development, and branding services. The site is built with Next.js 15 App Router for optimal SEO through server-side rendering, featuring a contact form with database persistence. The design follows Bima.framer.media aesthetic with dark theme throughout (#1a1918), animated gradient blobs, UPPERCASE typography, and golden brand colors (#F5C518, #FFD700, #E6A800). All content is in German. No emojis in design.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- **January 2026 (Latest)**: Multi-page expansion with all German content:
  - NEW: Kontakt page with contact form and contact info cards
  - NEW: Support page with RDP download tools (TeamViewer, AnyDesk)
  - NEW: Blog overview page with featured article grid
  - NEW: Blog detail pages with article content
  - NEW: Projekte overview page with all projects
  - NEW: Project detail pages with Challenge/Solution/Results sections (bima case-study style)
  - Updated navbar with all page links (Leistungen, Projekte, Über Uns, Blog, Support, Kontakt)
  - Mobile menu with elegant glass effect
  - All text content translated to German (removed English labels)
  - Removed all square brackets from visible UI
  - Features section updated with LIGHT DM themes (Schnelle Ladezeiten, 24/7 IT-Support)
- **January 2026**: Bima.framer.media inspired redesign with golden color scheme:
  - Updated color palette from logo: Golden yellow (#F5C518, #FFD700, #E6A800)
  - Large animated gradient blobs with golden/orange tones (like bima.framer.media)
  - Hero with animated lightbulb logo on right side, glow effect, line reveals
  - Services as card-based grid with icons and hover effects (no emojis)
  - Projects as horizontal cards with laptop mockups and highlight badges
  - About section with "Warum Top-Marken uns vertrauen" feature cards and stats
  - TechStack section with staggered 3D cards (Next.js, React, Figma, WordPress, Tailwind)
  - Pricing section with 3 categories (IT-Services, Webdesign, App & Branding)
  - FAQ section with accordion
  - Blog section with featured article and smaller blog cards
  - Contact with centered layout and glassmorphism form card
  - Preloader with logo symbol (lightbulb) and golden glow
  - Dark theme throughout - no color transitions to white
- **January 2026**: Complete premium redesign with new sections and animations:
  - Premium preloader with logo glow animation
  - Hero with line-by-line text reveals and large typography
  - Marquee text band with service keywords
  - Custom cursor with subtle hover effects (non-touch devices only)
  - Projects section with hover zoom and overlay effects
  - About section with animated counters
  - Services section with numbered entries and tags
  - Contact section with premium form styling
  - Footer with logo integration
- Server-side rendering enabled for all pages
- Metadata API implemented for all routes (title, description, OpenGraph)

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 16.1.4 with React 19 and TypeScript
- **Routing**: Next.js App Router (file-based routing in app/ directory)
- **Rendering**: Server Components by default, Client Components for interactivity
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Smooth Scrolling**: Lenis library for buttery scroll experience
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Next.js API Routes (app/api/ directory)
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api` prefix

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `lib/schema.ts`
- **Tables**: Users table and contact_submissions table for form data
- **Validation**: Drizzle-zod for schema-to-validation integration

### Project Structure
```
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page (SSR)
│   ├── globals.css          # Global styles with Tailwind v4
│   ├── about/               # About page route
│   ├── leistungen/          # Services page route
│   ├── projekte/            # Projects overview + detail pages
│   ├── kontakt/             # Contact page route
│   ├── support/             # IT-Support with RDP downloads
│   ├── blog/                # Blog overview + detail pages
│   └── api/                 # API routes
│       └── contact/route.ts # Contact form submission
├── components/              # React components
│   ├── pages/               # Page-specific client components
│   ├── sections/            # Section components (Hero, Services, etc.)
│   │   ├── hero.tsx         # Hero with animated logo right side
│   │   ├── services-new.tsx # Numbered services grid (no emojis)
│   │   ├── projects-new.tsx # Horizontal project cards with mockups
│   │   ├── about-new.tsx    # About with feature cards and stats
│   │   ├── tech-stack.tsx   # Tech stack with 3D staggered cards
│   │   ├── pricing.tsx      # Pricing (IT/Web/App categories)
│   │   ├── faq.tsx          # FAQ with accordion
│   │   ├── blog.tsx         # Blog with featured + grid
│   │   ├── contact-new.tsx  # Premium contact form
│   │   └── clients.tsx      # Client logos marquee
│   ├── ui/                  # shadcn/ui components + custom
│   │   ├── marquee.tsx      # Infinite scroll marquee
│   │   └── custom-cursor.tsx # Custom cursor with hover
│   ├── navbar.tsx           # Navigation component
│   ├── footer.tsx           # Footer with logo
│   └── preloader.tsx        # Logo glow animation
├── lib/                     # Utilities
│   ├── db.ts                # Database connection
│   ├── schema.ts            # Drizzle schema definitions
│   ├── storage.ts           # Database access layer
│   └── utils.ts             # Helper functions
├── server/                  # Server entry (spawns Next.js)
│   └── index.ts             # Next.js launcher for workflow
└── next.config.js           # Next.js configuration
```

### Design System
- **Typography**: IBM Plex Sans (headings), Inter (body) - UPPERCASE style
- **Colors**: CSS custom properties with HSL values
  - Primary accent: #F5C518 (golden yellow from logo)
  - Gradient: from-[#F5C518] via-[#FFD700] to-[#FFA500]
  - Text: #242321 (dark)
  - Dark sections: #1a1918
  - Light sections: #F4F4F4
- **Theme**: Scroll-based dark/light section transitions
- **Visual Effects**: Animated gradient blobs, glassmorphism, 3D tilt cards
- **Responsive**: Mobile-first with container-based layouts

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via DATABASE_URL environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations
- **@neondatabase/serverless**: Serverless Postgres driver support

### Frontend Libraries
- **@tanstack/react-query**: Server state management and API calls
- **framer-motion**: Animation library for transitions
- **lenis**: Smooth scroll library
- **react-hook-form**: Form state management
- **zod**: Runtime validation

### UI Framework
- **Radix UI**: Headless component primitives (dialog, dropdown, select, etc.)
- **Tailwind CSS v4**: Utility-first styling with @theme directive
- **Lucide React**: Icon library
- **tw-animate-css**: Animation utilities

### Build & Development
- **Next.js**: Full-stack framework with Turbopack
- **tsx**: TypeScript execution for development

### Deployment
- **Replit**: Autoscale deployment
- Development: `npx next dev -p 5000` (via server/index.ts)
- Production Build: `npx next build`
- Production Run: `npx next start -p 5000`
