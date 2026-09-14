import { Link } from "@tanstack/react-router";
import { MediaCompare } from "@/components/media-compare";
import { LoopVideo } from "@/components/loop-video";
import { Button } from "@/components/ui/button";
import { WORKFLOWS } from "@/lib/site";

export function Workflows() {
  return (
    <section id="workflows" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-medium text-muted">Plug-and-play</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        7 plug-and-play workflows
      </h2>
      <p className="mt-3 max-w-2xl text-muted">
        Drop the graphs into ComfyUI. Each one is the production version we actually run —
        not a screenshot from a two-year-old tutorial.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <MediaCompare
          beforeSrc="/media/skin-before.jpg"
          afterSrc="/media/skin-after.jpg"
          caption="Skin enhance example — drag to compare the raw generation with the refined pass."
        />
        <MediaCompare
          beforeSrc="/media/swap-before.jpg"
          afterSrc="/media/swap-after.jpg"
          caption="Faceswap example — same pose, wardrobe and lighting. New identity."
        />
        <figure className="space-y-2">
          <div className="overflow-hidden rounded-xl bg-ink">
            <LoopVideo
              src="/media/v-motion.mp4"
              poster="/media/p-night.jpg"
              className="aspect-3/4"
              label="Motion control example"
            />
          </div>
          <figcaption className="text-sm text-muted">
            Motion control example — camera-tracked night walk from a still.
          </figcaption>
        </figure>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-ink p-3 sm:p-4">
        <p className="mb-3 px-1 text-sm font-medium text-paper">
          Video comparison model
        </p>
        <div className="mx-auto max-w-md">
          <MediaCompare
            beforeSrc="/media/v-cafe.mp4"
            afterSrc="/media/v-cafe.mp4"
            beforeKind="video"
            afterKind="video"
            beforePoster="/media/p-cafe.jpg"
            afterPoster="/media/p-cafe.jpg"
            beforeLabel="Raw"
            afterLabel="Refined"
            rawFilter
          />
          <p className="mt-3 px-1 text-sm text-paper/70">
            Same clip, two passes. Drag the handle — left is the uncorrected generation, right is the OxlisVoid refine.
          </p>
        </div>
      </div>

      <ul className="mt-10 grid gap-2 sm:grid-cols-2">
        {WORKFLOWS.map((wf) => (
          <li
            key={wf.name}
            className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 shadow-(--shadow-card)"
          >
            <span className="text-sm font-medium">{wf.name}</span>
            {wf.tag ? (
              <span className="rounded-full bg-chip px-2 py-0.5 text-[11px] font-semibold text-accent">
                {wf.tag}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">+ Free new updates and workflows forever</p>
      <Button asChild variant="link" className="mt-2 px-0">
        <Link to="/toolkit">Explore the toolkit →</Link>
      </Button>
    </section>
  );
}
