/**
 * Edit this file to make the blog yours.
 * Every value here is read across the site — no need to hunt through components.
 */
export const siteConfig = {
  /** Your name, shown in the header and footer. */
  author: "Your Name",

  /** Short role/title under your name and in metadata. */
  role: "Software Engineering Intern",

  /** One-line hero tagline. Keep it concrete. */
  tagline:
    "Field notes from my internship — what I built, what broke, and what I learned fixing it.",

  /** Used for <title>, SEO, and social cards. */
  siteName: "Internship Notes",

  /** Full deployed URL (set after your first Vercel deploy). No trailing slash. */
  url: "https://your-blog.vercel.app",

  /** Shown as the "browse the source" link — point it at THIS repo. */
  githubRepo: "https://github.com/your-username/internship-blog",

  /** Social / contact links. Leave a value empty ("") to hide that link. */
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle",
    email: "you@example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
