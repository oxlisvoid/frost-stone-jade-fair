import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LoopVideo } from "@/components/loop-video";
import { Button } from "@/components/ui/button";
import { LEARN, OFFER, SITE } from "@/lib/site";

const HERO_CLIPS = [
  { src: "/media/v-cafe.mp4", poster: "/media/p-cafe.jpg", label: "Cafe character" },
  { src: "/media/v-studio.mp4", poster: "/media/p-studio.jpg", label: "Studio character" },
  { src: "/media/v-rooftop.mp4", poster: "/media/p-rooftop.jpg", label: "Rooftop character" },
  { src: "/media/v-beach.mp4", poster: "/media/p-beach.jpg", label: "Coastal character" },
] as const;

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
      <div>
        <p className="mb-3 text-sm font-medium text-accent">Standing price · not a timer</p>
        <h1 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          All the tools. {OFFER.priceLabel}. Yours.
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          Run AI influencers with the full OxlisVoid stack — image, video, motion, LoRA, course —
          without stacking $97 / $235 / $500 kits. One payment. No subscription.
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
              <span className="text-paper/70">· {OFFER.priceLabel}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/course">Watch the course demo</Link>
          </Button>
        </div>

        <p className="mt-4 text-sm text-subtle">
          Was ${SITE.comparePrice} as Total Kit · Stripe checkout · no card stored here
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {HERO_CLIPS.map((clip, i) => (
          <div
            key={clip.src}
            className={`overflow-hidden rounded-xl bg-ink ${i % 2 === 1 ? "translate-y-4 sm:translate-y-6" : ""}`}
          >
            <LoopVideo src={clip.src} poster={clip.poster} className="aspect-3/4" label={clip.label} />
          </div>
        ))}
      </div>
    </section>
  );
}
