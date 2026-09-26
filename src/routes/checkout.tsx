import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SEED_PRODUCTS, type CatalogProduct } from "@/lib/catalog";
import { loadCatalog } from "@/lib/catalog-fns";
import { createCheckoutSession } from "@/lib/checkout-fn";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [product, setProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    void loadCatalog()
      .then((rows) => {
        const live = (rows.length ? rows : SEED_PRODUCTS).filter(
          (item) => item.id !== "all-access" && !/all access/i.test(item.name),
        );
        const kit = live.find((item) => item.unitAmountCents === 999);
        setProduct(kit ?? live.find((item) => !item.addon) ?? live[0] ?? null);
      })
      .catch(() => undefined);
  }, []);

  const pay = async () => {
    if (!product) return;
    setBusy(true);
    setError("");
    try {
      const session = await createCheckoutSession({
        data: {
          items: [
            {
              productId: product.id,
              quantity: 1,
              priceId: product.stripePriceId || undefined,
            },
          ],
          origin: window.location.origin,
        },
      });
      if (!session.url) throw new Error("Stripe did not return a checkout URL");
      window.location.assign(session.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open Stripe.");
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#07080b] px-6 text-[#f4f1ea]">
      <div className="w-full max-w-sm text-center">
        <button
          type="button"
          onClick={pay}
          disabled={busy || !product}
          className="h-14 w-full rounded-full bg-[#d6ff4a] text-base font-semibold text-black disabled:opacity-50"
        >
          {busy ? "Opening Stripe…" : "Pay on Stripe"}
        </button>
        {error ? <p className="mt-4 text-sm text-[#d6ff4a]">{error}</p> : null}
      </div>
    </div>
  );
}
