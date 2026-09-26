import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { formatUsd } from "@/lib/content";
import { SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function SiteHeader() {
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md bg-ink text-[11px] font-semibold tracking-tight text-paper">
            OV
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{SITE.name}</span>
        </Link>
        <Button asChild size="sm">
          <Link to="/checkout">{unlocked ? "Paid — check email" : price}</Link>
        </Button>
      </div>
    </header>
  );
}
