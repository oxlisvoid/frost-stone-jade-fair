import { PromoBanner } from "@/components/promo-banner";
import { SiteChat } from "@/components/site-chat";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
  chat = true,
  bare = false,
}: {
  children: React.ReactNode;
  chat?: boolean;
  bare?: boolean;
}) {
  if (bare) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }
  return (
    <div className="min-h-screen bg-bg text-fg">
      <PromoBanner />
      <SiteHeader />
      {children}
      <SiteFooter />
      {chat ? <SiteChat /> : null}
    </div>
  );
}
