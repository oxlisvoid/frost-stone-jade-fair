export type HeroClip = {
  src: string;
  poster: string;
  label: string;
};

export type GalleryShot = {
  src: string;
  alt: string;
};

export type ExampleShot = {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
};

export type SiteContent = {
  discordUrl: string;
  email: string;
  tagline: string;
  headline: string;
  sells: string;
  priceCents: number;
  comparePriceCents: number;
  heroClips: HeroClip[];
  portraits: GalleryShot[];
  examples: ExampleShot[];
};

export const DEFAULT_CONTENT: SiteContent = {
  discordUrl: "",
  email: "hello@oxlisvoid.com",
  tagline: "Own the stack. Run AI influencers without a monthly rent.",
  headline: "Every tool. One payment. No expiry on this price.",
  sells:
    "Create AI models you can post and sell with on TikTok, Instagram, and fan platforms. Demos on this site. The real pack is emailed within 24 hours of payment.",
  priceCents: 5990,
  comparePriceCents: 105000,
  heroClips: [
    { src: "/media/v-cafe.mp4", poster: "/media/p-cafe.jpg", label: "Cafe character" },
    { src: "/media/v-studio.mp4", poster: "/media/p-studio.jpg", label: "Studio character" },
    { src: "/media/v-rooftop.mp4", poster: "/media/p-rooftop.jpg", label: "Rooftop character" },
    { src: "/media/v-beach.mp4", poster: "/media/p-beach.jpg", label: "Coastal character" },
  ],
  portraits: [
    { src: "/media/models/park-dress.png", alt: "Park character generated with OxlisVoid" },
    { src: "/media/models/coast-gold.png", alt: "Coastal character generated with OxlisVoid" },
    { src: "/media/models/laptop-still.png", alt: "Laptop still generated with OxlisVoid" },
    { src: "/media/models/mirror-studio.png", alt: "Studio character generated with OxlisVoid" },
    { src: "/media/brand-pool.jpg", alt: "OxlisVoid pool still" },
  ],
  examples: [
    {
      kind: "image",
      src: "/media/models/park-dress.png",
      alt: "Park editorial still generated with OxlisVoid",
      caption: "Image Kit — consistent character stills",
    },
    {
      kind: "image",
      src: "/media/models/coast-gold.png",
      alt: "Coastal still generated with OxlisVoid",
      caption: "Ready-to-post look for product and fan pages",
    },
    {
      kind: "image",
      src: "/media/models/laptop-still.png",
      alt: "Photo-booth still generated with OxlisVoid",
      caption: "Native social frames, not stock AI",
    },
  ],
};

export function formatUsd(cents: number) {
  const amount = Math.max(0, Math.round(cents)) / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function mergeContent(raw: unknown): SiteContent {
  const data = (raw && typeof raw === "object" ? raw : {}) as Partial<SiteContent>;
  return {
    discordUrl: typeof data.discordUrl === "string" ? data.discordUrl : DEFAULT_CONTENT.discordUrl,
    email: typeof data.email === "string" && data.email.trim() ? data.email : DEFAULT_CONTENT.email,
    tagline: typeof data.tagline === "string" && data.tagline.trim() ? data.tagline : DEFAULT_CONTENT.tagline,
    headline:
      typeof data.headline === "string" && data.headline.trim() ? data.headline : DEFAULT_CONTENT.headline,
    sells: typeof data.sells === "string" && data.sells.trim() ? data.sells : DEFAULT_CONTENT.sells,
    priceCents:
      typeof data.priceCents === "number" && data.priceCents > 0
        ? Math.round(data.priceCents)
        : DEFAULT_CONTENT.priceCents,
    comparePriceCents:
      typeof data.comparePriceCents === "number" && data.comparePriceCents > 0
        ? Math.round(data.comparePriceCents)
        : DEFAULT_CONTENT.comparePriceCents,
    heroClips: padList(data.heroClips, DEFAULT_CONTENT.heroClips, 4),
    portraits: padList(data.portraits, DEFAULT_CONTENT.portraits, 5),
    examples: padList(data.examples, DEFAULT_CONTENT.examples, 3),
  };
}

function padList<T>(value: T[] | undefined, fallback: T[], size: number): T[] {
  const next = Array.isArray(value) ? value : [];
  return fallback.map((item, i) => ({ ...item, ...(next[i] ?? {}) })).slice(0, size);
}
