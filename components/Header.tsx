import Link from "next/link";
import { navLinks, siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="relative grid h-8 w-8 place-items-center rounded-md bg-paper/5 font-mono text-sm font-bold text-accent ring-1 ring-paper/10">
            A
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-sm bg-accent" />
          </span>
          <span className="text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-paper/60">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 transition hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
