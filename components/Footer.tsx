import Link from "next/link";
import { author, siteConfig } from "@/config/site";
import { guides } from "@/lib/guides";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="font-bold text-slate-900">{siteConfig.name}</div>
          <p className="mt-2 text-sm text-slate-500">{siteConfig.tagline}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">Guides</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="hover:text-blue-600 hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">About</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/about" className="hover:text-blue-600 hover:underline">
                About this tool
              </Link>
            </li>
            <li>
              <a href={author.url} className="hover:text-blue-600 hover:underline" rel="author">
                Built by {author.name}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-6">
        <p className="mx-auto max-w-5xl text-xs leading-relaxed text-slate-400">
          <strong>Disclaimer:</strong> {siteConfig.name} provides general information and document
          drafting assistance only. It is not legal, medical, or insurance advice and does not
          create an attorney–client relationship. Review any letter with a licensed professional
          before submitting. © {new Date().getFullYear()} {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
