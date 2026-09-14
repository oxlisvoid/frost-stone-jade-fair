import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { loadOperator, saveOperator } from "@/lib/operator-fns";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <AdminDesk />
      </SignedIn>
    </>
  );
}

function AdminDesk() {
  const { user, isPending } = useCurrentUserState();
  const [stripeLink, setStripeLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [leads, setLeads] = useState<Array<{ id: number; name: string; email: string; created_at: string }>>(
    [],
  );
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    void loadOperator().then((data) => {
      setStripeLink(data.stripeLink);
      setContactEmail(data.contactEmail);
      setNotes(data.notes);
      setLeads(data.leads);
    });
  }, [user]);

  if (isPending) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-16 text-muted">Loading desk…</main>
      </SiteShell>
    );
  }

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await saveOperator({ data: { stripeLink, contactEmail, notes } });
      try {
        localStorage.setItem("oxlis-stripe-link", stripeLink.trim());
      } catch {
        /* ignore */
      }
      setStatus("Saved. Checkout on this browser will use the Stripe link if the code config is empty.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Operator desk</p>
            <h1 className="mt-1 text-4xl">Admin</h1>
            <p className="mt-2 text-sm text-muted">
              Signed in as the operator. Customer cards never pass through this panel.
            </p>
          </div>
          <UserButton />
        </div>

        <section className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Security</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Checkout Sessions are created on the server with STRIPE_SECRET_KEY.</li>
            <li>Admin routes require a real Google or X session.</li>
            <li>Leads are stored per signed-in operator id, not in a public table.</li>
            <li>Set DOMAIN and STRIPE_SECRET_KEY on Vercel. Price IDs are optional.</li>
            <li>Success URL is /success?session_id=… — cancel is /canceled.</li>
          </ul>
        </section>

        <form onSubmit={onSave} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Payment</h2>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Optional Stripe note / Price ID</span>
            <input
              value={stripeLink}
              onChange={(e) => setStripeLink(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              placeholder="https://buy.stripe.com/…"
              inputMode="url"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Orders email</span>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Private notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={5}
              className="w-full rounded-lg bg-paper px-3 py-2 shadow-(--shadow-card)"
            />
          </label>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </Button>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
        </form>

        <section className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Leads on this account</h2>
          <p className="mt-1 text-sm text-muted">
            Only checkouts you run while signed in land here. Stripe remains the ledger for
            real charges.
          </p>
          <ul className="mt-4 divide-y divide-line text-sm">
            {leads.length === 0 ? <li className="py-3 text-muted">No leads yet.</li> : null}
            {leads.map((lead) => (
              <li key={lead.id} className="flex justify-between gap-3 py-3">
                <span>
                  {lead.name} · {lead.email}
                </span>
                <span className="text-subtle">{lead.created_at}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-muted">
          <Link to="/legal" className="underline">
            Legal
          </Link>
          {" · "}
          <Link to="/course" className="underline">
            Course demo
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
