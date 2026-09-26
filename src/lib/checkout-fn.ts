import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.string().min(1).max(80),
  quantity: z.number().int().min(1).max(20),
  priceId: z.string().min(3).max(80).optional(),
});

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator(
    z.object({
      items: z.array(itemSchema).min(1).max(10),
      email: z.string().email().max(200).optional(),
      name: z.string().max(120).optional(),
      origin: z.string().url().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { createStripeCheckout } = await import("./stripe-sdk.server");
    return createStripeCheckout(data);
  });

export const loadCheckoutSession = createServerFn({ method: "GET" })
  .validator(z.object({ sessionId: z.string().min(8).max(200) }))
  .handler(async ({ data }) => {
    const { retrieveCheckoutSession } = await import("./stripe-sdk.server");
    return retrieveCheckoutSession(data.sessionId);
  });

export const loadOrders = createServerFn({ method: "GET" }).handler(async () => {
  const { loadPaidOrders } = await import("./stripe-webhooks.server");
  return loadPaidOrders();
});
