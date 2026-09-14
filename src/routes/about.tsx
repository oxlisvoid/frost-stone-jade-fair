import { createFileRoute } from "@tanstack/react-router";
import { FitImage } from "@/components/fit-image";
import { SiteShell } from "@/components/site-shell";
import { PORTRAITS, SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-muted">About</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{SITE.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {SITE.name} is a local-first toolkit for people who want to run AI influencers
          without renting their pipeline from a monthly generator. The pack is the system
          we wish we had two years ago: graphs that load, tutorials that stop after the
          essential hour, and playbooks that treat distribution as part of the craft.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Support is direct. Updates ship into the same toolkit you already paid for.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PORTRAITS.map((shot) => (
            <div key={shot.src} className="rounded-xl bg-paper p-1.5 shadow-(--shadow-card)">
              <FitImage src={shot.src} alt={shot.alt} className="rounded-lg" />
            </div>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
