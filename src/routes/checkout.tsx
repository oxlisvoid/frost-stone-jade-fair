import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SEED_PRODUCTS, type CatalogProduct } from "@/lib/catalog";
import { loadCatalog } from "@/lib/catalog-fns";
import { createCheckoutSession } from "@/lib/checkout-fn";
import { formatUsd } from "@/lib/content";
import { INCLUDED, SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [qty, setQty] = useState(1);
  const [addons, setAddons] = useState<Record<string, boolean>>({});
  const [catalog, setCatalog] = useState<CatalogProduct[]>(SEED_PRODUCTS);

  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);
  const primary = catalog.find((p) => !p.addon) ?? catalog[0];
  const extras = catalog.filter((p) => p.addon && p.active);

  useEffect(() => {
    void loadCatalog()
      .then((rows) => {
        if (rows.length) setCatalog(rows);
      })
      .catch(() => undefined);
  }, []);

  const items = useMemo(() => {
    if (!primary) return [];
    const next = [{ productId: primary.id, quantity: qty }];
    for (const extra of extras) {
      if (addons[extra.id]) next.push({ productId: extra.id, quantity: 1 });
    }
    return next;
  }, [addons, extras, primary, qty]);

  const pay = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!accepted) {
      setError("Accept the terms to continue.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Name and the delivery email are required.");
      return;
    }
    setBusy(true);
    try {
      const session = await createCheckoutSession({
        data: {
          items,
          email: email.trim(),
          name: name.trim(),
          origin: window.location.origin,
        },
      });
      if (!session.url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(session.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start Stripe Checkout.");
      setBusy(false);
    }
  };

  if (!primary) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-lg px-4 py-20 text-muted">No products are for sale yet.</main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium text-accent">All Access · Stripe Checkout</p>
          <h1 className="mt-2 text-4xl tracking-tight">{content.headline}</h1>
          <p className="mt-3 text-muted">
            Use the email where you want the toolkit. After Stripe confirms payment we send the real
            workflows, tutorials, and files within 24 hours. The course and toolkit here are demos.
            Card fields live on Stripe.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={pay} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-sm text-muted">Lifetime · one payment</p>
          <p className="font-display text-4xl">{price}</p>

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
            <span className="mb-1.5 block text-muted">Email that receives the tools</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              autoComplete="email"
              placeholder="you@email.com"
            />
            <span className="mt-1 block text-xs text-subtle">
              We email the pack here within 24 hours of payment. Double-check the spelling.
            </span>
          </label>

          <label className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">Quantity · {primary.name}</span>
            <input
              type="number"
              min={1}
              max={5}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="h-11 w-20 rounded-lg bg-paper px-3 text-center shadow-(--shadow-card)"
            />
          </label>

          {extras.map((extra) => (
            <label key={extra.id} className="flex items-start gap-3 text-sm text-muted">
              <input
                type="checkbox"
                className="mt-1 size-4"
                checked={Boolean(addons[extra.id])}
                onChange={(e) => setAddons((prev) => ({ ...prev, [extra.id]: e.target.checked }))}
              />
              <span>
                Add {extra.name} ({formatUsd(extra.unitAmountCents)})
              </span>
            </label>
          ))}

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
              . Digital All Access is not refundable after the files are emailed.
            </span>
          </label>

          {error ? <p className="rounded-lg bg-chip px-3 py-2 text-sm text-accent">{error}</p> : null}

          <Button type="submit" className="w-full" size="lg" disabled={busy || !accepted}>
            {busy ? "Sending you to Stripe…" : `Pay with Stripe · ${SITE.currency}`}
          </Button>
        </form>
      </main>
    </SiteShell>
  );
}
