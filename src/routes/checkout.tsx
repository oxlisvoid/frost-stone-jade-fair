import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SEED_PRODUCTS } from "@/lib/catalog";
import { loadCatalog } from "@/lib/catalog-fns";
import { createCheckoutSession } from "@/lib/checkout-fn";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const [error, setError] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void (async () => {
      try {
        const rows = await loadCatalog();
        const live = (rows.length ? rows : SEED_PRODUCTS).filter(
          (item) => item.id !== "all-access" && !/all access/i.test(item.name),
        );
        const product = live.find((item) => item.unitAmountCents === 999) ?? live.find((item) => !item.addon) ?? live[0];
        if (!product) throw new Error("The $9.99 product is not available.");
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
      }
    })();
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-[#07080b] px-6 text-[#f4f1ea]">
      <p className="text-lg">{error || "Opening Stripe…"}</p>
    </div>
  );
}
