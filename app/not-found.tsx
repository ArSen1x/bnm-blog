import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-start px-5 py-24 sm:px-8">
      <p className="eyebrow mb-4">404 — not found</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        This page went off-script.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The post or tag you were looking for doesn&apos;t exist — it may have been
        renamed or never published.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to all posts
      </Link>
    </div>
  );
}
