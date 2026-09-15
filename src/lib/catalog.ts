export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  unitAmountCents: number;
  stripePriceId: string;
  addon: boolean;
  active: boolean;
  sortOrder: number;
};

export const SEED_PRODUCTS: CatalogProduct[] = [
  {
    id: "all-access",
    name: "All Access",
    description:
      "Every workflow, 13-lesson course, toolkit, and lifetime updates. One payment. Files emailed within 24 hours.",
    unitAmountCents: 5990,
    stripePriceId: "",
    addon: false,
    active: true,
    sortOrder: 0,
  },
  {
    id: "instagram",
    name: "Help building the Instagram",
    description: "Optional add-on after All Access. Not sold on its own.",
    unitAmountCents: 8900,
    stripePriceId: "",
    addon: true,
    active: true,
    sortOrder: 1,
  },
];

export type SitePost = {
  id: string;
  title: string;
  body: string;
  url: string;
  kind: "discord" | "group" | "news" | "link";
  published: boolean;
};

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return slug || `item-${Date.now().toString(36)}`;
}
