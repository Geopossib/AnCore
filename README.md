# AnCore Marketing — React App

A React + Vite + Tailwind CSS rebuild of the AnCore Marketing site: a 12-screen
aerospace/aviation marketing agency flow (homepage, services, portfolio, about,
insights, contact, FAQ, newsletter, booking, payment, onboarding, and client
portal), plus a typing-animation logo, scroll-reveal, animated counters, a
draw-in chart, and a background hero video with an image fallback.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Brand colors

| Token       | Hex       | Usage                          |
|-------------|-----------|---------------------------------|
| Dark Blue   | `#021739` | Page background                 |
| Gold        | `#C9980B` | Primary accent / CTAs / links   |
| White       | `#FFFFFF` | Headings, body text on dark     |
| Charcoal    | `#1A1A1A` | Footer background               |

Defined in `tailwind.config.js` under `theme.extend.colors` as
`navy`, `gold`, `ink`, `charcoal` (plus supporting `surface`, `surface2`,
`muted`, `line` tones).

## Project structure

```
src/
  assets/images/       Local brand imagery (uploaded aviation/tech photography)
  components/          Header, FeatureBar, Footer, modals, toast container
  components/sections/ One component per page in the 12-step flow
  hooks/                useReveal, useCountUp, useTyping, useHeaderScroll,
                        useToast, useReducedMotion
  App.jsx               View routing + transitions + modal/toast state
  index.css             Design tokens & component classes (Tailwind + custom)
```

## Server (API routes) & required setup

This app now includes real serverless backend endpoints under `/api` —
Support and Booking submissions no longer redirect to GitHub; they're
stored on a real server and read back by the Admin Panel.

**Required for this to work in production:**

1. **Add a Redis integration in Vercel.** Project → Settings → Integrations
   → Marketplace → search "Redis" (Upstash is the standard option, free
   tier available) → connect it to this project. This automatically injects
   the `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL`
   / `KV_REST_API_TOKEN`) environment variables the API routes read from —
   you don't need to copy these manually.

2. **Set two environment variables** in Project → Settings → Environment Variables:

   | Key | Value |
   |---|---|
   | `ADMIN_PASSCODE` | Your own passcode for the Admin Panel login |
   | `ADMIN_SESSION_SECRET` | Any long random string (used to sign admin session tokens) |

   Neither of these should ever be committed to the repo — they only live
   in Vercel's environment variable store.

3. Redeploy after adding these (Vercel usually prompts you to).

**API routes:**

```
api/
  admin-auth.js       POST — checks ADMIN_PASSCODE server-side, returns a
                       signed session token (2-hour expiry) on success
  submit-request.js   POST — public, saves a support or booking ticket to Redis
  tickets.js          GET  — admin-only (Bearer token), lists all tickets
  ticket-update.js    POST — admin-only, mark resolved/reopen or add a note
  _lib/redis.js        Shared Redis client
  _lib/session.js       Session token issue/verify helpers
```

**Local development note:** `npm run dev` (plain Vite) does not run `/api`
routes — only the frontend. To test the full stack locally, use the
[Vercel CLI](https://vercel.com/docs/cli): `vercel dev`.

## Hero background video

The homepage hero plays a muted, looping aircraft-takeoff clip hosted on
Pexels' CDN (`videos.pexels.com`). This is a **remote, third-party asset** —
video CDNs frequently apply hotlink/referrer protection, and playback can be
blocked by some browsers, ad blockers, or networks even when the URL is
valid. To make this robust:

- `src/assets/images/hero-aircraft-hologram-01.jpg` is used as both the
  `poster` (shown while the video loads) and the **fallback image** if the
  video fails to load (`onError`) or if the user has `prefers-reduced-motion`
  enabled or a data-saver connection.
- If the video still doesn't appear for you, that's almost certainly the
  Pexels CDN declining the request from your origin/browser — the fallback
  image will display instead, so the hero never looks broken.

**Recommended before shipping to production:** download the clip and serve
it from your own domain/CDN (e.g. drop an `.mp4` into `src/assets/video/`
and update `HERO_VIDEO_SRC` in `src/components/sections/Home.jsx`), so the
hero doesn't depend on a third party's hotlink policy.

## Images

All imagery in `src/assets/images/` is either supplied by you or sourced
from Unsplash under its free license. Unsplash images are referenced by
remote URL for now — for full independence from third-party hosting, download
and move them into `src/assets/images/` following the same
`section-subject-01.jpg` naming convention already used.
