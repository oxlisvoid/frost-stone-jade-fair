import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { FitImage } from "@/components/fit-image";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/content";
import { ADDON, INCLUDED, KITS } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function Pricing() {
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-medium text-accent">All Access</p>
      <h2 className="mt-2 text-3xl tracking-tight sm:text-5xl">{content.headline}</h2>
      <p className="mt-3 max-w-2xl text-muted">
        {content.sells} The old kit ladder is included — you do not pick a smaller pack anymore.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-ink p-6 text-paper shadow-(--shadow-lift) sm:p-8">
          <p className="text-sm text-paper/60">One-time · Stripe</p>
          <p className="mt-2 font-display text-5xl tracking-tight">{price}</p>
          <p className="mt-1 text-sm text-paper/55 line-through">
            Mentorship {formatUsd(content.comparePriceCents)}
          </p>
          <ul className="mt-6 space-y-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-paper/85">
                <Check className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" variant="accent" className="mt-8 w-full sm:w-auto">
            <Link to="/checkout">Pay {price} with Stripe</Link>
          </Button>
          <p className="mt-3 text-xs text-paper/50">
            Digital goods. The real toolkit is emailed within 24 hours. After delivery the sale is final.
          </p>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">What this replaces</p>
          <ul className="mt-4 divide-y divide-line">
            {KITS.map((kit) => (
              <li key={kit.id} className="flex items-baseline justify-between gap-3 py-3 text-sm">
                <span className="text-muted">{kit.name}</span>
                <span className="tabular-nums text-subtle line-through">${kit.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            {ADDON.name} remains +${ADDON.price} after All Access — {ADDON.rule.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {content.portraits.map((shot) => (
          <div key={shot.src} className="rounded-xl bg-paper p-1.5 shadow-(--shadow-card)">
            <FitImage src={shot.src} alt={shot.alt} className="rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}
