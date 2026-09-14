import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { formatUsd } from "@/lib/content";
import { createCheckoutSession } from "@/lib/checkout-fn";
import { PRODUCTS } from "@/lib/products";
import { INCLUDED, SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [qty, setQty] = useState(1);
  const [addon, setAddon] = useState(false);
  const [addonQty, setAddonQty] = useState(1);

  const allAccess = PRODUCTS[0];
  const instagram = PRODUCTS[1];
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const items = useMemo(() => {
    const next = [{ productId: allAccess.id, quantity: qty }];
    if (addon) next.push({ productId: instagram.id, quantity: addonQty });
    return next;
  }, [addon, addonQty, allAccess.id, instagram.id, qty]);

  const pay = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!accepted) {
      setError("Accept the terms to continue.");
      return;
    }
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
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
      try {
        localStorage.setItem(
          "oxlisvoid-last-order",
          JSON.stringify({ name, email, items, at: new Date().toISOString() }),
        );
      } catch {
        /* ignore */
      }
      if (!session.url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(session.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start Stripe Checkout.");
      setBusy(false);
    }
  };

  if (unlocked) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <p className="text-sm font-medium text-good">Access on this device</p>
          <h1 className="mt-2 text-4xl">You're in.</h1>
          <p className="mt-3 text-muted">Course and toolkit are open on this browser.</p>
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
          <p className="text-sm font-medium text-accent">All Access · Stripe Checkout</p>
          <h1 className="mt-2 text-4xl tracking-tight">{content.headline}</h1>
          <p className="mt-3 text-muted">
            {content.sells} Card fields live on Stripe. This site never sees the number.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={pay} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-sm text-muted">{content.headline}</p>
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

          <label className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted">Quantity · {allAccess.name}</span>
            <input
              type="number"
              min={1}
              max={allAccess.maxQuantity}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="h-11 w-20 rounded-lg bg-paper px-3 text-center shadow-(--shadow-card)"
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-1 size-4"
              checked={addon}
              onChange={(e) => setAddon(e.target.checked)}
            />
            <span>
              Add {instagram.name} ({instagram.priceLabel})
            </span>
          </label>
          {addon ? (
            <label className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted">Quantity · add-on</span>
              <input
                type="number"
                min={1}
                max={instagram.maxQuantity}
                value={addonQty}
                onChange={(e) => setAddonQty(Math.max(1, Number(e.target.value) || 1))}
                className="h-11 w-20 rounded-lg bg-paper px-3 text-center shadow-(--shadow-card)"
              />
            </label>
          ) : null}

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

          {error ? <p className="rounded-lg bg-chip px-3 py-2 text-sm text-accent">{error}</p> : null}

          <Button type="submit" className="w-full" size="lg" disabled={busy || !accepted}>
            {busy ? "Sending you to Stripe…" : `Pay with Stripe · ${SITE.currency}`}
          </Button>
        </form>
      </main>
    </SiteShell>
  );
}
