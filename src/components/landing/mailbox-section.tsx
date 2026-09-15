import { Mailbox } from "@/components/mailbox";

export function MailboxSection() {
  return (
    <section id="mailbox" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-medium text-accent">Mailbox</p>
          <h2 className="mt-2 text-3xl tracking-tight sm:text-4xl">Questions before you pay</h2>
          <p className="mt-3 max-w-md text-muted">
            Leave your email. We read every note at oxlisvoid@gmail.com and reply to the address you
            type here — delivery, GPU, TikTok, Instagram, or the course.
          </p>
        </div>
        <Mailbox compact />
      </div>
    </section>
  );
}
