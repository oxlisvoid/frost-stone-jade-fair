import { createFileRoute } from "@tanstack/react-router";
import { Building } from "@/components/landing/building";
import { Care } from "@/components/landing/care";
import { Faq } from "@/components/landing/faq";
import { GpuCheck } from "@/components/landing/gpu-check";
import { Hero } from "@/components/landing/hero";
import { Included } from "@/components/landing/included";
import { Playbooks } from "@/components/landing/playbooks";
import { Pricing } from "@/components/landing/pricing";
import { Proof } from "@/components/landing/proof";
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
        <Proof />
        <Included />
        <Care />
        <Pricing />
        <Faq />
      </main>
    </SiteShell>
  );
}
