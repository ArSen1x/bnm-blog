import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { BentoGrid } from "@/components/BentoGrid";
import { FadeIn } from "@/components/motion";

type Params = { params: { tag: string } };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag.toLowerCase()) }));
}

export function generateMetadata({ params }: Params): Metadata {
  const tag = decodeURIComponent(params.tag);
  return { title: `#${tag}`, description: `Posts tagged #${tag}` };
}

export default function TagPage({ params }: Params) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All posts
      </Link>

      <FadeIn>
        <h1 className="mb-8 mt-8 font-display text-4xl font-semibold tracking-tight text-ink">
          <span className="text-accent">#</span>
          {tag}
          <span className="ml-3 align-middle font-mono text-base font-normal text-muted">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </h1>
      </FadeIn>

      <BentoGrid posts={posts} />
    </div>
  );
}
