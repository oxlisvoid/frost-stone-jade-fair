import { Check } from "lucide-react";

const GET = [
  "7 plug-and-play ComfyUI workflows",
  "13 step-by-step tutorials",
  "2 social growth playbooks (TikTok + Instagram)",
  "Prompt libraries and helpful tools",
  "Lifetime updates — free forever",
] as const;

const LEARN = [
  "Create realistic AI faces and avatars",
  "Build consistent characters with local workflows",
  "Use ComfyUI without random tutorial-hopping",
  "Train LoRA characters for repeatable results",
  "Enhance skin-textures and overall quality",
  "Use the prompts, settings, and SOPs behind the system",
] as const;

export function Included() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you could ever need</h2>
      <p className="mt-3 max-w-2xl text-muted">
        One payment. The pack is emailed to you within 24 hours of Stripe confirming the charge.
        This site only shows demos.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">What you get</p>
          <ul className="mt-4 space-y-2.5">
            {GET.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-good" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">You will learn</p>
          <ul className="mt-4 space-y-2.5">
            {LEARN.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-good" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
