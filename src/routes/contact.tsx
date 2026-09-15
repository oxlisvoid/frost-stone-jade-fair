import { createFileRoute } from "@tanstack/react-router";
import { Mailbox } from "@/components/mailbox";
import { SiteShell } from "@/components/site-shell";
import { INBOX } from "@/lib/mail-fns";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight">Mailbox</h1>
        <p className="mt-3 text-muted">
          Write your question and the email we should answer. It is forwarded to {INBOX} with your
          address attached so we can reply.
        </p>
        <div className="mt-8">
          <Mailbox compact />
        </div>
      </main>
    </SiteShell>
  );
}
