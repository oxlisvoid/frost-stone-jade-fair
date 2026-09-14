import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const VRAM = [6, 8, 10, 12, 16, 24, 32] as const;
const RAM = [8, 16, 32, 64, 128] as const;
const UNIFIED = [8, 16, 24, 32, 48, 64, 128] as const;

export function GpuCheck() {
  const [os, setOs] = useState<"win" | "mac">("win");
  const [vram, setVram] = useState(12);
  const [ram, setRam] = useState(32);
  const [unified, setUnified] = useState(16);
  const [showHow, setShowHow] = useState(false);

  const verdict = useMemo(() => {
    if (os === "mac") {
      if (unified >= 32) return "Comfortable for lighter local image work. Video still prefers a cloud GPU.";
      if (unified >= 16) return "Fine for learning. Most OxlisVoid users still generate on a rented GPU.";
      return "Use a cloud GPU. This is normal — not a blocker.";
    }
    if (vram >= 24) return "You can run most local image and some video graphs without renting.";
    if (vram >= 12) return "Good for images. Motion and longer clips are happier on a cloud GPU.";
    return "Use Runpod or another cloud GPU. 95% of OxlisVoid users do.";
  }, [os, vram, unified]);

  return (
    <section id="gpu" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Is my computer powerful enough?
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Most computers cannot handle full local AI comfortably. That is completely normal
          and not a limiting factor. 95% of OxlisVoid users use Runpod or some form of cloud GPU.
        </p>

        <div className="mt-8 flex gap-2">
          <Button
            type="button"
            size="sm"
            variant={os === "win" ? "primary" : "outline"}
            onClick={() => setOs("win")}
          >
            Windows / NVIDIA
          </Button>
          <Button
            type="button"
            size="sm"
            variant={os === "mac" ? "primary" : "outline"}
            onClick={() => setOs("mac")}
          >
            Mac / Apple Silicon
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {os === "win" ? (
            <>
              <Field label="GPU VRAM" value={`${vram} GB`}>
                <select
                  className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
                  value={vram}
                  onChange={(e) => setVram(Number(e.target.value))}
                >
                  {VRAM.map((n) => (
                    <option key={n} value={n}>
                      {n} GB
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="System RAM" value={`${ram} GB`}>
                <select
                  className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
                  value={ram}
                  onChange={(e) => setRam(Number(e.target.value))}
                >
                  {RAM.map((n) => (
                    <option key={n} value={n}>
                      {n} GB
                    </option>
                  ))}
                </select>
              </Field>
            </>
          ) : (
            <Field label="Unified Memory" value={`${unified} GB`}>
              <select
                className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
                value={unified}
                onChange={(e) => setUnified(Number(e.target.value))}
              >
                {UNIFIED.map((n) => (
                  <option key={n} value={n}>
                    {n} GB
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>

        <p className="mt-5 max-w-xl rounded-xl bg-paper px-4 py-3 text-sm leading-relaxed shadow-(--shadow-card)">
          {verdict}
        </p>
        <p className="mt-3 text-sm text-subtle">
          VRAM is memory on your graphics card. RAM is general system memory. For local AI,
          VRAM is usually the main limitation.
        </p>
        {os === "mac" ? (
          <p className="mt-2 text-sm text-subtle">
            Apple Silicon uses unified memory: the CPU and GPU share the same pool. It is not
            directly comparable to dedicated NVIDIA VRAM.
          </p>
        ) : null}

        <button
          type="button"
          className="mt-4 text-sm font-medium underline-offset-4 hover:underline"
          onClick={() => setShowHow((v) => !v)}
        >
          {showHow ? "Hide how to check" : "Not sure? How to check →"}
        </button>

        {showHow ? (
          <div className="mt-4 max-w-2xl space-y-3 rounded-xl bg-paper p-4 text-sm leading-relaxed shadow-(--shadow-card)">
            <p className="font-medium">Windows / NVIDIA</p>
            <p>Open PowerShell and paste:</p>
            <code className="block overflow-x-auto rounded-md bg-ink px-3 py-2 font-mono text-[12px] text-paper">
              nvidia-smi --query-gpu=name,memory.total --format=csv,noheader
            </code>
            <p>
              If that command is unavailable, open Task Manager → Performance → GPU and look
              for Dedicated GPU memory.
            </p>
            <p className="font-medium pt-2">Mac / Apple Silicon</p>
            <p>Apple menu → About This Mac → Memory. Or in Terminal:</p>
            <code className="block overflow-x-auto rounded-md bg-ink px-3 py-2 font-mono text-[12px] text-paper">
              system_profiler SPHardwareDataType | grep "Memory"
            </code>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-sm">
        <span className="text-muted">{label}</span>
        <span className="tabular-nums font-medium">{value}</span>
      </span>
      {children}
    </label>
  );
}
