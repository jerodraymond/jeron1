# Jeron Brands — Public Website

The public marketing site for Jeron Brands, a creative branding/design studio. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Supabase — reading content from the `jb_*` tables added in `tapcard/supabase/migrations/0003_jeron_brands.sql`.

This is a **separate application** from TapCard and the (not-yet-built) Jeron Brands Admin. All three share one Supabase project.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — hero, services preview, featured work, TapCard/digital-business-card section, testimonials, CTA |
| `/about` | Studio intro (pulled from `jb_website_content` key `about`), approach, CTA |
| `/services` | All published services from `jb_services` |
| `/work` | All published projects from `jb_projects`, with category filter |
| `/work/[slug]` | Project detail — description, services provided, date, main image, additional images from `jb_project_images` |
| `/contact` | Contact info from `jb_website_content` key `contact` + a validated form that inserts into `jb_messages` |
| `/business-card` | TapCard marketing page — explains NFC/QR/link sharing, links to the TapCard app; not a duplicate of the TapCard dashboard |

Every page has page-specific metadata (title, description, Open Graph, canonical URL); `/work/[slug]` additionally sets Twitter card metadata and pulls its OG image from the project's main image.

## Environment variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=        # same Supabase project as TapCard
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # same anon key as TapCard
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_TAPCARD_URL=http://localhost:3000   # where "Create Your Business Card" links to
```

No service-role key is needed here — every table this app touches is either public-read or public-insert-only under RLS (see `0003_jeron_brands.sql`).

## Supabase changes required

None beyond what's already in `tapcard/supabase/migrations/0003_jeron_brands.sql` (already delivered in the previous phase). If you haven't run it yet: paste it into the Supabase SQL Editor after `0001_init.sql` and `0002_themes.sql`. It seeds one row per `jb_website_content` key (`hero`, `about`, `contact`, `social_links`, `cta`) with placeholder copy — edit those rows' `content` JSON directly in the Supabase Table Editor for now, since the admin CMS for this doesn't exist yet.

## Empty/error states

- No published services → the Home preview section hides itself entirely; the full Services page shows "No services available yet." instead of empty space.
- No featured/published projects → same pattern: Home hides the section, `/work` shows "No projects available yet."
- No testimonials → Home hides the testimonials section rather than rendering an empty row.
- Contact info fields (phone/WhatsApp/email/address) each render independently — only what's actually set in `jb_website_content.contact` shows up, nothing invented.
- Unknown project slug → Next.js `notFound()` (default 404 page; no custom design applied yet).

## Design system

Deliberately distinct from TapCard's dark violet/cyan SaaS look: warm paper background, ink text, coral primary accent, forest green secondary, Fraunces (display serif) + Inter (body). Signature element is a rotating "available for projects" badge (SVG `textPath` + CSS animation) rather than a gradient-blob hero, which reads as agency/editorial rather than SaaS.

## Local setup

```bash
npm install
npm run dev
```

Runs on port 3000 by default — if running alongside TapCard locally, start this with `npm run dev -- -p 3001` (matches the `.env.example` site URL) and keep TapCard on 3000, or vice versa.

## Build check

**Not run.** This project was authored in a sandbox without package-registry network access, so `npm install`, `npm run build`, and any live click-through testing have not been performed. Please run `npm install && npm run build` before your first deploy — every API used here (`next/image`, `next/font/google`, Supabase JS, React Hook Form + Zod) follows current, standard usage, but a version mismatch or typo can only be caught by an actual build.

## Deploying to Vercel

1. Push this folder to its own GitHub repo (or a subfolder of a monorepo — if monorepo, set Vercel's "Root Directory" to `jeron-brands/`).
2. Import into Vercel, add the 4 environment variables above (set `NEXT_PUBLIC_SITE_URL` to your real domain, and `NEXT_PUBLIC_TAPCARD_URL` to your deployed TapCard URL).
3. Deploy. Point your `jeronbrands.com` (or chosen domain) at this Vercel project.
