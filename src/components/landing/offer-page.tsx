import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQ, INCLUDED, LEARN, SITE } from "@/lib/site";

const PRICE = "$9.99";
const WAS = "$97";

function Buy({ className = "" }: { className?: string }) {
  return (
    <Button asChild size="lg" className={className}>
      <Link to="/checkout">Get access now for just {PRICE}</Link>
    </Button>
  );
}

export function OfferPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-bg">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <p className="mb-3 text-sm font-medium text-accent">OXLISVOID · Instagram {SITE.instagramHandle}</p>
          <h1 className="text-4xl leading-[1.06] tracking-tight sm:text-5xl lg:text-[56px]">
            The step-by-step system to generate income with AI models — without showing your face.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Create the girl. Post the clips. Turn views into buyers. One payment. The pack hits your inbox within 24 hours.
          </p>
          <ul className="mt-6 space-y-2">
            {LEARN.slice(0, 4).map((item) => (
              <li key={item} className="flex gap-2.5 text-[15px]">
                <Check className="mt-0.5 size-4 shrink-0 text-good" strokeWidth={2.2} />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Buy />
            <p className="text-sm text-subtle">
              <span className="mr-2 line-through">{WAS}</span>
              <span className="font-medium text-fg">{PRICE}</span> · one-time · no subscription
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-ink shadow-(--shadow-lift)">
          <div className="relative aspect-9/16 max-h-[640px] w-full bg-ink sm:aspect-3/4">
            <video
              className="h-full w-full object-cover"
              src="/media/v-studio.mp4"
              poster="/media/p-studio.jpg"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-linear-to-t from-ink/80 to-transparent p-4 text-sm text-paper">
              <Play className="size-4" />
              Demo look · full system after checkout
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { n: "01", t: "Creation", d: "Face, body, DNA. A girl the camera stays in love with." },
            { n: "02", t: "Going viral", d: "Hooks, posting math, and clips people actually watch." },
            { n: "03", t: "Monetization", d: "Bio, link, fan page, private packs. Views become money." },
          ].map((step) => (
            <div key={step.n} className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
              <p className="text-xs font-semibold tracking-wide text-subtle uppercase">{step.n}</p>
              <h2 className="mt-2 text-2xl tracking-tight">{step.t}</h2>
              <p className="mt-2 text-sm text-muted">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-accent">01 · Creation</p>
        <h2 className="mt-2 max-w-3xl text-3xl tracking-tight sm:text-5xl">From zero to a model that holds identity.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Most people prompt once and hope. We fuse references until the same face shows up in a thousand scenes. That is the asset. Everything else is distribution.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { src: "/media/v-cafe.mp4", poster: "/media/p-cafe.jpg", cap: "Lock the face" },
            { src: "/media/v-night.mp4", poster: "/media/p-night.jpg", cap: "Move the body" },
            { src: "/media/v-beach.mp4", poster: "/media/p-beach.jpg", cap: "Keep her consistent" },
          ].map((clip) => (
            <figure key={clip.cap} className="overflow-hidden rounded-2xl bg-ink">
              <video className="aspect-3/4 w-full object-cover" src={clip.src} poster={clip.poster} muted loop autoPlay playsInline />
              <figcaption className="px-3 py-2 text-sm text-paper/80">{clip.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-accent">02 · Going viral</p>
        <h2 className="mt-2 max-w-3xl text-3xl tracking-tight sm:text-5xl">Pretty models do not sell. Traffic does.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          You can have a spectacular character. If nobody sees her, you do not sell. The playbooks cover hooks, cadence, and the cheap stack to remake what is already working.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { t: "Train the algorithm", d: "Turn For You into a feed of winning formats and models you can copy." },
            { t: "Replicate what works", d: "Same structure, your character, lowest generation cost." },
            { t: "Post on a system", d: "Not vibes. A schedule that turns every reel into a bet with odds." },
          ].map((card) => (
            <div key={card.t} className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
              <h3 className="text-xl">{card.t}</h3>
              <p className="mt-2 text-sm text-muted">{card.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-medium text-accent">03 · Monetization</p>
        <h2 className="mt-2 max-w-3xl text-3xl tracking-tight sm:text-5xl">Views are useless until the page converts.</h2>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            { n: "01", t: "A profile that converts", d: "Bio, highlights, and feed built to turn visits into follows." },
            { n: "02", t: "Your link, intact", d: "Place the offer without lighting the account on fire." },
            { n: "03", t: "Fan platform", d: "Pricing, tiers, and a welcome flow that sells while you sleep." },
            { n: "04", t: "Premium packs", d: "Private sets people pay for more than once." },
          ].map((item) => (
            <li key={item.n} className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
              <p className="text-xs text-subtle">{item.n}</p>
              <h3 className="mt-1 text-xl">{item.t}</h3>
              <p className="mt-2 text-sm text-muted">{item.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="pricing">
        <p className="text-sm font-medium text-accent">Your investment</p>
        <h2 className="mt-2 text-3xl tracking-tight sm:text-5xl">Get in today for {PRICE}.</h2>
        <p className="mt-3 max-w-xl text-muted">One-time. No subscription. Stripe checkout you already have — this page only sends people there.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl bg-ink p-6 text-paper shadow-(--shadow-lift) sm:p-8">
            <p className="text-sm text-paper/60">OxlisVoid System · lifetime</p>
            <p className="mt-2 font-display text-6xl tracking-tight">{PRICE}</p>
            <p className="mt-1 text-sm text-paper/55">
              <span className="line-through">{WAS}</span> · one payment
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
              <Link to="/checkout">Pay {PRICE} — go to Stripe</Link>
            </Button>
            <p className="mt-3 text-xs text-paper/50">Digital goods emailed within 24 hours. After delivery the sale is final.</p>
          </div>

          <div className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
            <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Inside the pack</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Character DNA + multi-reference workflow</li>
              <li>Image, video, motion, skin, swap, inpaint</li>
              <li>13 lessons + TikTok / Instagram SOPs</li>
              <li>Fan-page pricing and welcome flow</li>
              <li>Lifetime updates. Instagram {SITE.instagramHandle}</li>
            </ul>
            <a
              className="mt-6 inline-block text-sm font-medium underline underline-offset-4"
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Follow {SITE.instagramHandle}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl tracking-tight sm:text-5xl">People using the workflows</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            { q: "Shipped my first consistent character in a weekend. The identity lock is the missing piece every YouTube tutorial skips.", w: "Mara K." },
            { q: "Was bouncing between random workflows for months. Faces finally stay the same.", w: "julian.creates" },
            { q: "Clients stopped asking if it was AI. Booking work off a fictional creator now.", w: "nova.studio" },
            { q: "Beginner, MacBook, no GPU. Followed the cloud setup and generated the carousel the same night.", w: "Priya S." },
          ].map((row) => (
            <blockquote key={row.w} className="rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
              <p className="text-[15px] leading-relaxed">“{row.q}”</p>
              <footer className="mt-3 text-sm text-subtle">{row.w}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl tracking-tight">FAQ</h2>
        <div className="mt-6 divide-y divide-line rounded-3xl bg-surface shadow-(--shadow-card)">
          {FAQ.map((item, i) => (
            <button
              key={item.q}
              type="button"
              className="block w-full px-5 py-4 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="flex items-center justify-between gap-4 text-sm font-medium">
                {item.q}
                <span className="text-subtle">{open === i ? "−" : "+"}</span>
              </span>
              {open === i ? <p className="mt-2 text-sm text-muted">{item.a}</p> : null}
            </button>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Buy />
          <p className="mt-3 text-sm text-subtle">You are 24 hours from the files in your inbox.</p>
        </div>
      </section>
    </main>
  );
}
