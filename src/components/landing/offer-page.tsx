import { useState } from "react";
import { Link } from "@tanstack/react-router";

const PRICE = "$9.99";
const IG = "https://instagram.com/oxlisvoid";
const MAIL = "oxlisvoid1@gmail.com";

const CLIPS = [
  { src: "/media/ref-balcony.mp4", poster: "/media/ref-balcony.jpg" },
  { src: "/media/ref-car.mp4", poster: "/media/ref-car.jpg" },
  { src: "/media/ref-dress.mp4", poster: "/media/ref-dress.jpg" },
  { src: "/media/ref-lights.mp4", poster: "/media/ref-lights.jpg" },
  { src: "/media/ref-indoor.mp4", poster: "/media/ref-indoor.jpg" },
  { src: "/media/v-studio.mp4", poster: "/media/p-studio.jpg" },
];

const SHOTS = [
  ["/media/proof/fan-2456.webp", "Buyer screen"],
  ["/media/proof/fan-1890.webp", "Buyer screen"],
  ["/media/proof/reels.webp", "Reels a buyer posted"],
  ["/media/proof/andres.webp", "Message from Andrés"],
  ["/media/proof/week.webp", "Week one note"],
  ["/media/proof/email.webp", "Restart note"],
];

const PHASES = [
  ["01", "Lock the character", "Face, body, wardrobe. A look you can start from, or one you build. The next posts still look like her."],
  ["02", "Keep her consistent", "The same person across scenes. This is where most people quit, and where the method spends its time."],
  ["03", "Make the posts", "Photos and short video from the phone. The render is in the cloud. No graphics card."],
  ["04", "Get watched", "Hooks, covers, and a posting rhythm for TikTok and Instagram. No audience, no sales."],
  ["05", "Open a page that charges", "A profile people can pay. Subscription, tips, paid posts. The bio stops being a dead end."],
];

const INCLUDED = [
  "Lifetime access. This price is for a limited time.",
  "The full step-by-step system",
  "Character build, from zero or from a finished look",
  "Photo and video workflows",
  "TikTok and Instagram posting method",
  "The paid-page setup",
  "Monthly notes when the method changes",
  "An online call, plus email support",
  "Fifteen days of questions included",
  "Phone or desktop. Nothing to install locally.",
];

const VERSUS = [
  ["Format", "A numbered system. You always know the next step.", "A long PDF, or a pile of links."],
  ["Tools", "Current cloud tools. You do not buy a PC.", "Yesterday's apps, plus a GPU shopping list."],
  ["Audience", "How to get watched from zero.", "They skip traffic and jump to 'monetize'."],
  ["Posting", "A repeatable way to make the posts.", "Make it up every day."],
  ["After you pay", "Email us. We answer.", "The sale ends at checkout."],
];

const NOTES = [
  ["Andrés", "I bought it today. Easiest thing I have followed. This is day one."],
  ["Buyer", "Almost 1,000 followers on the character I built from the steps."],
  ["Student", "The new reels are moving. I am following the launch order, not guessing."],
  ["Buyer", "Week one, the new character already looks more consistent than the old one."],
  ["Restart", "New character, new light, posts shaped like what people actually watch."],
];

const FAQ = [
  ["Do I need to code, or already know AI?", "No. The steps assume you are starting cold. If you can use a phone, you can follow them."],
  ["Do I need a PC or a GPU?", "No. Start from your phone. The heavy render runs in the cloud."],
  ["What do I get for $9.99?", "Lifetime access to the system, the workflows, the posting method, and the paid-page setup. The price is lifetime for a limited time. The pack is emailed in under 8 hours after Stripe clears."],
  ["Is this a subscription?", "No. $9.99 once. The kit does not expire. This lifetime price will not stay up forever."],
  ["How fast do I get the files, and how fast do you reply?", "The pack is delivered in under 8 hours. You can write the team any time, including to book an online call. With the current volume of orders, replies take up to 2 days."],
  ["How long can I ask questions?", "Fifteen days after you buy are included, so you can clear every question on the kit. If you want ongoing accompaniment after that, contact us."],
  ["Can I buy a finished character later?", "Yes. After the kit, write us if you want a ready character, a monthly model update, a TikTok character, a product character, or a character for your brand."],
  ["Do I show my face?", "No. The character is on camera. You are not."],
  ["Do you promise I will get rich?", "No. Other pages promise millionaire months. We do not. People who follow the steps get a working character and a way to post and charge. How far that goes depends on you. It is not a promise of income."],
  ["How does the refund work?", "Access is lifetime. The 30 days are only the refund. Email oxlisvoid1@gmail.com within 30 days of payment, from the same address, with the Stripe receipt."],
];

function Buy({ label, full = false, dark = false }: { label: string; full?: boolean; dark?: boolean }) {
  return (
    <Link
      to="/checkout"
      className={`inline-flex items-center justify-center rounded-full font-semibold transition ${dark ? "bg-black text-[#d6ff4a] hover:bg-zinc-900" : "bg-[#d6ff4a] text-black hover:bg-[#e7ff8a]"} ${full ? "h-14 w-full text-base" : "h-12 px-6 text-sm"}`}
    >
      {label}
    </Link>
  );
}

function Phone({ src, poster, tall = false }: { src: string; poster: string; tall?: boolean }) {
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

export function OfferPage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-[#07080b] text-[#f4f1ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <p className="text-sm tracking-[0.28em]">OXLISVOID</p>
          <div className="flex items-center gap-5 text-sm">
            <a href="#system" className="hidden text-white/50 sm:inline">System</a>
            <a href="#price" className="hidden text-white/50 sm:inline">Price</a>
            <a href={IG} target="_blank" rel="noreferrer" className="hidden text-white/50 md:inline">@oxlisvoid</a>
            <Buy label={`Get access · ${PRICE}`} />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-end gap-10 px-4 pt-14 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">Lifetime access · limited-time price · phone only</p>
          <h1 className="mt-4 text-[44px] leading-[0.92] font-semibold tracking-[-0.045em] sm:text-7xl">
            Build an AI character.<br />Post her. Charge for it.<br />Stay off camera.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            A numbered method to create the character, get her watched, and open a page fans can pay. No coding. No PC. No graphics card.
          </p>
          <div className="mt-8 flex flex-wrap items-end gap-6">
            <div>
              <p className="text-sm text-white/40 line-through">$97</p>
              <p className="text-6xl font-semibold tracking-tight">{PRICE}</p>
              <p className="text-sm text-white/55">about ten dollars · once · lifetime access</p>
            </div>
            <Buy label="Get access now" />
          </div>
          <p className="mt-4 max-w-md text-sm text-white/45">The files arrive by email in under 8 hours. The 30 days you will see below are only the refund window, not how long the kit lasts.</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CLIPS.slice(0, 3).map((c) => (
            <div key={c.src} className="overflow-hidden rounded-[24px] border border-white/10">
              <Phone src={c.src} poster={c.poster} tall />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-[#101114] p-6 md:grid-cols-3 md:p-8">
          <div>
            <p className="text-xs tracking-[0.18em] text-white/40 uppercase">What we will not say</p>
            <p className="mt-3 text-2xl font-semibold leading-tight">We do not promise millionaire income.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">Other sites do. A number on a banner is not a plan, and it is not your result.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-[#d6ff4a] uppercase">What we do stand behind</p>
            <p className="mt-3 text-2xl font-semibold leading-tight">A result you can finish.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">Follow the steps and you come out with one consistent character, posts, and a page that can charge. From your phone.</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.18em] text-white/40 uppercase">What it costs to try</p>
            <p className="mt-3 text-2xl font-semibold leading-tight">Lifetime. This price is temporary.</p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">The kit does not expire in 30 days. You keep it. The lifetime price is up for a limited time.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-8">
        {CLIPS.map((c) => (
          <div key={c.src} className="w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10">
            <Phone src={c.src} poster={c.poster} />
          </div>
        ))}
      </div>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">The look</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Characters in this range.</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-white/45 sm:block">Made for the page. Not buyers. Not a result.</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            ["/media/gen/roof.mp4", "/media/gen/roof.jpg"],
            ["/media/gen/night.mp4", "/media/gen/night.jpg"],
            ["/media/gen/palm.mp4", "/media/gen/palm.jpg"],
          ].map(([src, poster]) => (
            <div key={src} className="overflow-hidden rounded-[24px] border border-white/10">
              <Phone src={src} poster={poster} tall />
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {["/media/gen/roof.jpg", "/media/gen/cafe.jpg", "/media/gen/night.jpg", "/media/gen/palm.jpg"].map((src) => (
            <img key={src} src={src} alt="Example character still" className="aspect-[2/3] w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">The hard part is not the work. It is the order.</h2>
          <p className="mt-4 text-lg text-white/65">Most people stall because they start in the wrong place. The system tells you what to do first, then next.</p>
        </div>
        <ul className="grid gap-3">
          {[
            ["Create her", "Plug-in steps for a face and a body that stay the same from post to post."],
            ["Get her seen", "The posting method for TikTok and Instagram. No audience means no sales."],
            ["Charge", "How the page, the offer, and the replies fit together."],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl border border-white/10 px-5 py-4">
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm text-white/55">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {["No experience required.", "No technical skill.", "No PC. No GPU. Your phone is enough."].map((t) => (
            <p key={t} className="rounded-full border border-white/10 px-4 py-3 text-center text-sm text-white/80">{t}</p>
          ))}
        </div>
      </section>

      <section id="system" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">The system</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">You always know the next move.</h2>
        <p className="mt-4 max-w-2xl text-white/60">This is not a folder of tips. Each phase ends when the character, the posts, or the page is actually done.</p>
        <div className="mt-8 grid gap-3">
          {PHASES.map(([n, t, d]) => (
            <article key={n} className="grid gap-2 rounded-[24px] border border-white/10 px-5 py-5 sm:grid-cols-[4rem_1fr] sm:items-center">
              <p className="text-sm text-white/35">{n}</p>
              <div>
                <h3 className="text-xl font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-white/55">{d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="price" className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">What you get today</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">One payment. The whole method.</h2>
          <ul className="mt-6 grid gap-2">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm">
                <span className="text-[#d6ff4a]">+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-[28px] bg-[#d6ff4a] p-6 text-black">
          <p className="text-sm line-through opacity-60">$97</p>
          <p className="text-6xl font-semibold tracking-tight">{PRICE}</p>
          <p className="mt-1 text-sm">Lifetime access. One payment. This price is for a limited time.</p>
          <div className="mt-6">
            <Buy label="Get access now" full dark />
          </div>
          <p className="mt-4 text-sm leading-relaxed">Files in under 8 hours. Fifteen days of questions included. The refund window is 30 days, and it does not limit how long you keep the kit.</p>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 lg:grid-cols-3">
          <article className="rounded-[28px] border border-white/10 p-6 lg:col-span-2">
            <p className="text-xs tracking-[0.18em] text-[#d6ff4a] uppercase">After you pay</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">The kit stays yours. The help has a window.</h2>
            <ul className="mt-5 grid gap-3 text-sm text-white/70">
              <li>The pack is emailed in under 8 hours. Check spam for {MAIL}.</li>
              <li>You can write any time, and you can book an online call with the team.</li>
              <li>Orders are high right now, so a reply can take up to 2 days. Delivery of the files is still under 8 hours.</li>
              <li>For 15 days after purchase, questions about the kit are included. Ask all of them in that window.</li>
              <li>Want someone to stay with you after those 15 days? Contact us and we will talk about accompaniment.</li>
            </ul>
          </article>
          <article className="rounded-[28px] bg-[#101114] p-6">
            <p className="text-xs tracking-[0.18em] text-white/40 uppercase">Also for sale</p>
            <h3 className="mt-3 text-2xl font-semibold">Characters, after the kit.</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li>A ready-made character</li>
              <li>Monthly character updates</li>
              <li>A character built for TikTok</li>
              <li>A character for a product</li>
              <li>A character for your brand</li>
            </ul>
            <p className="mt-4 text-sm text-white/50">Buy the kit first. Then write {MAIL} and tell us which one you want.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">What you need, next to the usual pitch.</h2>
        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10">
          <div className="grid grid-cols-[0.8fr_1.1fr_1.1fr] bg-white/5 px-4 py-3 text-xs tracking-wide text-white/45 uppercase">
            <span />
            <span>OxlisVoid</span>
            <span>Typical pack</span>
          </div>
          {VERSUS.map(([k, a, b]) => (
            <div key={k} className="grid grid-cols-[0.8fr_1.1fr_1.1fr] gap-2 border-t border-white/10 px-4 py-4 text-sm">
              <p className="text-white/45">{k}</p>
              <p>{a}</p>
              <p className="text-white/40">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Why about ten dollars?</h2>
          <div className="mt-6 space-y-4 text-white/70">
            <p><span className="text-white">1. The market is loud and expensive.</span> A lot of pages sell a dream number. We would rather you try the method than finance a promise.</p>
            <p><span className="text-white">2. Trust is the long game.</span> If {PRICE} is useful, you will know who to come back to. If it is not, you should not be stuck with it.</p>
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 p-6">
          <p className="text-6xl font-semibold tracking-tight">30</p>
          <p className="text-lg">days to ask for a refund. Not 30 days of access.</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Access is lifetime. The 30 days are only if you want the money back. Email {MAIL} with your Stripe receipt. We refund the order.
          </p>
          <p className="mt-4 text-sm text-white/45">Please actually try it. Income is not guaranteed. Results depend on what you post and how often.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.22em] text-[#d6ff4a] uppercase">From buyers</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Screens people sent. Not a promise.</h2>
          <p className="mt-3 text-white/55">These are messages and pages from people using the method. They are examples. They are not a typical result, and they are not your result.</p>
        </div>
        <div className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {SHOTS.map(([src, alt]) => (
            <figure key={src} className="mb-3 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white">
              <img src={src} alt={alt} className="w-full" />
            </figure>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NOTES.map(([who, text]) => (
            <blockquote key={text} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[11px] tracking-wide text-[#d6ff4a] uppercase">{who}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{text}</p>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-4xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button type="button" className="flex w-full items-center justify-between py-4 text-left" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="pr-4 font-medium">{q}</span>
                <span className="text-white/40">{open === i ? "–" : "+"}</span>
              </button>
              {open === i ? <p className="pb-4 text-sm leading-relaxed text-white/60">{a}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[32px] bg-[#d6ff4a] px-6 py-10 text-black sm:px-10">
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Lifetime kit. About ten dollars. For a limited time.</h2>
          <p className="mt-3 max-w-xl text-black/70">Files in under 8 hours. Fifteen days of questions. An online call if you need one. The character is not your face.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Buy label={`Get access now · ${PRICE}`} dark />
            <p className="text-sm">Was $97 · one payment</p>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 pt-4 pb-28 text-xs leading-relaxed text-white/40">
        <p>
          OxlisVoid is a digital product. The screens on this page are examples from buyers. They are not a guarantee of income and they are not a typical result. Individual results vary. We do not promise a specific amount of money.
        </p>
        <p className="mt-3">
          Not affiliated with TikTok, Instagram, Meta, or any other platform named here.
        </p>
        <p className="mt-3">
          OxlisVoid · {MAIL} · <a className="underline" href={IG}>Instagram</a> · <Link to="/legal" className="underline">Terms and refund</Link>
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07080b]/95 p-3 backdrop-blur sm:hidden">
        <Buy label={`Get access · ${PRICE}`} full />
      </div>
    </div>
  );
}
