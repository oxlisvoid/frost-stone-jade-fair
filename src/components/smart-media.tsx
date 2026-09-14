import { FitImage } from "@/components/fit-image";
import { LoopVideo } from "@/components/loop-video";
import { cn } from "@/lib/utils";

function youtubeId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  );
  return match?.[1] ?? "";
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

export function SmartMedia({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;
  const yt = youtubeId(src);
  if (yt) {
    return (
      <iframe
        className={cn("h-full w-full", className)}
        src={`https://www.youtube.com/embed/${yt}`}
        title={alt}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (isVideoFile(src) || src.startsWith("/media/v-") || src.endsWith(".mp4")) {
    return <LoopVideo src={src} poster={poster} className={className} label={alt} />;
  }
  return <FitImage src={src} alt={alt} className={className} />;
}
