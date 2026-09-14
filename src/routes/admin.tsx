import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn, SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { DEFAULT_CONTENT, formatUsd, type SiteContent } from "@/lib/content";
import { deskLogout, deskStatus, loadSiteContent, loadStripeStatus, saveSiteContent, saveStripeSecret } from "@/lib/content-fns";
import { loadOperator, saveOperator } from "@/lib/operator-fns";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  const [desk, setDesk] = useState<boolean | null>(null);

  useEffect(() => {
    void deskStatus()
      .then((s) => setDesk(s.operator))
      .catch(() => setDesk(false));
  }, []);

  if (isPending || desk === null) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-16 text-muted">Loading desk…</main>
      </SiteShell>
    );
  }

  if (!user && !desk) {
    return <RedirectToSignIn />;
  }

  return <AdminDesk signedIn={Boolean(user)} />;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-muted">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
      />
    </label>
  );
}

function AdminDesk({ signedIn }: { signedIn: boolean }) {
  const { setContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(DEFAULT_CONTENT);
  const [stripeLink, setStripeLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [stripeSecret, setStripeSecret] = useState("");
  const [stripeHint, setStripeHint] = useState("");
  const [stripeReady, setStripeReady] = useState(false);

  useEffect(() => {
    void loadSiteContent().then((data) => {
      setDraft(data);
      setContent(data);
    });
    void loadStripeStatus()
      .then((data) => {
        setStripeReady(data.configured);
        setStripeHint(data.hint);
      })
      .catch(() => undefined);
    if (!signedIn) return;
    void loadOperator()
      .then((data) => {
        setStripeLink(data.stripeLink);
        setContactEmail(data.contactEmail);
        setNotes(data.notes);
      })
      .catch(() => undefined);
  }, [setContent, signedIn]);

  const saveSite = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const saved = await saveSiteContent({ data: draft });
      setDraft(saved);
      setContent(saved);
      setStatus("Site updated. Discord, media, and price are live.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save the site.");
    } finally {
      setBusy(false);
    }
  };

  const saveKey = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const saved = await saveStripeSecret({ data: { secret: stripeSecret } });
      setStripeReady(saved.configured);
      setStripeHint(saved.hint);
      setStripeSecret("");
      setStatus("Stripe key saved. Checkout can charge All Access.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save the Stripe key.");
    } finally {
      setBusy(false);
    }
  };

  const saveNotes = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await saveOperator({ data: { stripeLink, contactEmail, notes } });
      setStatus("Operator notes saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save notes.");
    } finally {
      setBusy(false);
    }
  };

  const leave = async () => {
    try {
      await deskLogout();
    } catch {
      /* ignore */
    }
    try {
      await signOut();
    } catch {
      /* ignore */
    }
    window.location.assign("/");
  };

  const priceDollars = Math.round(draft.priceCents) / 100;
  const compareDollars = Math.round(draft.comparePriceCents) / 100;

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Operator desk</p>
            <h1 className="mt-1 text-4xl">Edit the site</h1>
            <p className="mt-2 text-sm text-muted">
              Change Discord, photos, videos, and the All Access price. Customers never see this page.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button type="button" variant="outline" onClick={() => void leave()}>
                Sign out
              </Button>
            </SignedOut>
          </div>
        </div>

        <form onSubmit={saveKey} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Stripe</h2>
          <p className="text-sm text-muted">
            {stripeReady
              ? `Key connected (${stripeHint}). Paste a new sk_test_… key only if you need to replace it.`
              : "Checkout needs a secret key. Paste the test key from Stripe Dashboard → Developers → API keys."}
          </p>
          <Field
            label="Secret key"
            value={stripeSecret}
            onChange={setStripeSecret}
            placeholder="sk_test_…"
            type="password"
          />
          <Button type="submit" disabled={busy || stripeSecret.trim().length < 12}>
            {busy ? "Saving…" : stripeReady ? "Replace Stripe key" : "Save Stripe key"}
          </Button>
        </form>

        <form onSubmit={saveSite} className="space-y-5 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Public site</h2>
          <Field
            label="Discord invite"
            value={draft.discordUrl}
            onChange={(v) => setDraft({ ...draft, discordUrl: v.trim() })}
            placeholder="https://discord.gg/your-server"
          />
          <Field
            label="Public email"
            value={draft.email}
            onChange={(v) => setDraft({ ...draft, email: v })}
            type="email"
          />
          <Field label="Tagline" value={draft.tagline} onChange={(v) => setDraft({ ...draft, tagline: v })} />
          <Field label="Headline" value={draft.headline} onChange={(v) => setDraft({ ...draft, headline: v })} />
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Offer copy</span>
            <textarea
              value={draft.sells}
              onChange={(e) => setDraft({ ...draft, sells: e.target.value })}
              rows={3}
              className="w-full rounded-lg bg-paper px-3 py-2 shadow-(--shadow-card)"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">All Access price (USD)</span>
              <input
                type="number"
                min={1}
                step="1"
                value={priceDollars}
                onChange={(e) =>
                  setDraft({ ...draft, priceCents: Math.max(1, Math.round(Number(e.target.value) * 100) || 100000) })
                }
                className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              />
              <span className="mt-1 block text-xs text-subtle">Shows as {formatUsd(draft.priceCents)}</span>
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Compare-at price (USD)</span>
              <input
                type="number"
                min={1}
                step="1"
                value={compareDollars}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    comparePriceCents: Math.max(1, Math.round(Number(e.target.value) * 100) || 105000),
                  })
                }
                className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              />
            </label>
          </div>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Publish site changes"}
          </Button>
        </form>

        <form onSubmit={saveSite} className="space-y-5 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Hero photos / videos</h2>
          <p className="text-sm text-muted">Paste image, mp4, or YouTube URLs. Empty fields keep the current media.</p>
          {draft.heroClips.map((clip, i) => (
            <div key={i} className="grid gap-3 rounded-2xl bg-paper p-4 sm:grid-cols-2">
              <Field
                label={`Clip ${i + 1} file or YouTube`}
                value={clip.src}
                onChange={(src) => {
                  const heroClips = draft.heroClips.map((item, idx) => (idx === i ? { ...item, src } : item));
                  setDraft({ ...draft, heroClips });
                }}
                placeholder="https://…"
              />
              <Field
                label="Poster image"
                value={clip.poster}
                onChange={(poster) => {
                  const heroClips = draft.heroClips.map((item, idx) => (idx === i ? { ...item, poster } : item));
                  setDraft({ ...draft, heroClips });
                }}
              />
              <Field
                label="Label"
                value={clip.label}
                onChange={(label) => {
                  const heroClips = draft.heroClips.map((item, idx) => (idx === i ? { ...item, label } : item));
                  setDraft({ ...draft, heroClips });
                }}
              />
            </div>
          ))}
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save hero media"}
          </Button>
        </form>

        <form onSubmit={saveSite} className="space-y-5 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Gallery</h2>
          {draft.portraits.map((shot, i) => (
            <div key={i} className="grid gap-3 sm:grid-cols-2">
              <Field
                label={`Photo ${i + 1}`}
                value={shot.src}
                onChange={(src) => {
                  const portraits = draft.portraits.map((item, idx) => (idx === i ? { ...item, src } : item));
                  setDraft({ ...draft, portraits });
                }}
              />
              <Field
                label="Alt text"
                value={shot.alt}
                onChange={(alt) => {
                  const portraits = draft.portraits.map((item, idx) => (idx === i ? { ...item, alt } : item));
                  setDraft({ ...draft, portraits });
                }}
              />
            </div>
          ))}
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save gallery"}
          </Button>
        </form>

        <form onSubmit={saveSite} className="space-y-5 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Example videos / stills</h2>
          {draft.examples.map((example, i) => (
            <div key={i} className="grid gap-3 rounded-2xl bg-paper p-4">
              <Field
                label={`Example ${i + 1} URL`}
                value={example.src}
                onChange={(src) => {
                  const examples = draft.examples.map((item, idx) => (idx === i ? { ...item, src } : item));
                  setDraft({ ...draft, examples });
                }}
              />
              <Field
                label="Poster"
                value={example.poster ?? ""}
                onChange={(poster) => {
                  const examples = draft.examples.map((item, idx) => (idx === i ? { ...item, poster } : item));
                  setDraft({ ...draft, examples });
                }}
              />
              <Field
                label="Caption"
                value={example.caption}
                onChange={(caption) => {
                  const examples = draft.examples.map((item, idx) => (idx === i ? { ...item, caption } : item));
                  setDraft({ ...draft, examples });
                }}
              />
            </div>
          ))}
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save examples"}
          </Button>
        </form>

        {signedIn ? (
          <form onSubmit={saveNotes} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
            <h2 className="text-2xl">Private notes</h2>
            <Field label="Stripe note" value={stripeLink} onChange={setStripeLink} />
            <Field label="Orders email" value={contactEmail} onChange={setContactEmail} type="email" />
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Notes</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full rounded-lg bg-paper px-3 py-2 shadow-(--shadow-card)"
              />
            </label>
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save notes"}
            </Button>
          </form>
        ) : null}

        {status ? <p className="rounded-lg bg-chip px-3 py-2 text-sm">{status}</p> : null}

        <p className="text-sm text-muted">
          <Link to="/" className="underline">
            View site
          </Link>
          {" · "}
          <Link to="/legal" className="underline">
            Legal
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
