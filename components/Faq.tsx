/** Accessible FAQ list using native <details>. Server component. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer list-none font-medium text-slate-900 marker:hidden">
            <span className="flex items-center justify-between gap-2">
              {item.q}
              <span className="text-slate-400 transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
