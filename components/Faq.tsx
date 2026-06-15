/** Accessible FAQ list using native <details>. Server component. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-paper">
      {items.map((item, i) => (
        <details key={i} className="group p-4">
          <summary className="cursor-pointer list-none font-medium text-foreground marker:hidden">
            <span className="flex items-center justify-between gap-2">
              {item.q}
              <span className="font-mono text-accent transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-subtle">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
