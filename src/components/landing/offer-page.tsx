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
];

const SHOTS = [
  ["/media/proof/fan-2456.webp", "Buyer screen"],
  ["/media/proof/fan-1890.webp", "Buyer screen"],
  ["/media/proof/reels.webp", "Reels a buyer posted"],
  ["/media/proof/andres.webp", "Message from Andrés"],
  ["/media/proof/week.webp", "Week one note"],
  ["/media/proof/email.webp", "Restart note"],
];

const STEPS = [
  ["01", "Build her", "Face, body, and the same look in every post. Start from zero."],
  ["02", "Put the product in her hand", "The first second sells the thing. Skincare, shoes, scent, coffee."],
  ["03", "Post where people already scroll", "TikTok and Instagram, from your phone. You stay off camera."],
  ["04", "Ask to get paid", "A page a brand can understand, and the line you send them."],
];

const FAQ = [
  ["Do I need experience?", "No. If you can use a phone, you can follow the steps."],
  ["Do I need a computer?", "No. You do not buy a PC or a GPU. The heavy part runs in the cloud."],
  ["What arrives after I pay?", "The whole kit, by email, in under 8 hours. One payment. It does not expire."],
  ["What if I do not make $500?", `Follow the steps. If you do not make $500 in the first week, email ${MAIL} with your Stripe receipt. We give the ${PRICE} back.`],
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

export function OfferPage() {
  const [open, setOpen] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-[#07080b] text-[#f4f1ea]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07080b]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <p className="text-sm tracking-[0.28em]">OXLISVOID</p>
          <Buy label={`Get access · ${PRICE}`} />
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <p className="mx-auto inline-flex rounded-full border border-[#d6ff4a]/40 bg-[#d6ff4a]/10 px-4 py-2 text-sm font-medium text-[#d6ff4a]">
          This price ends September 30
        </p>
        <h1 className="mt-5 text-5xl leading-[0.95] font-semibold tracking-[-0.045em] sm:text-7xl">
          Learn how to make your first <span className="text-[#d6ff4a]">$1,000</span>, even if you have zero experience.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-white/70">She is on camera. You are not. One kit. From your phone.</p>
        <p className="mt-6 text-5xl font-semibold tracking-tight">{PRICE}</p>
        <p className="mt-1 text-sm text-white/45">
          <span className="line-through">$97</span> · one payment · no subscription
        </p>
        <div className="mx-auto mt-5 max-w-md">
          <Buy label={`Get access now for just ${PRICE}`} full />
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
          Service guarantee. Follow the steps. If you do not make $500 in the first week, we give your money back.
        </p>

        <div className="mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-black">
          {playing ? (
            <video
              src="/media/hero-pitch.mp4"
              poster="/media/hero-pitch.jpg"
              autoPlay
              controls
              playsInline
              className="aspect-[720/1272] w-full bg-black object-contain"
            />
          ) : (
            <button type="button" className="relative block w-full" onClick={() => setPlaying(true)}>
              <img src="/media/hero-pitch.jpg" alt="Watch the demo" className="aspect-[720/1272] w-full bg-black object-contain" />
              <span className="absolute inset-0 bg-black/25" />
              <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#d6ff4a] text-3xl text-black">▶</span>
              <span className="absolute inset-x-0 bottom-5 text-sm font-semibold tracking-[0.18em]">TAP TO PLAY</span>
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-3xl font-semibold tracking-tight">You get four steps. Then you post.</h2>
        <div className="mt-6 grid gap-3">
          {STEPS.map(([n, title, line]) => (
            <article key={n} className="rounded-2xl border border-white/10 px-5 py-4">
              <p className="text-xs tracking-[0.18em] text-[#d6ff4a]">{n}</p>
              <h3 className="mt-1 text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-white/65">{line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CLIPS.map((clip) => (
            <video
              key={clip.src}
              src={clip.src}
              poster={clip.poster}
              autoPlay
              muted
              loop
              playsInline
              className="h-80 w-44 shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="columns-2 gap-3 sm:columns-3">
          {SHOTS.map(([src, alt]) => (
            <img key={src} src={src} alt={alt} className="mb-3 w-full rounded-2xl" />
          ))}
        </div>
      </section>

      <section id="price" className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-[28px] bg-[#d6ff4a] px-6 py-8 text-black">
          <p className="text-sm font-medium">Lifetime kit</p>
          <p className="mt-2 text-6xl font-semibold tracking-tight">{PRICE}</p>
          <p className="mt-1 text-black/60">Was $97. This price ends September 30.</p>
          <ul className="mt-6 space-y-2 text-base">
            <li>How to create the model</li>
            <li>How to put your product in the post</li>
            <li>How to get watched on TikTok and Instagram</li>
            <li>How to ask a sponsor</li>
            <li>In your email in under 8 hours</li>
          </ul>
          <div className="mt-6">
            <Buy label={`Get access now · ${PRICE}`} full dark />
          </div>
          <p className="mt-3 text-sm text-black/70">Follow the steps. If you do not make $500 in the first week, email {MAIL}. We give your money back.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-3xl font-semibold tracking-tight">Questions</h2>
        <div className="mt-4 divide-y divide-white/10 border-y border-white/10">
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

      <footer className="mx-auto max-w-3xl px-4 pt-4 pb-28 text-center text-xs text-white/40">
        <a className="underline" href={IG}>
          @oxlisvoid
        </a>
        <span> · </span>
        <Link to="/legal" className="underline">
          Terms and refund
        </Link>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07080b]/95 p-3 backdrop-blur sm:hidden">
        <Buy label={`Get access · ${PRICE}`} full />
      </div>
    </div>
  );
}
