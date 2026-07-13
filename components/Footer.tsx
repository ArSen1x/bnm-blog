import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { socials } = siteConfig;
  const links = [
    socials.github && {
      href: socials.github,
      label: "GitHub",
      Icon: Github,
      external: true,
    },
    socials.linkedin && {
      href: socials.linkedin,
      label: "LinkedIn",
      Icon: Linkedin,
      external: true,
    },
    socials.email && {
      href: `mailto:${socials.email}`,
      label: "Email",
      Icon: Mail,
      external: false,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    Icon: typeof Github;
    external: boolean;
  }[];

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.author} · Built with Next.js &
          Framer Motion
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
