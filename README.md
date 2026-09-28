# Sincere Glass — Next.js Frontend

Headless WordPress + Next.js frontend for [sincereglass.com](https://sincereglass.com).

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **CMS:** WordPress (headless) with WPGraphQL
- **Deployment:** Vercel (frontend) + SiteGround (WordPress backend)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your WordPress URL
cp .env.local.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WPGraphQL endpoint (e.g. `https://cms.sincereglass.com/graphql`) |
| `NEXT_PUBLIC_WP_HOSTNAME` | WordPress domain for `next/image` (e.g. `cms.sincereglass.com`) |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL (e.g. `https://sincereglass.com`) |

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Homepage
│   ├── products/     # Product pages
│   ├── about/        # About page
│   ├── blog/         # Blog (from WP posts)
│   └── contact/      # Contact / inquiry form
├── components/       # Shared UI components
├── lib/              # GraphQL client, queries, utilities
└── types/            # TypeScript type definitions
```

## WordPress Requirements

- WPGraphQL
- WPGraphQL for ACF
- Advanced Custom Fields PRO
- Yoast SEO + WPGraphQL for Yoast SEO
