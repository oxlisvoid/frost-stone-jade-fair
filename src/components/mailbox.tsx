import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { INBOX, sendInquiry } from "@/lib/mail-fns";

export function Mailbox({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await sendInquiry({ data: { name, email, message, company } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the message.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-surface p-6 shadow-(--shadow-card) sm:p-8">
        <p className="text-sm font-medium text-good">Message sent</p>
        <h2 className="mt-2 text-2xl">We have your email</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your question is in the OxlisVoid inbox ({INBOX}) together with {email}. We reply to that
          address. Check spam if you do not see us within a day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative rounded-3xl bg-surface p-6 shadow-(--shadow-card) sm:p-8">
      {compact ? null : (
        <>
          <p className="text-sm font-medium text-accent">Mailbox</p>
          <h2 className="mt-1 text-2xl">Ask a question</h2>
          <p className="mt-2 text-sm text-muted">
            We need your email to reply. Messages go to {INBOX}.
          </p>
        </>
      )}
      <div className={compact ? "space-y-3" : "mt-6 space-y-3"}>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
            autoComplete="name"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Your email — we reply here</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
            autoComplete="email"
            placeholder="you@email.com"
          />
        </label>
        <label className="absolute left-[-9999px]" aria-hidden="true">
          Company
          <input tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Question</span>
          <textarea
            required
            minLength={10}
            rows={compact ? 4 : 5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg bg-paper px-3 py-2 shadow-(--shadow-card)"
            placeholder="Delivery, ComfyUI, TikTok, Stripe…"
          />
        </label>
        {error ? <p className="rounded-lg bg-chip px-3 py-2 text-sm text-accent">{error}</p> : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Sending…" : "Send to OxlisVoid"}
        </Button>
      </div>
    </form>
  );
}
