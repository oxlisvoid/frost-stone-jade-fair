import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SEED_PRODUCTS, type CatalogProduct } from "@/lib/catalog";
import { loadCatalog } from "@/lib/catalog-fns";
import { createCheckoutSession } from "@/lib/checkout-fn";
import { formatUsd } from "@/lib/content";
import { INCLUDED, SITE } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [catalog, setCatalog] = useState<CatalogProduct[]>(SEED_PRODUCTS);
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    void loadCatalog()
      .then((rows) => {
        const live = rows.length ? rows : SEED_PRODUCTS;
        setCatalog(live);
        setPicked({});
      })
      .catch(() => undefined);
  }, []);

  const selected = useMemo(
    () => catalog.filter((product) => picked[product.id]),
    [catalog, picked],
  );
  const totalCents = selected.reduce((sum, product) => sum + product.unitAmountCents, 0);

  const toggle = (id: string) => {
    setPicked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    if (!selected.length) {
      setError("Pick at least one product.");
      return;
    }
    setBusy(true);
    try {
      const session = await createCheckoutSession({
        data: {
          items: selected.map((product) => ({
            productId: product.id,
            quantity: 1,
            priceId: product.stripePriceId || undefined,
          })),
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

  return (
    <SiteShell>
      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="text-sm font-medium text-accent">Stripe Checkout</p>
          <h1 className="mt-2 text-4xl tracking-tight">Pick the tools. Pay on Stripe.</h1>
          <p className="mt-3 text-muted">
            Every product below comes from the Stripe Dashboard — add more there or in the desk and
            they show up here. Enter the email that should receive the files. Card details stay on
            Stripe.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {INCLUDED.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={pay} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-sm text-muted">Products</p>
          <ul className="space-y-2">
            {catalog.map((product) => {
              const on = Boolean(picked[product.id]);
              return (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => toggle(product.id)}
                    className={`flex w-full items-start justify-between gap-3 rounded-2xl px-4 py-3 text-left shadow-(--shadow-card) ${
                      on ? "bg-ink text-paper" : "bg-paper"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-medium">{product.name}</span>
                      {product.description ? (
                        <span className={`mt-0.5 block text-xs ${on ? "text-paper/70" : "text-muted"}`}>
                          {product.description}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-sm font-medium">{formatUsd(product.unitAmountCents)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="font-display text-4xl">{formatUsd(totalCents || 0)}</p>

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
              We email the pack here in under 8 hours after payment. Double-check the spelling.
            </span>
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
              . You can email us within 30 days of payment for a refund of this order.
            </span>
          </label>

          {error ? <p className="rounded-lg bg-chip px-3 py-2 text-sm text-accent">{error}</p> : null}

          <Button type="submit" className="w-full" size="lg" disabled={busy || !accepted || !selected.length}>
            {busy ? "Sending you to Stripe…" : `Pay with Stripe · ${SITE.currency}`}
          </Button>
          <p className="text-center text-xs text-muted">
            Stripe processes the payment. We never store your card number, expiry, or security code.
          </p>
        </form>
      </main>
    </SiteShell>
  );
}
