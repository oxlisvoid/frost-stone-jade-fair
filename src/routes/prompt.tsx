import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/prompt")({ component: PromptPage });

const POOL = [
  "/media/p-cafe.jpg",
  "/media/p-studio.jpg",
  "/media/p-rooftop.jpg",
  "/media/p-beach.jpg",
  "/media/p-night.jpg",
  "/media/p-indoor.jpg",
  "/media/p-office.jpg",
  "/media/p-jazz.jpg",
] as const;

const PROMPTS: Record<string, string> = {
  "/media/p-cafe.jpg":
    "photoreal 28-year-old woman, olive skin, dark wavy hair, cream linen shirt, gold hoops, sitting at a sunlit cafe table, 35mm, golden hour, shallow depth of field, influencer selfie",
  "/media/p-studio.jpg":
    "photoreal 27-year-old East Asian woman, sleek black bun, charcoal silk blouse, soft window light from camera left, muted gray seamless, editorial beauty, calm gaze",
  "/media/p-rooftop.jpg":
    "photoreal 30-year-old Black woman, short natural curls, rust tailored blazer over white tank, rooftop sunset, city bokeh, warm rim light, 50mm",
  "/media/p-beach.jpg":
    "photoreal 26-year-old blonde woman, wind-tossed hair, oversized white shirt over black swimsuit top, overcast coastal light, candid laugh, fashion editorial",
  "/media/p-night.jpg":
    "photoreal 29-year-old Latina woman, long dark hair, black leather jacket, silver jewelry, wet neon street, cyan and amber signage, cinematic night",
  "/media/p-indoor.jpg":
    "photoreal 31-year-old woman, auburn hair, camel knit sweater, ceramic mug, sofa by a large window, soft daylight apartment, lifestyle editorial",
  "/media/p-office.jpg":
    "photoreal 27-year-old South Asian woman, long black hair, sage blazer, glass office, city light, confident half-smile, corporate influencer",
  "/media/p-jazz.jpg":
    "photoreal 32-year-old woman, platinum pixie, black turtleneck, jazz-bar booth, warm tungsten lamps, intimate cinematic lighting",
};

export function PromptPage() {
  const [picked, setPicked] = useState<string>(POOL[0]);
  const [left, setLeft] = useState(50);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const preview = useMemo(() => PROMPTS[picked] ?? "", [picked]);

  const run = () => {
    setBusy(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(preview);
      setLeft((n) => Math.max(0, n - 1));
      setBusy(false);
    }, 700);
  };

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-sm font-medium text-muted">Limited offer</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">VoidPrompt</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Drop a still, get a production prompt you can paste into the local graph. Fifty
          generations are included with the toolkit.
        </p>
        <p className="mt-2 text-sm tabular-nums text-subtle">{left} demo generations remaining on this device</p>

        <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-2 text-sm font-medium">Choose a still</p>
            <div className="grid grid-cols-4 gap-2">
              {POOL.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setPicked(src);
                    setResult(null);
                  }}
                  className={`overflow-hidden rounded-lg ${picked === src ? "ring-2 ring-ink" : ""}`}
                >
                  <img src={src} alt="" className="aspect-3/4 object-cover" />
                </button>
              ))}
            </div>
            <Button type="button" className="mt-4 w-full" onClick={run} disabled={busy || left === 0}>
              {busy ? "Reading image…" : "Generate prompt"}
            </Button>
          </div>
          <div className="rounded-2xl bg-surface p-5 shadow-(--shadow-card)">
            <img src={picked} alt="Selected still" className="mb-4 aspect-3/4 w-full rounded-xl object-cover" />
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">Prompt</p>
            <p className="mt-2 min-h-24 text-sm leading-relaxed">
              {result ?? "Generate to reverse the still into a reusable prompt."}
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
