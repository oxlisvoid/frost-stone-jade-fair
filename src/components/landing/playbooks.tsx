import { LoopVideo } from "@/components/loop-video";

export function Playbooks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">2 growth playbooks</h2>
      <p className="mt-3 max-w-xl text-muted">
        The workflows make the content. These two guides get it in front of people without
        burning the account on day three.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="overflow-hidden rounded-2xl bg-surface shadow-(--shadow-card)">
          <LoopVideo
            src="/media/v-night.mp4"
            poster="/media/p-night.jpg"
            className="aspect-16/10"
            label="TikTok playbook preview"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold">TikTok account launch + scaling guide</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Niche selection, hook formulas, posting cadence, and how to keep a fictional
              creator looking native to For You.
            </p>
          </div>
        </article>
        <article className="overflow-hidden rounded-2xl bg-surface shadow-(--shadow-card)">
          <LoopVideo
            src="/media/v-indoor.mp4"
            poster="/media/p-indoor.jpg"
            className="aspect-16/10"
            label="Instagram playbook preview"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold">Instagram account launch + scaling guide</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Grid vs Reels, carousel structure, bio-to-offer path, and the weekly batch
              schedule we actually use.
            </p>
          </div>
        </article>
      </div>
      <p className="mt-5 text-sm text-muted">
        + Helpful tools (free) + Prompt libraries (free) + Lifetime updates (free)
      </p>
    </section>
  );
}
