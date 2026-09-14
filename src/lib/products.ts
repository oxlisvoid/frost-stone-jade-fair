/** Catalog shown on the site. Optional Stripe Price IDs live in env — never in this file. */
export type CatalogProduct = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  /** Amount charged when no Dashboard Price ID is set. */
  unitAmountCents: number;
  /** Server reads process.env[envPriceKey] for an optional Stripe Price id. */
  envPriceKey: string;
  defaultQuantity: number;
  maxQuantity: number;
  addon?: boolean;
};

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "all-access",
    name: "All Access",
    priceLabel: "$59.90",
    description:
      "Every workflow, 13-lesson course, toolkit, and lifetime tool updates. One payment.",
    unitAmountCents: 5990,
    envPriceKey: "STRIPE_PRICE_ALL_ACCESS",
    defaultQuantity: 1,
    maxQuantity: 5,
  },
  {
    id: "instagram",
    name: "Help building the Instagram",
    priceLabel: "$89",
    description: "Optional add-on after All Access. Not sold on its own in the funnel.",
    unitAmountCents: 8900,
    envPriceKey: "STRIPE_PRICE_INSTAGRAM",
    defaultQuantity: 1,
    maxQuantity: 3,
    addon: true,
  },
];

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
