import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/checkout_sessions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { createStripeCheckout } = await import("@/lib/stripe-sdk.server");
          const origin = request.headers.get("origin") || new URL(request.url).origin;
          const contentType = request.headers.get("content-type") ?? "";
          let email = "";
          let name = "";
          let productId = "all-access";
          let priceId = "";
          let quantity = 1;

          if (contentType.includes("application/json")) {
            const body = (await request.json()) as {
              email?: string;
              name?: string;
              productId?: string;
              priceId?: string;
              quantity?: number;
              items?: Array<{ productId: string; quantity: number; priceId?: string }>;
            };
            email = body.email ?? "";
            name = body.name ?? "";
            productId = body.productId ?? productId;
            priceId = body.priceId ?? "";
            quantity = body.quantity ?? 1;
            const items = body.items?.length
              ? body.items
              : [{ productId, quantity, priceId: priceId || undefined }];
            const session = await createStripeCheckout({ items, email, name, origin });
            return Response.json(session);
          }

          const form = await request.formData();
          email = String(form.get("email") ?? "");
          name = String(form.get("name") ?? "");
          productId = String(form.get("productId") ?? "all-access");
          priceId = String(form.get("priceId") ?? "");
          quantity = Number(form.get("quantity") ?? 1) || 1;
          const session = await createStripeCheckout({
            items: [{ productId, quantity, priceId: priceId || undefined }],
            email,
            name,
            origin,
          });
          if (!session.url) throw new Error("Stripe did not return a checkout URL");
          return Response.redirect(session.url, 303);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Checkout failed";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
