import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { HoverLift } from "@/components/motion";
import { cn } from "@/lib/utils";

/**
 * A single bento tile. The whole card is one link (a11y: single focus target),
 * with a decorative "read" affordance revealed on hover.
 * Featured posts render larger and show a cover band.
 */
export function PostCard({ post }: { post: PostMeta }) {
  const { slug, title, summary, date, tags, cover, featured, readingMinutes } = post;

  return (
    <HoverLift
      className={cn(
        "h-full",
        featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
      )}
    >
      <Link
        href={`/blog/${slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-tile transition-shadow hover:shadow-tile-hover",
        )}
      >
        {featured && cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            aria-hidden
            className="h-44 w-full object-cover sm:h-56"
            loading="lazy"
          />
        )}

        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="eyebrow">
              <time dateTime={date}>{formatDate(date)}</time>
            </span>
            <span aria-hidden className="text-line">
              •
            </span>
            <span className="eyebrow">{readingMinutes} min read</span>
            {featured && (
              <span className="ml-auto rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                Featured
              </span>
            )}
          </div>

          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-ink",
              featured ? "text-2xl sm:text-3xl" : "text-xl",
              // Clamp long titles so the grid never breaks.
              "line-clamp-3",
            )}
          >
            {title}
          </h3>

          {summary && (
            <p className={cn("text-muted", featured ? "line-clamp-4" : "line-clamp-2")}>
              {summary}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, featured ? 4 : 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <span
              aria-hidden
              className="inline-flex shrink-0 items-center gap-1 font-mono text-sm text-muted transition-colors group-hover:text-accent"
            >
              read
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </HoverLift>
  );
}
