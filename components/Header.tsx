import Link from "next/link";
import { Github } from "lucide-react";
import { siteConfig } from "@/site.config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          aria-label={`${siteConfig.siteName} — home`}
        >
          <span className="font-mono text-sm text-accent">~/</span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {siteConfig.siteName}
          </span>
          <span
            aria-hidden
            className="ml-0.5 h-4 w-[2px] translate-y-[2px] bg-accent animate-caret-blink"
          />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:text-ink"
          >
            posts
          </Link>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Github className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">View repo</span>
            <span className="sm:hidden">repo</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
