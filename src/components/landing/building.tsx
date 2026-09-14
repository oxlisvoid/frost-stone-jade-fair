import { FitImage } from "@/components/fit-image";
import { LoopVideo } from "@/components/loop-video";
import { PORTRAITS } from "@/lib/site";

const USES = [
  "Full AI influencers, monetizing through brand deals and fan platforms",
  "Fictional creators promoting products",
  "Content automation — producing and scheduling at scale",
  "Commercial content for brands and marketing agencies",
] as const;

const EXAMPLES = [
  {
    kind: "image" as const,
    src: "/media/ex-ivy.jpg",
    alt: "Night editorial still generated with OxlisVoid",
    caption: "Image Kit — consistent character stills",
  },
  {
    kind: "video" as const,
    src: "/media/ex-selfie.mp4",
    poster: "/media/ex-selfie.jpg",
    label: "Mirror selfie reel",
    caption: "Video Kit — ready-to-post reels",
  },
  {
    kind: "video" as const,
    src: "/media/ex-motion.mp4",
    poster: "/media/ex-motion.jpg",
    label: "Motion control clip",
    caption: "Motion Kit — body copies the reference",
  },
];

export function Building() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        What people are building with this
      </h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {USES.map((item) => (
          <li key={item} className="rounded-xl bg-surface px-4 py-4 text-sm leading-relaxed shadow-(--shadow-card)">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-subtle">(Generated with the workflows inside the toolkit)</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {EXAMPLES.map((example) => (
          <figure key={example.src} className="flex h-full flex-col rounded-xl bg-paper p-1.5 shadow-(--shadow-card)">
            <div className="overflow-hidden rounded-lg bg-ink">
              {example.kind === "image" ? (
                <FitImage src={example.src} alt={example.alt} className="aspect-9/16 object-contain" />
              ) : (
                <LoopVideo
                  src={example.src}
                  poster={example.poster}
                  label={example.label}
                  className="aspect-9/16 object-contain"
                />
              )}
            </div>
            <figcaption className="mt-auto px-1 py-2 text-xs text-muted">{example.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Results() {
  const loop = [...PORTRAITS, ...PORTRAITS];
  return (
    <section className="border-y border-line bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Results from users</h2>
        <p className="mt-3 max-w-xl text-muted">
          Same system, many looks. Full frames — nothing cropped.
        </p>
      </div>
      <div className="mt-8 overflow-hidden">
        <div className="marquee-track flex w-max items-end gap-3 px-4">
          {loop.map((shot, i) => (
            <FitImage
              key={`${shot.src}-${i}`}
              src={shot.src}
              alt={shot.alt}
              className="h-80 w-auto max-w-none rounded-xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
