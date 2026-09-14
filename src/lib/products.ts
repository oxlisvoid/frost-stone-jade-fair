/** Catalog shown on the site. Stripe Price IDs live in env — never in this file. */
export type CatalogProduct = {
  id: string;
  name: string;
  priceLabel: string;
  description: string;
  /** Server reads process.env[envPriceKey] for the Stripe Price id. */
  envPriceKey: string;
  defaultQuantity: number;
  maxQuantity: number;
  addon?: boolean;
};

export const PRODUCTS: CatalogProduct[] = [
  {
    id: "all-access",
    name: "All Access",
    priceLabel: "$129.90",
    description:
      "Every workflow, 13-lesson course, toolkit, and lifetime tool updates. One payment.",
    envPriceKey: "STRIPE_PRICE_ALL_ACCESS",
    defaultQuantity: 1,
    maxQuantity: 5,
  },
  {
    id: "instagram",
    name: "Help building the Instagram",
    priceLabel: "$89",
    description: "Optional add-on after All Access. Not sold on its own in the funnel.",
    envPriceKey: "STRIPE_PRICE_INSTAGRAM",
    defaultQuantity: 1,
    maxQuantity: 3,
    addon: true,
  },
];

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
