import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useAccess } from "@/lib/access";
import { formatUsd } from "@/lib/content";
import { deskStatus } from "@/lib/content-fns";
import { SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", hash: "workflows", label: "Workflows" },
  { to: "/course", hash: undefined, label: "Course" },
  { to: "/toolkit", hash: undefined, label: "Toolkit" },
  { to: "/prompt", hash: undefined, label: "VoidPrompt" },
  { to: "/", hash: "pricing", label: "Pricing" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [desk, setDesk] = useState(false);
  const unlocked = useAccess((s) => s.unlocked);
  const hydrate = useAccess((s) => s.hydrate);
  const { content } = useSiteContent();
  const price = formatUsd(content.priceCents);

  useEffect(() => {
    hydrate();
    void deskStatus()
      .then((s) => setDesk(s.operator))
      .catch(() => setDesk(false));
  }, [hydrate]);

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
          {content.discordUrl ? (
            <a href={content.discordUrl} target="_blank" rel="noreferrer" className="hover:text-fg">
              Discord
            </a>
          ) : null}
        </nav>

        <div className="flex items-center gap-2">
          <SignedIn>
            <Link to="/admin" className="hidden text-sm text-muted hover:text-fg lg:inline">
              Admin
            </Link>
            <div className="hidden sm:block">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            {desk ? (
              <Link to="/admin" className="hidden text-sm text-muted hover:text-fg sm:inline">
                Admin
              </Link>
            ) : (
              <Link to="/login" className="hidden text-sm text-muted hover:text-fg sm:inline">
                Sign in
              </Link>
            )}
          </SignedOut>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to={unlocked ? "/toolkit" : "/checkout"}>{unlocked ? "Open toolkit" : price}</Link>
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
          {content.discordUrl ? (
            <a
              href={content.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 items-center text-[15px]"
              onClick={() => setOpen(false)}
            >
              Discord
            </a>
          ) : null}
          <Link to="/admin" className="flex h-11 items-center text-[15px]" onClick={() => setOpen(false)}>
            Admin
          </Link>
          <Button asChild className="mt-2 w-full">
            <Link to={unlocked ? "/toolkit" : "/checkout"} onClick={() => setOpen(false)}>
              {unlocked ? "Open toolkit" : `Get All Access ${price}`}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
