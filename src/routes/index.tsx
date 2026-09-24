import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/landing/offer-page";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell bare chat={false}>
      <OfferPage />
    </SiteShell>
  );
}
