import { FAQ } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-line">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-[15px] font-medium">
                {item.q}
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper text-lg leading-none text-muted group-open:hidden">
                  +
                </span>
                <span className="hidden size-7 shrink-0 place-items-center rounded-full bg-paper text-lg leading-none text-muted group-open:grid">
                  −
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
