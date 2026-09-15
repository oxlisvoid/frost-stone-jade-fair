import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Play } from "lucide-react";
import { LoopVideo } from "@/components/loop-video";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { COURSE, OFFER } from "@/lib/site";

export const Route = createFileRoute("/course")({ component: CoursePage });

function CoursePage() {
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const [active, setActive] = useState<(typeof COURSE)[number]["id"]>(COURSE[0].id);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const lesson = COURSE.find((item) => item.id === active) ?? COURSE[0];
  const locked = !unlocked && lesson.id !== "welcome" && lesson.id !== "character";

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm font-medium text-accent">Course demo</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-4xl tracking-tight sm:text-5xl">The classroom</h1>
          <Button asChild>
            <Link to="/checkout">{`Get All Access ${OFFER.priceLabel}`}</Link>
          </Button>
        </div>
        <p className="mt-3 max-w-2xl text-muted">
          This is a demonstration of the lesson list. Welcome and character are open. The real
          course files are emailed within 24 hours after Stripe confirms payment — they are not a
          public ZIP on this site.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-1">
            {COURSE.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`flex h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-sm ${
                  active === item.id ? "bg-ink text-paper" : "hover:bg-surface"
                }`}
              >
                <span className="w-7 tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 truncate">{item.title}</span>
                {!unlocked && item.id !== "welcome" && item.id !== "character" ? (
                  <Lock className="size-3.5 opacity-60" />
                ) : (
                  <Play className="size-3.5 opacity-60" />
                )}
              </button>
            ))}
          </aside>

          <section className="rounded-3xl bg-surface p-4 shadow-(--shadow-card) sm:p-6">
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">{lesson.time}</p>
            <h2 className="mt-1 text-2xl">{lesson.title}</h2>
            <p className="mt-2 text-sm text-muted">{lesson.body}</p>
            <div className="relative mt-5 overflow-hidden rounded-2xl bg-ink">
              {locked ? (
                <div className="flex aspect-video flex-col items-center justify-center p-6 text-center text-paper">
                  <Lock className="size-7 text-paper/70" />
                  <p className="mt-3 text-sm text-paper/80">This lesson unlocks with All Access.</p>
                  <Button asChild variant="accent" className="mt-4">
                    <Link to="/checkout">Pay {OFFER.priceLabel}</Link>
                  </Button>
                </div>
              ) : (
                <LoopVideo
                  src={lesson.src}
                  poster={lesson.poster}
                  className="aspect-video"
                  label={lesson.title}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
