import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/webhooks")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { handleStripeWebhook } = await import("@/lib/stripe-webhooks.server");
          const raw = await request.text();
          const signature = request.headers.get("stripe-signature");
          const result = await handleStripeWebhook(raw, signature);
          return Response.json(result);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Webhook Error";
          return Response.json({ message: `Webhook Error: ${message}` }, { status: 400 });
        }
      },
    },
  },
});
