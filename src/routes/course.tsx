import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { COURSE, OFFER } from "@/lib/site";

export const Route = createFileRoute("/course")({ component: CoursePage });

function CoursePage() {
  const [active, setActive] = useState<(typeof COURSE)[number]["id"]>(COURSE[0].id);
  const lesson = COURSE.find((item) => item.id === active) ?? COURSE[0];

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
          Lesson titles and what each one covers. No videos here — this is the outline. The real
          course files are emailed within 24 hours after Stripe confirms payment.
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
              </button>
            ))}
          </aside>

          <section className="rounded-3xl bg-surface p-6 shadow-(--shadow-card) sm:p-8">
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">{lesson.time}</p>
            <h2 className="mt-1 text-2xl">{lesson.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">{lesson.body}</p>
            <Button asChild className="mt-8">
              <Link to="/checkout">Get the full course by email</Link>
            </Button>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
