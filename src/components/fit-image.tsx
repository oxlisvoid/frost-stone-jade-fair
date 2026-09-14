import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/** Full frame, never cropped. */
export function FitImage({ src, alt, className }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-auto w-full object-contain", className)}
    />
  );
}
