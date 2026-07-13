import { Github } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/site.config";
import { BentoGrid } from "@/components/BentoGrid";
import { TagChip } from "@/components/TagChip";
import { FadeIn } from "@/components/motion";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-content px-5 py-12 sm:px-8 sm:py-16">
      {/* Hero — the thesis of the page. */}
      <section className="mb-14 max-w-3xl">
        <FadeIn>
          <p className="eyebrow mb-4">
            {siteConfig.role} · internship log
          </p>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            {siteConfig.tagline}
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" aria-hidden />
              Browse the source
            </a>
            <span className="font-mono text-sm text-muted">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Tag rail — a real filter, not decoration. Hidden when there are none. */}
      {tags.length > 0 && (
        <FadeIn delay={0.18}>
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <TagChip key={tag} tag={tag} count={count} />
            ))}
          </div>
        </FadeIn>
      )}

      <BentoGrid posts={posts} />
    </div>
  );
}
