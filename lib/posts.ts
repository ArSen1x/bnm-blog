import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO string, e.g. "2026-07-01"
  tags: string[];
  cover?: string; // optional path in /public or remote https URL
  featured: boolean; // controls bento tile size
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

/** Ensure the content directory exists so an empty repo doesn't crash the build. */
function ensureDir(): void {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
}

function isMarkdown(file: string): boolean {
  return file.endsWith(".md") || file.endsWith(".mdx");
}

/** Coerce whatever is in frontmatter into safe, typed values (edge-case hardening). */
function normalize(raw: Record<string, unknown>, slug: string, body: string): PostMeta {
  const title =
    typeof raw.title === "string" && raw.title.trim() ? raw.title.trim() : slug;
  const summary = typeof raw.summary === "string" ? raw.summary.trim() : "";
  const date =
    typeof raw.date === "string" && !Number.isNaN(Date.parse(raw.date))
      ? raw.date
      : "1970-01-01";
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map((t) => String(t).trim()).filter(Boolean)
    : [];
  const cover =
    typeof raw.cover === "string" && raw.cover.trim() ? raw.cover.trim() : undefined;
  const featured = raw.featured === true;
  const readingMinutes = Math.max(1, Math.round(readingTime(body).minutes));

  return { slug, title, summary, date, tags, cover, featured, readingMinutes };
}

export function getAllSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(POSTS_DIR)
    .filter(isMarkdown)
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  ensureDir();
  const md = path.join(POSTS_DIR, `${slug}.md`);
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = fs.existsSync(md) ? md : fs.existsSync(mdx) ? mdx : null;
  if (!file) return null;

  const source = fs.readFileSync(file, "utf8");
  const { data, content } = matter(source);
  return { ...normalize(data, slug, content), content };
}

/** All posts, newest first. Featured posts are surfaced first within the same date bucket. */
export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? (({ content, ...meta }) => meta)(post) : null;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => {
      const byDate = Date.parse(b.date) - Date.parse(a.date);
      if (byDate !== 0) return byDate;
      return Number(b.featured) - Number(a.featured);
    });
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  const needle = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === needle),
  );
}

/** Stable, human-readable date used consistently in UI and datetime attributes. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
