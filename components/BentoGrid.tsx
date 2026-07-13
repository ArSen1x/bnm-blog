import type { PostMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Reveal } from "@/components/motion";

export function BentoGrid({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-surface p-12 text-center">
        <p className="font-display text-lg font-semibold text-ink">
          No posts yet
        </p>
        <p className="mt-2 text-muted">
          Add a markdown file to{" "}
          <code className="font-mono text-sm text-accent">content/posts/</code> and
          it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.slug} index={i} className="h-full">
          <PostCard post={post} />
        </Reveal>
      ))}
    </div>
  );
}
