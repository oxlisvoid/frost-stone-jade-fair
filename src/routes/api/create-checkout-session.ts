import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/create-checkout-session")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            items?: Array<{ productId: string; quantity: number; priceId?: string }>;
            email?: string;
            name?: string;
          };
          const { createStripeCheckout } = await import("@/lib/stripe-sdk.server");
          const origin = new URL(request.url).origin;
          const session = await createStripeCheckout({
            items: body.items ?? [],
            email: body.email,
            name: body.name,
            origin,
          });
          return Response.json(session);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Checkout failed";
          return Response.json({ error: message }, { status: 400 });
        }
      },
    },
  },
});
