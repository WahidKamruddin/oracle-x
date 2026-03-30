# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oracle X is a cryptocurrency tracker built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**. It uses **Prisma** with **SQLite** (Better SQLite3 adapter) for persistence and fetches market data from the **CoinGecko API**.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

No test framework is configured.

## Architecture

### Routing (App Router)

- **Public:** `/login`, `/register`, landing page at `/`
- **Protected (auth required):** `/dashboard`, `/profile`
- **Route groups:** `(nav-routes)/` wraps pages that include the sidebar/navbar layout
- **Middleware:** `proxy.ts` at the root handles route protection via JWT session validation

### Authentication

JWT-based sessions using `jose`. Key flow:
- `lib/session.ts` — session creation, encryption/decryption, cookie management (HTTP-only, 7-day expiry)
- `lib/auth.ts` — server-side current user retrieval
- `app/login/actions.ts` and `app/register/actions.ts` — server actions for auth forms
- `components/providers/authProvider.tsx` — React Context for client-side auth state

### Database

- **ORM:** Prisma 7 with generated client in `lib/generated/prisma/`
- **Schema:** `prisma/schema.prisma` — two models: `User` and `Token`
- **Client singleton:** `lib/prisma.ts`
- **Migrations:** `prisma/migrations/`

### UI Components

- **shadcn/ui** (New York style) with Radix UI primitives — components live in `components/ui/`
- **Pre-built blocks** in `components/shadcn-studio/blocks/` (hero, CTA, FAQ, footer, etc.)
- **Data visualization:** Recharts for charts, TanStack React Table for data tables with drag-and-drop (dnd-kit)
- **Notifications:** Sonner toasts
- **Theming:** next-themes for dark/light mode

### Path Aliases

| Alias | Path |
|-------|------|
| `@/*` | `./` |
| `@/components` | `./components` |
| `@/lib` | `./lib` |
| `@/hooks` | `./hooks` |
| `@/ui` | `./components/ui` |

### External APIs

CoinGecko API for cryptocurrency data. Base URL and API key configured via environment variables (`COINGECKO_BASE_URL`, `COINGECKO_API_KEY`, `NEXT_PUBLIC_COINGECKO_API_KEY`).

### Environment Variables

Required variables: `SESSION_SECRET`, `DATABASE_URL`, `COINGECKO_BASE_URL`, `COINGECKO_API_KEY`, `NEXT_PUBLIC_COINGECKO_API_KEY`. No `.env.example` exists — reference `.env` for the shape.
