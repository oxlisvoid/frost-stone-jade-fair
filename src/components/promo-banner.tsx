import { Link } from "@tanstack/react-router";
import { formatUsd } from "@/lib/content";
import { useSiteContent } from "@/lib/site-content";

export function PromoBanner() {
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-center text-sm sm:flex-row sm:text-left sm:px-6">
        <p>
          <span className="font-medium">Standing offer.</span> All tools {price} — not a countdown. Was{" "}
          {formatUsd(content.comparePriceCents)}.
        </p>
        <Link to="/checkout" className="shrink-0 font-medium text-accent-fg underline-offset-4 hover:underline">
          Unlock All Access →
        </Link>
      </div>
    </div>
  );
}
