import Link from "next/link";
import { cn } from "@/lib/utils";

export function TagChip({
  tag,
  count,
  active = false,
}: {
  tag: string;
  count?: number;
  active?: boolean;
}) {
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "border-accent bg-accent text-white"
          : "border-line bg-accent-soft text-accent hover:border-accent",
      )}
    >
      <span>#{tag}</span>
      {typeof count === "number" && (
        <span className={cn("tabular-nums", active ? "text-white/80" : "text-accent/60")}>
          {count}
        </span>
      )}
    </Link>
  );
}
