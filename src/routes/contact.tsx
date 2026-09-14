import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-muted">
          {SITE.email}
        </p>
        {sent ? (
          <p className="mt-8 rounded-xl bg-surface px-4 py-3 text-sm shadow-(--shadow-card)">
            Message saved on this device. We read everything that comes in.
          </p>
        ) : (
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Name</span>
              <input required className="h-11 w-full rounded-lg bg-surface px-3 shadow-(--shadow-card)" />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Email</span>
              <input
                required
                type="email"
                className="h-11 w-full rounded-lg bg-surface px-3 shadow-(--shadow-card)"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Message</span>
              <textarea
                required
                rows={5}
                className="w-full rounded-lg bg-surface px-3 py-2 shadow-(--shadow-card)"
              />
            </label>
            <Button type="submit">Send</Button>
          </form>
        )}
      </main>
    </SiteShell>
  );
}
