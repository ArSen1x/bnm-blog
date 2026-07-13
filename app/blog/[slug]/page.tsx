import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import {
  getAllSlugs,
  getPostBySlug,
  getAllPosts,
  formatDate,
} from "@/lib/posts";
import { siteConfig } from "@/site.config";
import { Markdown } from "@/components/Markdown";
import { TagChip } from "@/components/TagChip";
import { PostCard } from "@/components/PostCard";
import { FadeIn } from "@/components/motion";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.summary || siteConfig.tagline,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  };
}

export default function PostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  // Up to two related posts by shared tag (fallback: newest others).
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const shared = (p: typeof a) =>
        p.tags.filter((t) => post.tags.includes(t)).length;
      return shared(b) - shared(a);
    })
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-content px-5 py-10 sm:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All posts
      </Link>

      {/* Reading column: deliberately narrow for legibility (Medium-like). */}
      <div className="mx-auto mt-8 max-w-prose">
        <FadeIn>
          <header>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span aria-hidden className="text-line">•</span>
              <span className="eyebrow">{post.readingMinutes} min read</span>
            </div>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-4 text-lg text-muted">{post.summary}</p>
            )}
            {post.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagChip key={tag} tag={tag} />
                ))}
              </div>
            )}
          </header>
        </FadeIn>

        {post.cover && (
          <FadeIn delay={0.05}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.title}
              className="mt-8 w-full rounded-2xl border border-line object-cover"
              loading="lazy"
            />
          </FadeIn>
        )}

        <FadeIn delay={0.1}>
          <div className="mt-10">
            <Markdown>{post.content}</Markdown>
          </div>
        </FadeIn>

        {/* Repo CTA at the end of the read. */}
        <div className="mt-14 rounded-2xl border border-line bg-surface p-6">
          <p className="font-display text-lg font-semibold text-ink">
            Curious how this is built?
          </p>
          <p className="mt-1 text-muted">
            The full source of this blog is on GitHub.
          </p>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-sm text-paper transition-colors hover:bg-accent"
          >
            <Github className="h-4 w-4" aria-hidden />
            View repository
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="eyebrow mb-5">Keep reading</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={{ ...p, featured: false }} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
