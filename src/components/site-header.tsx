import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { loadPublicPosts } from "@/lib/catalog-fns";
import { formatUsd } from "@/lib/content";
import { SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", hash: "workflows", label: "Workflows" },
  { to: "/course", hash: undefined, label: "Course demo" },
  { to: "/toolkit", hash: undefined, label: "Toolkit demo" },
  { to: "/prompt", hash: undefined, label: "VoidPrompt" },
  { to: "/", hash: "pricing", label: "Pricing" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [discord, setDiscord] = useState("");
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);

  useEffect(() => {
    hydrate();
    void loadPublicPosts()
      .then((posts) => {
        const found = posts.find((p) => p.kind === "discord" && p.url);
        if (found) setDiscord(found.url);
      })
      .catch(() => undefined);
  }, [hydrate]);

  const discordUrl = content.discordUrl || discord;

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-md bg-ink text-[11px] font-semibold tracking-tight text-paper">
            OV
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {LINKS.map((link) => (
            <Link key={link.to + (link.hash ?? "")} to={link.to} hash={link.hash} className="hover:text-fg">
              {link.label}
            </Link>
          ))}
          {discordUrl ? (
            <a href={discordUrl} target="_blank" rel="noreferrer" className="hover:text-fg">
              Discord
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/checkout">{unlocked ? "Paid — check email" : price}</Link>
          </Button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className={cn("border-t border-line bg-surface md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3">
          {LINKS.map((link) => (
            <Link
              key={link.to + (link.hash ?? "")}
              to={link.to}
              hash={link.hash}
              className="flex h-11 items-center text-[15px]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {discordUrl ? (
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 items-center text-[15px]"
              onClick={() => setOpen(false)}
            >
              Discord
            </a>
          ) : null}
          <Button asChild className="mt-2 w-full">
            <Link to="/checkout" onClick={() => setOpen(false)}>
              Get All Access {price}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
