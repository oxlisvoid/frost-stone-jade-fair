import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { TUTORIALS } from "@/lib/site";

export function Tutorials() {
  return (
    <section id="tutorials" className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium text-muted">Curriculum</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            13 step-by-step tutorials
          </h2>
          <p className="mt-4 max-w-md text-muted">
            A year of research and experience compressed to 60 minutes of essential
            information. Watch, copy the graph, generate.
          </p>
          <Button asChild className="mt-6">
            <Link to="/course">Open the course demo →</Link>
          </Button>
        </div>
        <ol className="grid gap-2 sm:grid-cols-2">
          {TUTORIALS.map((title, i) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-lg bg-paper px-3.5 py-3 text-sm shadow-(--shadow-card)"
            >
              <span className="w-6 tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span>{title}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted lg:col-start-2">
          + Download links to the latest official model pages
        </p>
      </div>
    </section>
  );
}
