import { useCallback, useId, useRef, useState, type PointerEvent } from "react";
import { LoopVideo } from "@/components/loop-video";
import { cn } from "@/lib/utils";

type Kind = "image" | "video";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeKind?: Kind;
  afterKind?: Kind;
  beforePoster?: string;
  afterPoster?: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
  rawFilter?: boolean;
};

export function MediaCompare({
  beforeSrc,
  afterSrc,
  beforeKind = "image",
  afterKind = "image",
  beforePoster,
  afterPoster,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  className,
  rawFilter = false,
}: Props) {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  };

  const stop = () => {
    dragging.current = false;
  };

  return (
    <figure className={cn("space-y-2", className)}>
      <div
        ref={wrapRef}
        className="relative aspect-3/4 overflow-hidden rounded-xl bg-ink select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        role="slider"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
          if (event.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
        }}
      >
        <Layer src={beforeSrc} kind={beforeKind} poster={beforePoster} alt={beforeLabel} raw={rawFilter} />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Layer src={afterSrc} kind={afterKind} poster={afterPoster} alt={afterLabel} />
        </div>

        <div
          className="absolute inset-y-0 z-10 w-px bg-paper"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_8px_24px_rgb(0_0_0/0.28)]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M7 4 3 9l4 5M11 4l4 5-4 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </div>

        <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-paper">
          {beforeLabel}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-wide text-paper">
          {afterLabel}
        </span>
      </div>
      {caption ? (
        <figcaption id={labelId} className="text-sm text-muted">
          {caption}
        </figcaption>
      ) : (
        <span id={labelId} className="sr-only">
          Comparison slider
        </span>
      )}
    </figure>
  );
}

function Layer({
  src,
  kind,
  poster,
  alt,
  raw,
}: {
  src: string;
  kind: Kind;
  poster?: string;
  alt: string;
  raw?: boolean;
}) {
  const filter = raw ? "contrast-125 saturate-75 brightness-90" : undefined;
  if (kind === "video") {
    return (
      <LoopVideo
        src={src}
        poster={poster}
        className={cn("absolute inset-0", filter)}
        label={alt}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", filter)}
    />
  );
}
