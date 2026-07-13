# My Internship Journey at Flyrank

Hi, welcome to my little corner of the internet. This is the blog I built to document my journey as an intern at **Flyrank** — the things I built, the bugs that humbled me, and everything I picked up along the way.

I wanted a place that felt like *mine* rather than a generic template, so I designed it to read like a set of field notes: honest, a bit technical, and hopefully useful to the next person figuring the same things out.

## What this is

A fast, responsive blog where every write-up is just a Markdown file. The homepage is a bento grid so you can scan everything at a glance, and each post opens into a calm, easy-to-read column (think Medium, minus the paywall).

- **Built with:** Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion for the animations.
- **Content:** plain Markdown files. No database, no CMS — I just write and it shows up.
- **Hosted on:** Vercel, for free.

## Running it locally

If you want to poke around on your own machine:

```bash
npm install
npm run dev          # then open http://localhost:3000
```

## How I write a post

I drop a new Markdown file into `content/posts/`, for example `content/posts/my-post.md`:

```markdown
---
title: "My post title"
summary: "A sentence or two that shows on the card and at the top of the post."
date: "2026-07-13"          # YYYY-MM-DD
tags: ["debugging", "git"]  # optional
cover: "/covers/my.svg"     # optional — a path in /public or an https URL
featured: false             # true = bigger tile with a cover band on the homepage
---

Then I just write in Markdown. Headings, code blocks, tables, lists, links — they all work.
```

The filename becomes the URL (`/blog/my-post`), and the reading time is worked out automatically.

## The tech, briefly

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Local dev server with hot reload      |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run typecheck` | TypeScript check                      |
| `npm run lint`      | Linting                               |

All my personal details (name, role, links) live in one file, `site.config.ts`, so nothing about me is buried in the components.

## Deployment

This is deployed on [Vercel](https://vercel.com). Every push to `main` publishes a new version automatically, and the whole site is prerendered as static pages so it loads fast.

## Say hi

Thanks for stopping by. If any of these notes helped you, that made writing them worth it.
