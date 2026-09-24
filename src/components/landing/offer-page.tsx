import { useState } from "react";
import { Link } from "@tanstack/react-router";

const PRICE = "$9.99";
const IG = "https://instagram.com/oxlisvoid";

const CLIPS = [
  { src: "/media/v-studio.mp4", poster: "/media/p-studio.jpg" },
  { src: "/media/v-night.mp4", poster: "/media/p-night.jpg" },
  { src: "/media/v-cafe.mp4", poster: "/media/p-cafe.jpg" },
  { src: "/media/v-beach.mp4", poster: "/media/p-beach.jpg" },
  { src: "/media/ex-selfie.mp4", poster: "/media/ex-selfie.jpg" },
  { src: "/media/ex-motion.mp4", poster: "/media/ex-motion.jpg" },
];

function Buy({ label, full = false }: { label: string; full?: boolean }) {
  return (
    <Link
      to="/checkout"
      className={`inline-flex items-center justify-center rounded-full bg-[#d6ff4a] font-semibold text-black transition hover:bg-[#e7ff8a] ${full ? "h-14 w-full text-base" : "h-12 px-6 text-sm"}`}
    >
      {label}
    </Link>
  );
}

function Phone({
  src,
  poster,
  tall = false,
}: {
  src: string;
  poster: string;
  tall?: boolean;
}) {
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      className={`w-full object-cover ${tall ? "aspect-[9/16]" : "aspect-[3/4]"}`}
    />
  );
}

function Whale({
  name,
  initials,
  total,
  since,
  last,
  lastMeta,
  ppv,
  ppvAvg,
  tips,
  tipsAvg,
  high,
  highMeta,
  days,
}: {
  name: string;
  initials: string;
  total: string;
  since: string;
  last: string;
  lastMeta: string;
  ppv: string;
  ppvAvg: string;
  tips: string;
  tipsAvg: string;
  high: string;
  highMeta: string;
  days: string;
}) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-[#121316] p-4 text-white">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-zinc-700 text-xs font-semibold">{initials}</div>
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-white/40">Fan on a student page</p>
        </div>
        <span className="ml-auto rounded-full bg-white/10 px-2 py-1 text-[10px] tracking-wide uppercase">Subscriber</span>
      </div>
      <p className="mt-4 text-lg font-semibold">Spending behavior</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-white/10 p-3">
          <p className="text-[11px] text-white/45">Total spent</p>
          <p className="mt-1 text-2xl font-semibold">{total}</p>
          <p className="text-[11px] text-white/40">{since}</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-3">
          <p className="text-[11px] text-white/45">Last spend</p>
          <p className="mt-1 text-2xl font-semibold">{last}</p>
          <p className="text-[11px] text-white/40">{lastMeta}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between"><dt className="text-white/55">Paid posts</dt><dd className="text-right font-medium">{ppv}<span className="block text-[11px] font-normal text-white/40">{ppvAvg} average</span></dd></div>
        <div className="flex justify-between"><dt className="text-white/55">Tips</dt><dd className="text-right font-medium">{tips}<span className="block text-[11px] font-normal text-white/40">{tipsAvg} average</span></dd></div>
        <div className="flex justify-between"><dt className="text-white/55">Highest purchase</dt><dd className="text-right font-medium">{high}<span className="block text-[11px] font-normal text-white/40">{highMeta}</span></dd></div>
      </dl>
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 px-3 py-3 text-sm">
        <span className="text-white/55">Subscription</span>
        <span>$40.00/mo · {days} · <span className="text-[#7dffb3]">renews</span></span>
      </div>
    </article>
  );
}

const NOTES = [
  {
    who: "Andrés",
    when: "Day he bought",
    text: "I bought the course today. It's the best investment I've made. Super easy to understand. This is only day one. In a month I'll write you the results.",
  },
  {
    who: "Buyer",
    when: "After launch",
    text: "I've almost reached 1,000 followers with my AI girl, built from what you showed me. One of them already asked for more of her.",
  },
  {
    who: "Student",
    when: "Reels",
    text: "Almost all my reels are going viral. I just uploaded one and it's only up from here. I'm following the launch steps.",
  },
  {
    who: "Buyer",
    when: "Week 1",
    text: "My new model already beat my old one in a week, and I'm barely pushing. I'm running out of credits on the other tool.",
  },
  {
    who: "New account",
    when: "May 19",
    text: "I already have 2,000 followers on the new account. Facebook is around 2,300. Earnings on the page: $135.84 all time, $130.84 this month.",
  },
  {
    who: "Restart",
    when: "After feedback",
    text: "I started again. New girl, new lighting, posts modeled on what is actually getting watched. The old reels were pretty and dead.",
  },
];

const FAQ = [
  ["What do I get for $9.99?", "The character system, image and video workflows, 13 lessons, TikTok and Instagram playbooks, and the fan-page setup. Emailed within 24 hours after Stripe clears."],
  ["Can I post her on TikTok and Instagram?", "Yes. That is the distribution half of the system. Same character, native posts, a cadence, and a link."],
  ["Do I have to design the character from zero?", "No. You can lock a finished look on day one, or build your own. Either way the face stays consistent."],
  ["Is this a subscription?", "No. $9.99 once. Updates stay included."],
  ["Do I show my face?", "No. The character is on camera. You are not."],
  ["Why are people quitting credit tools?", "A buyer wrote that the model was working and the credits were already gone. This pack is a one-time file, not a meter."],
  ["When do files arrive?", "Within 24 hours of payment. Check spam for oxlisvoid1@gmail.com."],
];

export function OfferPage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-[#07080b] text-[#f4f1ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <p className="text-sm tracking-[0.28em]">OXLISVOID</p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#proof" className="hidden text-white/50 sm:inline">Proof</a>
            <a href="#inside" className="hidden text-white/50 sm:inline">Inside</a>
            <a href={IG} target="_blank" rel="noreferrer" className="hidden text-white/50 md:inline">@oxlisvoid</a>
            <Buy label={`Get it · ${PRICE}`} />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-4 pt-12 pb-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
        <div>
          <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">TikTok · Instagram · fan page · one payment</p>
          <h1 className="mt-4 text-[46px] leading-[0.9] font-semibold tracking-[-0.04em] sm:text-7xl">
            Post a character.<br />Get paid for it.<br />Stay off camera.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            OxlisVoid is the file we use to lock one AI character, put her on social, and open a page fans can pay. Not a credit subscription. Not your face.
          </p>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-sm text-white/40 line-through">$97</p>
              <p className="text-6xl font-semibold tracking-tight">{PRICE}</p>
              <p className="text-sm text-white/50">once · about 33¢ a day for 30 days</p>
            </div>
            <Buy label="Continue to checkout" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CLIPS.slice(0, 3).map((c) => (
            <div key={c.src} className="overflow-hidden rounded-[24px] border border-white/10">
              <Phone src={c.src} poster={c.poster} tall />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 px-0 sm:grid-cols-4 mx-4 mb-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
        {[
          ["$2,456", "top fan, one page"],
          ["$1,890", "second fan, same model"],
          ["2,000", "followers, new account"],
          ["33¢", "per day, first month"],
        ].map(([n, l]) => (
          <div key={l} className="bg-[#07080b] px-5 py-6">
            <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{n}</p>
            <p className="mt-1 text-sm text-white/45">{l}</p>
          </div>
        ))}
      </section>

      <section id="proof" className="mx-auto max-w-6xl px-4 py-8">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">Why people pay</p>
          <h2 className="mt-3 text-4xl leading-none font-semibold tracking-tight sm:text-6xl">The receipt is a fan, not a like.</h2>
          <p className="mt-4 text-white/60">
            These are screens buyers sent. A follower is not the business. A person who subscribes, tips, and buys posts is the business. Results vary. This is not a promise of your number.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Whale
            name="Whale"
            initials="AE"
            total="$2,456.27"
            since="Since May 2026"
            last="2h"
            lastMeta="Paid post · $74.99"
            ppv="$1,876.27"
            ppvAvg="$62.54"
            tips="$540.00"
            tipsAvg="$67.50"
            high="$299.99"
            highMeta="Post · May 27, 2026"
            days="3 days in"
          />
          <Whale
            name="White Knight"
            initials="WK"
            total="$1,890.58"
            since="Since May 2026"
            last="5h"
            lastMeta="Tip · $75.00"
            ppv="$1,345.58"
            ppvAvg="$44.85"
            tips="$505.00"
            tipsAvg="$50.50"
            high="$224.99"
            highMeta="Post · May 31, 2026"
            days="16 days in"
          />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-[28px] border border-white/10 bg-[#121316] p-5">
            <p className="text-xs text-white/40">Earnings screen · May 19</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-black p-4">
                <p className="text-[11px] text-white/40">All time</p>
                <p className="mt-2 text-3xl font-semibold text-[#7dffb3]">$135.84</p>
              </div>
              <div className="rounded-2xl bg-black p-4">
                <p className="text-[11px] text-white/40">This month</p>
                <p className="mt-2 text-3xl font-semibold">$130.84</p>
                <p className="text-[11px] text-white/40">May 2026</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">“I already have 2000 followers on the new account. Facebook is around 2300.”</p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {NOTES.map((n) => (
              <blockquote key={n.text} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-[11px] tracking-wide text-[#d6ff4a] uppercase">{n.who} · {n.when}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{n.text}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Three jobs. One character.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            ["01", "Make her once", "Face, body, outfits. A finished look you can start from, or one you build. The next thousand posts still look like her."],
            ["02", "Put her where people scroll", "TikTok, Reels, Instagram. Hooks and a posting rhythm copied from what is already being watched."],
            ["03", "Open the page that charges", "Subscription, tips, paid posts. The bio stops being a dead end."],
          ].map(([n, t, d]) => (
            <article key={n} className="rounded-[28px] bg-[#101114] p-6">
              <p className="text-xs text-white/35">{n}</p>
              <h3 className="mt-6 text-2xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">The math</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">$9.99 is not the price. 33 cents is.</h2>
            <p className="mt-4 text-white/60">Split across the first 30 days, the whole system is thirty-three cents a day. A credit generator eats that on a single render. One buyer said the model was working and the credits were already gone.</p>
          </div>
          <ul className="space-y-3">
            {[
              ["Credit apps", "Pay again every time she needs a new scene."],
              ["Random tutorials", "A new face every video. No order. No page."],
              ["OxlisVoid", "One charge. Character, posts, and the page that charges."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl border border-white/10 px-4 py-4">
                <p className="font-medium">{t}</p>
                <p className="mt-1 text-sm text-white/50">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="inside" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight">What is in the file</h2>
          <p className="max-w-sm text-sm text-white/45">Demos on this page are samples. The working pack arrives by email.</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ["Finished-look path", "Start from a locked character instead of a blank prompt."],
            ["Build-your-own path", "Face, body, wardrobe, if you want her to be yours."],
            ["Stills that match", "Same girl in a new scene, not a cousin of the girl."],
            ["Clips", "Motion without swapping her identity."],
            ["TikTok + Reels", "What to post first, and what to repeat when one hits."],
            ["Instagram", "Grid, stories, and the link that leaves the app."],
            ["Fan page", "Price, welcome, paid posts, tips."],
            ["Fixes", "Skin, inpaint, swap. Repair a frame. Do not rebuild her."],
          ].map(([t, d]) => (
            <article key={t} className="rounded-3xl border border-white/10 p-5">
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-white/55">{d}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CLIPS.map((c) => (
            <div key={c.src} className="w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              <Phone src={c.src} poster={c.poster} tall />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-4xl font-semibold tracking-tight">21 days, written as a calendar</h2>
        <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1", "Watch the model of the business."],
            ["2", "Open the account so it survives week one."],
            ["3", "Collect posts that already work."],
            ["4–5", "Lock the character."],
            ["6", "Fill the grid."],
            ["7", "Publish the first clips."],
            ["8–15", "Repeat only what gets watched."],
            ["16–21", "Turn on the page that charges."],
          ].map(([d, t]) => (
            <li key={d} className="rounded-2xl bg-white text-black p-4">
              <p className="text-xs font-semibold tracking-wide uppercase">Day {d}</p>
              <p className="mt-2 text-lg leading-snug font-medium">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="buy" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid overflow-hidden rounded-[32px] bg-[#d6ff4a] text-black lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase">Launch price</p>
            <p className="mt-3 text-7xl font-semibold tracking-tight">{PRICE}</p>
            <p className="mt-1 text-black/60">Was $97. One Stripe payment. Not a trial.</p>
            <ul className="mt-8 space-y-2 text-sm">
              {[
                ["Character system", "$67"],
                ["Workflows", "$197"],
                ["Lessons", "$67"],
                ["Social playbooks", "$47"],
                ["Fan-page setup", "$57"],
              ].map(([n, v]) => (
                <li key={n} className="flex justify-between border-b border-black/15 py-2">
                  <span>{n}</span><span className="line-through opacity-50">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-xs">
              <Link to="/checkout" className="flex h-14 items-center justify-center rounded-full bg-black text-base font-semibold text-white">
                Continue to checkout
              </Link>
            </div>
            <p className="mt-4 text-xs text-black/50">Digital delivery within 24 hours. After the files are sent, the sale is final.</p>
          </div>
          <div className="relative min-h-[360px] bg-black">
            <video src="/media/v-studio.mp4" poster="/media/p-studio.jpg" autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-4xl font-semibold tracking-tight">Before you close the tab</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {FAQ.map(([q, a], i) => (
            <button key={q} type="button" onClick={() => setOpen(open === i ? -1 : i)} className="block w-full py-4 text-left">
              <span className="flex justify-between gap-4 font-medium">{q}<span className="text-white/35">{open === i ? "–" : "+"}</span></span>
              {open === i ? <span className="mt-2 block text-sm leading-relaxed text-white/55">{a}</span> : null}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <Buy label={`Get OxlisVoid · ${PRICE}`} />
        </div>
        <p className="mt-8 text-xs text-white/35">
          OxlisVoid · oxlisvoid1@gmail.com · <a className="underline" href={IG}>Instagram</a> · <Link to="/legal" className="underline">Legal</Link>
        </p>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07080b]/95 p-3 backdrop-blur sm:hidden">
        <Buy full label={`Get access · ${PRICE}`} />
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
