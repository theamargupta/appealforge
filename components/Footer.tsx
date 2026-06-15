import Link from "next/link";
import { author, siteConfig } from "@/config/site";
import { guides } from "@/lib/guides";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-paper/10 bg-ink text-paper/70">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-paper">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-paper/5 font-mono text-xs font-bold text-accent ring-1 ring-paper/10">
              A
            </span>
            {siteConfig.name}
          </div>
          <p className="mt-3 text-sm leading-relaxed">{siteConfig.tagline}</p>
        </div>

        <div>
          <div className="eyebrow text-paper/40">Guides</div>
          <ul className="mt-3 space-y-2 text-sm">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="transition hover:text-accent">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-paper/40">About</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="transition hover:text-accent">
                About this tool
              </Link>
            </li>
            <li>
              <a href={author.url} className="transition hover:text-accent" rel="author">
                Built by {author.name}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-4 py-6">
        <p className="mx-auto max-w-5xl text-xs leading-relaxed text-paper/40">
          <strong className="text-paper/60">Disclaimer:</strong> {siteConfig.name} provides general
          information and document drafting assistance only. It is not legal, medical, or insurance
          advice and does not create an attorney–client relationship. Review any letter with a
          licensed professional before submitting. © {new Date().getFullYear()} {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
