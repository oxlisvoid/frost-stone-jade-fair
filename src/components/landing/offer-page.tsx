import { useState } from "react";
import { Link } from "@tanstack/react-router";

const PRICE = "$9.99";
const WAS = "$97";
const IG = "https://instagram.com/oxlisvoid";

const CLIPS = [
  { src: "/media/v-studio.mp4", poster: "/media/p-studio.jpg", label: "Studio" },
  { src: "/media/v-night.mp4", poster: "/media/p-night.jpg", label: "Night" },
  { src: "/media/v-cafe.mp4", poster: "/media/p-cafe.jpg", label: "Day" },
  { src: "/media/v-beach.mp4", poster: "/media/p-beach.jpg", label: "Coast" },
  { src: "/media/ex-selfie.mp4", poster: "/media/ex-selfie.jpg", label: "Selfie" },
  { src: "/media/ex-motion.mp4", poster: "/media/ex-motion.jpg", label: "Motion" },
];

const STACK = [
  ["Character lock system", "$67"],
  ["7 image + video workflows", "$197"],
  ["13 step-by-step lessons", "$67"],
  ["TikTok + Instagram playbooks", "$47"],
  ["Fan-page setup", "$57"],
  ["Prompt library + lifetime updates", "$27"],
];

const DAYS = [
  ["1", "See the model", "How the business actually works. No theory dump."],
  ["2", "Open the account", "Instagram set up so it does not die on day one."],
  ["3", "Steal the format", "Turn your feed into a list of posts that already work."],
  ["4–5", "Build her", "Face, body, outfits. One girl. Same girl every time."],
  ["6", "Fill the grid", "Posts that turn a visit into a follow."],
  ["7", "First clips", "Publish with the posting system, not a guess."],
  ["8–15", "Get seen", "Repeat the formats. This is where views show up."],
  ["16–21", "Get paid", "Fan page, prices, welcome message, first pack."],
];

const FAQ = [
  ["When do the files arrive?", "Stripe confirms the charge, then we email the real workflows, lessons, and playbooks within 24 hours. Check spam."],
  ["Is $9.99 a subscription?", "No. One payment. No monthly fee. Updates stay included."],
  ["Do I show my face?", "No. You build a character and post her. Your face stays off camera."],
  ["Do I need a strong PC?", "No. Most people run this on a cloud GPU. A Mac is enough to follow the lessons."],
  ["Do I need to code?", "No. You follow the steps. If you can upload a photo, you can run this."],
  ["Where does payment happen?", "On the Stripe checkout already connected to this site. Card data never hits this page."],
  ["Can I sell with the character?", "Yes. The playbooks cover TikTok, Instagram, and fan platforms."],
];

function Cta({
  children,
  big = false,
}: {
  children: string;
  big?: boolean;
}) {
  return (
    <Link
      to="/checkout"
      className={`inline-flex items-center justify-center rounded-full bg-[#f6c945] font-semibold text-black shadow-[0_0_40px_rgba(246,201,69,0.35)] transition hover:bg-[#ffd86a] ${big ? "h-14 px-8 text-base" : "h-12 px-6 text-sm"}`}
    >
      {children}
    </Link>
  );
}

function Clip({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

export function OfferPage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-black text-white">
      <style>{`@keyframes oxrun{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="text-sm font-semibold tracking-[0.22em]">
            OXLISVOID
          </a>
          <div className="flex items-center gap-4 text-sm">
            <a href={IG} target="_blank" rel="noreferrer" className="hidden text-white/60 sm:inline">
              @oxlisvoid
            </a>
            <Link to="/checkout" className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black">
              {PRICE}
            </Link>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(246,201,69,0.16),transparent_36%),radial-gradient(circle_at_10%_80%,rgba(255,60,120,0.18),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-[#f6c945] uppercase">
              AI models · no face · one payment
            </p>
            <h1 className="text-[42px] leading-[0.95] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Build the girl.
              <br />
              Post the girl.
              <br />
              <span className="text-[#f6c945]">Get paid.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              OxlisVoid is the system we use to create one consistent AI character, put her on Instagram and TikTok, and turn attention into sales. You never appear on camera.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta big>Get access — {PRICE}</Cta>
              <p className="text-sm text-white/50">
                <span className="mr-2 line-through">{WAS}</span>
                one time · not a subscription
              </p>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-center">
              {[
                ["24h", "files in your inbox"],
                ["0", "face on camera"],
                ["1", "payment. forever."],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3">
                  <p className="text-xl font-semibold">{n}</p>
                  <p className="mt-1 text-[11px] leading-tight text-white/50">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CLIPS.slice(0, 4).map((clip, i) => (
              <div
                key={clip.src}
                className={`overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 shadow-[0_20px_80px_rgba(0,0,0,0.45)] ${
                  i % 2 ? "translate-y-6" : ""
                }`}
              >
                <Clip src={clip.src} poster={clip.poster} className="aspect-[3/4] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-[#f6c945] text-black">
        <div className="flex w-max gap-10 py-3 text-sm font-semibold tracking-wide whitespace-nowrap" style={{ animation: "oxrun 22s linear infinite" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <p key={k} className="flex gap-10">
              <span>SAME FACE. EVERY POST.</span>
              <span>NO MONTHLY CREDITS.</span>
              <span>INSTAGRAM + TIKTOK.</span>
              <span>FAN PAGE READY.</span>
              <span>{PRICE} ONCE.</span>
              <span>@OXLISVOID</span>
            </p>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#f6c945] uppercase">The problem</p>
        <h2 className="mt-3 max-w-3xl text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
          Pretty pictures do not make money. A system does.
        </h2>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            ["01", "The face changes", "Every new prompt is a different person. Followers notice. Buyers do not stay."],
            ["02", "Nobody sees her", "A perfect character with zero distribution is a folder of files."],
            ["03", "There is no offer", "Views without a page, a price, and a link are just a hobby."],
          ].map(([n, t, d]) => (
            <article key={n} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs text-white/40">{n}</p>
              <h3 className="mt-3 text-2xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["01", "Create", "Face, body, outfits. One identity that survives a thousand scenes."],
            ["02", "Distribute", "Hooks, cadence, and the formats already getting watched."],
            ["03", "Collect", "Bio, link, fan page, private packs. Attention becomes a sale."],
          ].map(([n, t, d]) => (
            <article key={n} className="relative overflow-hidden rounded-3xl bg-zinc-950 p-6">
              <p className="text-6xl font-semibold text-white/10">{n}</p>
              <h3 className="-mt-6 text-3xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-white/60">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">She has to look real in motion. Not just in a still.</h2>
        </div>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4">
          {CLIPS.map((clip) => (
            <figure key={clip.label} className="w-[220px] shrink-0 overflow-hidden rounded-[28px] border border-white/10">
              <Clip src={clip.src} poster={clip.poster} className="aspect-[9/16] w-full object-cover" />
              <figcaption className="bg-zinc-950 px-3 py-2 text-xs text-white/50">{clip.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#f6c945] uppercase">Inside</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Everything required to launch. Nothing you have to hunt on YouTube.</h2>
          <p className="mt-4 text-white/60">The demos on this page are samples. After Stripe clears, the working pack is emailed.</p>
        </div>
        <ul className="divide-y divide-white/10 rounded-3xl border border-white/10">
          {[
            ["Identity lock", "Same face across photos, outfits, and clips."],
            ["Image workflows", "Stills that survive a social crop."],
            ["Video + motion", "She moves. The face stays."],
            ["Skin, swap, inpaint", "Fix the shot without rebuilding her."],
            ["Posting system", "What to post, how often, which hook."],
            ["Offer", "Page, price, welcome flow, private pack."],
          ].map(([t, d]) => (
            <li key={t} className="px-5 py-4">
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-white/50">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">21 days. Not a 40-hour course.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DAYS.map(([d, t, b]) => (
            <article key={d} className="rounded-3xl border border-white/10 p-5">
              <p className="text-xs text-[#f6c945]">Day {d}</p>
              <h3 className="mt-2 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-white/55">{b}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="buy" className="mx-auto max-w-6xl px-4 py-10">
        <div className="overflow-hidden rounded-[32px] border border-[#f6c945]/40 bg-[linear-gradient(180deg,#1a1406,#090909)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#f6c945] uppercase">Launch price</p>
              <div className="mt-4 flex items-end gap-4">
                <p className="text-7xl font-semibold tracking-tight">{PRICE}</p>
                <p className="mb-2 text-white/40 line-through">{WAS}</p>
              </div>
              <p className="mt-2 text-white/60">One payment. Stripe checkout. Files within 24 hours.</p>
              <ul className="mt-8 space-y-3">
                {STACK.map(([name, val]) => (
                  <li key={name} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm">
                    <span>{name}</span>
                    <span className="text-white/40 line-through">{val}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Cta big>Continue to checkout</Cta>
              </div>
              <p className="mt-4 text-xs text-white/40">Digital delivery. After the files are emailed, the sale is final.</p>
            </div>
            <div className="relative min-h-[420px]">
              <Clip
                src="/media/v-studio.mp4"
                poster="/media/p-studio.jpg"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <p className="absolute bottom-6 left-6 right-6 text-lg font-medium">This is a demo. The working system is what you pay for.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-4xl font-semibold tracking-tight">Why people quit the other way</h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          <div className="grid grid-cols-3 bg-white text-xs font-semibold tracking-wide text-black uppercase">
            <div className="p-4"> </div>
            <div className="p-4">OxlisVoid</div>
            <div className="p-4">Piecing it together</div>
          </div>
          {[
            ["Cost", "$9.99 once", "Credits every month"],
            ["Face", "Locked identity", "A new girl every prompt"],
            ["Lessons", "13 steps, in order", "Random videos"],
            ["Traffic", "Posting system", "Post and hope"],
            ["Money", "Page + offer", "No path to a sale"],
          ].map((row) => (
            <div key={row[0]} className="grid grid-cols-3 border-t border-white/10 text-sm">
              <div className="p-4 text-white/40">{row[0]}</div>
              <div className="bg-[#f6c945]/10 p-4">{row[1]}</div>
              <div className="p-4 text-white/45">{row[2]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-4xl font-semibold tracking-tight">From people running the workflows</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            ["The face finally stays the same. That was the whole problem.", "julian.creates"],
            ["MacBook, no GPU. Cloud setup, carousel the same night.", "Priya S."],
            ["First consistent character in a weekend. YouTube never got me there.", "Mara K."],
            ["Clients stopped asking if it was AI.", "nova.studio"],
          ].map(([q, w]) => (
            <blockquote key={w} className="rounded-3xl border border-white/10 p-6">
              <p className="text-lg leading-snug">“{q}”</p>
              <footer className="mt-4 text-sm text-white/40">{w}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-4xl font-semibold tracking-tight">Questions, then the button.</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {FAQ.map(([q, a], i) => (
            <button key={q} type="button" className="block w-full py-4 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="flex items-center justify-between gap-4 font-medium">
                {q}
                <span className="text-white/40">{open === i ? "–" : "+"}</span>
              </span>
              {open === i ? <p className="mt-2 text-sm leading-relaxed text-white/55">{a}</p> : null}
            </button>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-3">
          <Cta big>Get the system — {PRICE}</Cta>
          <a href={IG} target="_blank" rel="noreferrer" className="text-sm text-white/50 underline underline-offset-4">
            Instagram @oxlisvoid
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-white/35">
        OxlisVoid · oxlisvoid1@gmail.com · <Link to="/legal" className="underline">Legal</Link>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 p-3 backdrop-blur sm:hidden">
        <Link to="/checkout" className="flex h-12 items-center justify-center rounded-full bg-[#f6c945] text-sm font-semibold text-black">
          Get access · {PRICE}
        </Link>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
