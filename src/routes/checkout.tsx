import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { saveLead } from "@/lib/admin.server";
import { useAccess } from "@/lib/access";
import { OFFER, PAYMENT, SITE } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    paid: search.paid === "1" || search.paid === true ? "1" : undefined,
  }),
  component: CheckoutPage,
});

function readStoredLink() {
  try {
    return localStorage.getItem("oxlis-stripe-link") ?? "";
  } catch {
    return "";
  }
}

function CheckoutPage() {
  const { paid } = useSearch({ from: "/checkout" });
  const unlock = useAccess((s) => s.unlock);
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const { user } = useCurrentUserState();
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [stripeUrl, setStripeUrl] = useState(PAYMENT.stripePaymentLink);

  useEffect(() => {
    hydrate();
    if (!PAYMENT.stripePaymentLink) setStripeUrl(readStoredLink());
  }, [hydrate]);

  useEffect(() => {
    if (paid === "1") unlock();
  }, [paid, unlock]);

  const pay = async (event: FormEvent) => {
    event.preventDefault();
    if (!accepted || !stripeUrl) return;
    setBusy(true);
    const order = {
      name,
      email,
      offer: OFFER.name,
      total: SITE.price,
      acceptedTermsAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem("oxlisvoid-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    if (user) {
      try {
        await saveLead({ data: { name, email } });
      } catch {
        /* operator log is best-effort */
      }
    }
    window.location.href = stripeUrl;
  };

  if (paid === "1" || unlocked) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <p className="text-sm font-medium text-good">Access on this device</p>
          <h1 className="mt-2 text-4xl">You're in.</h1>
          <p className="mt-3 text-muted">
            Stripe receipt hits your email. Course and toolkit open here. Final files also go
            to the checkout address — keep that inbox.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/toolkit">Open toolkit</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/course">Open course</Link>
            </Button>
          </div>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium text-accent">All Access · one payment</p>
          <h1 className="mt-2 text-4xl tracking-tight">{OFFER.headline}</h1>
          <p className="mt-3 text-muted">
            {OFFER.sells} Card is charged on Stripe. This site never sees the number.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>Was ${SITE.comparePrice} as Total Kit.</li>
            <li>Standing price — no countdown.</li>
            <li>After unlock or download, the sale is final.</li>
          </ul>
        </div>

        <form onSubmit={pay} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-sm text-muted">{OFFER.name}</p>
          <p className="font-display text-4xl">{OFFER.priceLabel}</p>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              autoComplete="email"
            />
          </label>
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              required
              className="mt-1 size-4"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link to="/legal" hash="terms" className="text-fg underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/legal" hash="refund" className="text-fg underline">
                Refund Policy
              </Link>
              . Digital All Access is not refundable after download or toolkit unlock.
            </span>
          </label>
          {!stripeUrl ? (
            <p className="rounded-lg bg-chip px-3 py-2 text-xs text-muted">
              Stripe is not connected yet. Open Admin after sign-in and paste your Payment Link
              — or put it in the site payment config.
            </p>
          ) : null}
          <Button type="submit" className="w-full" size="lg" disabled={busy || !stripeUrl || !accepted}>
            {busy ? "Sending you to Stripe…" : `Pay ${OFFER.priceLabel} with Stripe`}
          </Button>
          <p className="text-center text-xs text-subtle">PCI card fields live on Stripe, not here.</p>
        </form>
      </main>
    </SiteShell>
  );
}
