import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "@/components/landing/faq";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  return (
    <SiteShell>
      <main>
        <Faq />
      </main>
    </SiteShell>
  );
}
