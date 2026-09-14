const NOTES = [
  {
    platform: "Direct message",
    name: "Mara K.",
    body: "Shipped my first consistent character in a weekend. The LoRA SOP is the missing piece every YouTube tutorial skips.",
  },
  {
    platform: "TikTok",
    name: "julian.creates",
    body: "Was bouncing between random workflows for months. This is just… the system. Faces finally stay the same.",
  },
  {
    platform: "Instagram",
    name: "nova.studio",
    body: "Skin enhancer is unfair. Clients stopped asking if it was AI. Booking brand work off a fictional creator now.",
  },
  {
    platform: "Discord",
    name: "hex",
    body: "Runpod + the motion control graph = 20s clips that actually hold identity. I deleted my Midjourney sub.",
  },
  {
    platform: "Email",
    name: "Priya S.",
    body: "Beginner, MacBook, no GPU. Followed the cloud setup and generated the whole carousel the same night.",
  },
  {
    platform: "Direct message",
    name: "Owen",
    body: "Paid for three other packs. This is the first one that feels like an operating system, not a dump of json files.",
  },
] as const;

export function Voices() {
  const loop = [...NOTES, ...NOTES];
  return (
    <section className="border-y border-line bg-surface py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          The users speak for themselves
        </h2>
      </div>
      <div className="mt-8 overflow-hidden">
        <div className="marquee-track flex w-max gap-4 px-4">
          {loop.map((note, i) => (
            <article
              key={`${note.name}-${i}`}
              className="w-80 shrink-0 rounded-xl bg-paper p-4 shadow-(--shadow-card)"
            >
              <p className="text-[11px] font-medium tracking-wide text-subtle uppercase">
                {note.platform}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{note.body}</p>
              <p className="mt-3 text-sm font-medium">{note.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
