import { FitImage } from "@/components/fit-image";

const SHOTS = [
  {
    src: "/media/proof/fan-revenue.jpeg",
    alt: "Creator dashboard showing $90,754.17 total earnings",
    caption: "Fan platform revenue from a buyer running the system",
  },
  {
    src: "/media/proof/discord-wins.png",
    alt: "Discord wins channel with six-figure payouts and live tips",
    caption: "Live tips and payouts shared in the wins room",
  },
  {
    src: "/media/proof/fanvue-payout.jpg",
    alt: "Fanvue earnings and payouts totaling $1,794.43",
    caption: "Early payout on Fanvue after launching a model",
  },
  {
    src: "/media/proof/creator-ig.png",
    alt: "Instagram profile with 50.9K followers built as an AI creator",
    caption: "50.9K on Instagram — character built with the workflows",
  },
] as const;

const NOTES = [
  {
    name: "1bunny.eth",
    body: "Finally getting good content with your workflows. Four months of guessing — the toolkit fixed it in one night. Holy value.",
  },
  {
    name: "Direct message",
    body: "Your toolkit is crazy stuff. Can’t wait to launch my model tomorrow. Thank you so much.",
  },
  {
    name: "New buyer",
    body: "It’s a start — then the first $1,260 month. Proof the system works.",
  },
] as const;

export function Proof() {
  return (
    <section className="border-y border-line bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Results from users</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Real dashboards, real DMs. People using these workflows to launch AI models and sell
          on TikTok, Instagram, and fan platforms.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {SHOTS.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-2xl bg-paper p-2 shadow-(--shadow-card)">
              <FitImage src={shot.src} alt={shot.alt} className="rounded-xl" />
              <figcaption className="px-2 py-3 text-sm text-muted">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {NOTES.map((note) => (
            <article key={note.body} className="rounded-2xl bg-paper p-4 shadow-(--shadow-card)">
              <p className="text-sm leading-relaxed">{note.body}</p>
              <p className="mt-3 text-sm font-medium">{note.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
