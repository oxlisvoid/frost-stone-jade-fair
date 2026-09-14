import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

export function LoopVideo({ src, poster, className, label }: Props) {
  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
