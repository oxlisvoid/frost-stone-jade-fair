import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SmartMedia } from "@/components/smart-media";
import { Button } from "@/components/ui/button";
import { formatUsd } from "@/lib/content";
import { LEARN } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function Hero() {
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
      <div>
        <p className="mb-3 text-sm font-medium text-accent">Stop paying for credits and monthly subscriptions</p>
        <h1 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Own the tools. {price}. Forever.
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          No credit meters. No monthly AI rent. One payment for the full OxlisVoid stack — image,
          video, motion, LoRA, course — so you can run AI influencers and sell on TikTok, Instagram,
          and fan platforms. The pack is emailed within 24 hours. This site shows demos only.
        </p>

        <p className="mt-7 text-sm font-medium">You will learn how to:</p>
        <ul className="mt-3 space-y-2">
          {LEARN.map((item) => (
            <li key={item} className="flex gap-2.5 text-[15px] leading-snug">
              <Check className="mt-0.5 size-4 shrink-0 text-good" strokeWidth={2.2} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link to="/checkout">
              Get All Access
              <span className="text-paper/70">· {price}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/course">Read the course outline</Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-subtle">
          Was {formatUsd(content.comparePriceCents)} as Mentorship · Stripe checkout · tools emailed in 24h
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {content.heroClips.map((clip, i) => (
          <div
            key={`${clip.src}-${i}`}
            className={`overflow-hidden rounded-xl bg-ink ${i % 2 === 1 ? "translate-y-4 sm:translate-y-6" : ""}`}
          >
            <SmartMedia src={clip.src} poster={clip.poster} alt={clip.label} className="aspect-3/4" />
          </div>
        ))}
      </div>
    </section>
  );
}
