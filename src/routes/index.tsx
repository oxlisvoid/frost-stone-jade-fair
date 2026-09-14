import { createFileRoute } from "@tanstack/react-router";
import { Building, Results } from "@/components/landing/building";
import { Faq } from "@/components/landing/faq";
import { GpuCheck } from "@/components/landing/gpu-check";
import { Hero } from "@/components/landing/hero";
import { Playbooks } from "@/components/landing/playbooks";
import { Pricing } from "@/components/landing/pricing";
import { Tutorials } from "@/components/landing/tutorials";
import { Voices } from "@/components/landing/voices";
import { Workflows } from "@/components/landing/workflows";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <main>
        <Hero />
        <Voices />
        <Workflows />
        <Tutorials />
        <Playbooks />
        <GpuCheck />
        <Building />
        <Results />
        <Pricing />
        <Faq />
      </main>
    </SiteShell>
  );
}
