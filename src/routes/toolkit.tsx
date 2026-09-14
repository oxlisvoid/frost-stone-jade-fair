import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Play } from "lucide-react";
import { LoopVideo } from "@/components/loop-video";
import { MediaCompare } from "@/components/media-compare";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { TUTORIALS, WORKFLOWS } from "@/lib/site";

export const Route = createFileRoute("/toolkit")({ component: ToolkitPage });

const MODULES = [
  {
    id: "skin",
    name: "Skin enhancer",
    blurb: "Two-pass texture refine. Drag the handle on the live comparison.",
  },
  {
    id: "swap",
    name: "Face swapper",
    blurb: "Identity swap that keeps pose, wardrobe and lighting locked.",
  },
  {
    id: "motion",
    name: "Wan SCAIL Motion Control",
    blurb: "Still-to-video with camera tracking. 20 seconds. Local generation.",
  },
  {
    id: "krea",
    name: "Krea2 Image generator",
    blurb: "Hero stills for the weekly batch. Fast aesthetic pass.",
  },
  {
    id: "lora",
    name: "LoRA Dataset generator",
    blurb: "Crop, caption and pack a training set without leaving the graph.",
  },
  {
    id: "inpaint",
    name: "Img2img inpainting",
    blurb: "Wardrobe, hands and background edits that keep the face stable.",
  },
] as const;

function ToolkitPage() {
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const [active, setActive] = useState<(typeof MODULES)[number]["id"]>("skin");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const current = MODULES.find((m) => m.id === active) ?? MODULES[0];

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm font-medium text-muted">Demo panel</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">OxlisVoid toolkit</h1>
          {!unlocked ? (
            <Button asChild>
              <Link to="/checkout">Unlock All Access</Link>
            </Button>
          ) : (
            <p className="text-sm text-muted">Access unlocked on this device.</p>
          )}
        </div>
        <p className="mt-3 max-w-2xl text-muted">
          Browse the workflows the way they ship. Graphs, tutorials and prompt libraries
          unlock after checkout — the previews below are live.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="space-y-1">
            {MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActive(mod.id)}
                className={`flex h-11 w-full items-center justify-between rounded-lg px-3 text-left text-sm ${
                  active === mod.id ? "bg-ink text-paper" : "hover:bg-surface"
                }`}
              >
                {mod.name}
                {!unlocked && mod.id !== "skin" && mod.id !== "motion" ? (
                  <Lock className="size-3.5 opacity-60" />
                ) : null}
              </button>
            ))}
          </aside>

          <section className="rounded-2xl bg-surface p-4 shadow-(--shadow-card) sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{current.name}</h2>
                <p className="mt-1 text-sm text-muted">{current.blurb}</p>
              </div>
              {!unlocked ? (
                <span className="rounded-full bg-chip px-2.5 py-1 text-[11px] font-medium text-accent">
                  Preview
                </span>
              ) : (
                <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-paper">
                  Unlocked
                </span>
              )}
            </div>

            <div className="mt-5">
              {current.id === "skin" ? (
                <div className="mx-auto max-w-sm">
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
                    caption="Video comparison model — raw pass vs skin-enhanced pass."
                  />
                </div>
              ) : null}
              {current.id === "swap" ? (
                <div className="mx-auto max-w-sm">
                  <MediaCompare
                    beforeSrc="/media/swap-before.jpg"
                    afterSrc="/media/swap-after.jpg"
                    caption="Identity swap on a locked pose."
                  />
                </div>
              ) : null}
              {current.id === "motion" ? (
                <div className="overflow-hidden rounded-xl bg-ink">
                  <LoopVideo
                    src="/media/v-motion.mp4"
                    poster="/media/p-night.jpg"
                    className="aspect-video"
                    label="Motion control preview"
                  />
                </div>
              ) : null}
              {current.id === "krea" ? (
                <Grid
                  clips={[
                    ["/media/v-cafe.mp4", "/media/p-cafe.jpg"],
                    ["/media/v-studio.mp4", "/media/p-studio.jpg"],
                    ["/media/v-rooftop.mp4", "/media/p-rooftop.jpg"],
                    ["/media/v-beach.mp4", "/media/p-beach.jpg"],
                  ]}
                />
              ) : null}
              {current.id === "lora" || current.id === "inpaint" ? (
                unlocked ? (
                  <Grid
                    clips={[
                      ["/media/v-indoor.mp4", "/media/p-indoor.jpg"],
                      ["/media/v-man.mp4", "/media/p-man.jpg"],
                    ]}
                  />
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center rounded-xl bg-paper text-center">
                    <Lock className="size-6 text-subtle" />
                    <p className="mt-3 text-sm text-muted">Unlock the toolkit to open this graph.</p>
                    <Button asChild className="mt-4" size="sm">
                      <Link to="/checkout">Get instant access</Link>
                    </Button>
                  </div>
                )
              ) : null}
            </div>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold">Tutorials in the pack</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {TUTORIALS.map((title) => (
              <li
                key={title}
                className="flex items-center gap-2 rounded-lg bg-surface px-3 py-3 text-sm shadow-(--shadow-card)"
              >
                {unlocked ? (
                  <Play className="size-4 text-fg" />
                ) : (
                  <Lock className="size-4 text-subtle" />
                )}
                {title}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            {WORKFLOWS.length} workflows · {TUTORIALS.length} tutorials · lifetime updates
          </p>
        </section>
      </main>
    </SiteShell>
  );
}

function Grid({ clips }: { clips: string[][] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {clips.map(([src, poster]) => (
        <div key={src} className="overflow-hidden rounded-lg bg-ink">
          <LoopVideo src={src} poster={poster} className="aspect-3/4" />
        </div>
      ))}
    </div>
  );
}
