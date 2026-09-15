import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import type { CatalogProduct, SitePost } from "@/lib/catalog";
import {
  deleteCatalogProduct,
  deleteSitePost,
  loadAllCatalog,
  loadAllPosts,
  saveCatalogProduct,
  saveSitePost,
} from "@/lib/catalog-fns";
import { DEFAULT_CONTENT, formatUsd, type SiteContent } from "@/lib/content";
import {
  deskLogin,
  deskLogout,
  deskStatus,
  loadSiteContent,
  loadStripeStatus,
  saveSiteContent,
  saveStripeSecret,
} from "@/lib/content-fns";
import { loadOrders } from "@/lib/checkout-fn";
import { INBOX, loadInquiries, type Inquiry } from "@/lib/mail-fns";
import { useSiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/ops-vx9k")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Desk" },
    ],
  }),
  component: OpsPage,
});

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

function OpsPage() {
  const [desk, setDesk] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void deskStatus()
      .then((s) => setDesk(s.operator))
      .catch(() => setDesk(false));
  }, []);

  const enter = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await deskLogin({ data: { password: pin } });
      setDesk(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open the desk.");
    } finally {
      setBusy(false);
    }
  };

  if (desk === null) {
    return (
      <SiteShell chat={false}>
        <main className="mx-auto max-w-3xl px-4 py-16 text-muted">Loading…</main>
      </SiteShell>
    );
  }

  if (!desk) {
    return (
      <SiteShell chat={false}>
        <main className="mx-auto max-w-sm px-4 py-20">
          <h1 className="text-3xl">Desk</h1>
          <p className="mt-2 text-sm text-muted">Operator password. This door is not linked from the site.</p>
          <form onSubmit={enter} className="mt-6 space-y-3">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              autoComplete="current-password"
            />
            {error ? <p className="text-sm text-accent">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={busy || pin.length < 4}>
              {busy ? "Checking…" : "Open"}
            </Button>
          </form>
        </main>
      </SiteShell>
    );
  }

  return <AdminDesk />;
}

function AdminDesk() {
  const { setContent } = useSiteContent();
  const [draft, setDraft] = useState<SiteContent>(DEFAULT_CONTENT);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [stripeSecret, setStripeSecret] = useState("");
  const [stripeHint, setStripeHint] = useState("");
  const [stripeReady, setStripeReady] = useState(false);
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [posts, setPosts] = useState<SitePost[]>([]);
  const [mail, setMail] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<
    Array<{
      sessionId: string;
      email: string;
      paymentStatus: string;
      amountTotal: number;
      products: string;
      createdAt: string;
    }>
  >([]);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    description: "",
    dollars: "59.90",
    stripePriceId: "",
    addon: false,
    active: true,
  });
  const [postForm, setPostForm] = useState({
    id: "",
    title: "",
    body: "",
    url: "",
    kind: "discord" as SitePost["kind"],
    published: true,
  });

  const refreshLists = () => {
    void loadAllCatalog()
      .then(setProducts)
      .catch(() => undefined);
    void loadAllPosts()
      .then(setPosts)
      .catch(() => undefined);
    void loadInquiries()
      .then(setMail)
      .catch(() => undefined);
    void loadOrders()
      .then(setOrders)
      .catch(() => undefined);
  };

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
    refreshLists();
  }, [setContent]);

  const saveSite = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const saved = await saveSiteContent({ data: draft });
      setDraft(saved);
      setContent(saved);
      setStatus("Site updated.");
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
      setStatus("Stripe key saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save the Stripe key.");
    } finally {
      setBusy(false);
    }
  };

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await saveCatalogProduct({
        data: {
          id: productForm.id || undefined,
          name: productForm.name,
          description: productForm.description,
          unitAmountCents: Math.max(100, Math.round(Number(productForm.dollars) * 100) || 5990),
          stripePriceId: productForm.stripePriceId,
          addon: productForm.addon,
          active: productForm.active,
        },
      });
      setProductForm({
        id: "",
        name: "",
        description: "",
        dollars: "59.90",
        stripePriceId: "",
        addon: false,
        active: true,
      });
      refreshLists();
      setStatus("Product saved and linked to Stripe checkout.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save product.");
    } finally {
      setBusy(false);
    }
  };

  const savePost = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      await saveSitePost({
        data: {
          id: postForm.id || undefined,
          title: postForm.title,
          body: postForm.body,
          url: postForm.url,
          kind: postForm.kind,
          published: postForm.published,
        },
      });
      setPostForm({ id: "", title: "", body: "", url: "", kind: "discord", published: true });
      refreshLists();
      setStatus("Post published on the site.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Could not save post.");
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
    window.location.assign("/");
  };

  const priceDollars = Math.round(draft.priceCents) / 100;
  const compareDollars = Math.round(draft.comparePriceCents) / 100;

  return (
    <SiteShell chat={false}>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Operator desk</p>
            <h1 className="mt-1 text-4xl">Edit the site</h1>
            <p className="mt-2 text-sm text-muted">
              Products go to Stripe checkout. Posts (Discord, groups) show in the footer. Customers never see this page.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={() => void leave()}>
            Sign out
          </Button>
        </div>

        <section className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Mailbox</h2>
          <p className="text-sm text-muted">
            Visitor questions. Gmail copy goes to {INBOX}. Reply to the email on each card — that is
            their address.
          </p>
          {mail.length === 0 ? (
            <p className="text-sm text-muted">No messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {mail.map((item) => (
                <li key={item.id} className="rounded-2xl bg-paper p-4 shadow-(--shadow-card)">
                  <p className="text-sm font-medium">
                    {item.name}{" "}
                    <a className="text-accent underline" href={`mailto:${item.email}`}>
                      {item.email}
                    </a>
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{item.message}</p>
                  <p className="mt-2 text-xs text-subtle">
                    {item.createdAt}
                    {item.mailed ? " · forwarded to Gmail" : " · saved here (confirm FormSubmit in Gmail once)"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Stripe orders</h2>
          <p className="text-sm text-muted">
            Paid checkouts land here after Stripe confirms. Reply to the buyer email with the toolkit.
          </p>
          {orders.length === 0 ? (
            <p className="text-sm text-muted">No paid orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li key={order.sessionId} className="rounded-2xl bg-paper p-4 shadow-(--shadow-card)">
                  <p className="text-sm font-medium">
                    <a className="text-accent underline" href={`mailto:${order.email}`}>
                      {order.email || "no email"}
                    </a>{" "}
                    · {formatUsd(order.amountTotal)} · {order.paymentStatus}
                  </p>
                  <p className="mt-1 text-xs text-subtle">
                    {order.products || "All Access"} · {order.createdAt}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form onSubmit={saveKey} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Stripe</h2>
          <p className="text-sm text-muted">
            {stripeReady
              ? `Key connected (${stripeHint}).`
              : "Paste the Secret key from Stripe Dashboard → Developers → API keys."}
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

        <form onSubmit={saveProduct} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Stripe products</h2>
          <p className="text-sm text-muted">
            Add products in the Stripe Dashboard, copy the Price ID (`price_…`), and paste it here.
            Checkout then uses that Stripe product so you can change price or name in Stripe without
            touching code. If Price ID is empty, Stripe charges the USD amount below.
          </p>
          <ul className="space-y-2 text-sm">
            {products.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2">
                <button
                  type="button"
                  className="text-left"
                  onClick={() =>
                    setProductForm({
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      dollars: String(product.unitAmountCents / 100),
                      stripePriceId: product.stripePriceId,
                      addon: product.addon,
                      active: product.active,
                    })
                  }
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="text-muted">
                    {" "}
                    · {formatUsd(product.unitAmountCents)}
                    {product.stripePriceId ? ` · ${product.stripePriceId}` : ""}
                    {product.addon ? " · add-on" : ""}
                    {product.active ? "" : " · hidden"}
                  </span>
                </button>
                {product.id !== "all-access" ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      void deleteCatalogProduct({ data: { id: product.id } }).then(refreshLists);
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>
          <Field label="Name" value={productForm.name} onChange={(name) => setProductForm({ ...productForm, name })} />
          <Field
            label="Description"
            value={productForm.description}
            onChange={(description) => setProductForm({ ...productForm, description })}
          />
          <Field
            label="Price (USD)"
            value={productForm.dollars}
            onChange={(dollars) => setProductForm({ ...productForm, dollars })}
          />
          <Field
            label="Stripe Price ID from Dashboard"
            value={productForm.stripePriceId}
            onChange={(stripePriceId) => setProductForm({ ...productForm, stripePriceId })}
            placeholder="price_…"
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={productForm.addon}
              onChange={(e) => setProductForm({ ...productForm, addon: e.target.checked })}
            />
            Add-on (optional extra at checkout)
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={productForm.active}
              onChange={(e) => setProductForm({ ...productForm, active: e.target.checked })}
            />
            Active
          </label>
          <Button type="submit" disabled={busy || productForm.name.trim().length < 2}>
            {productForm.id ? "Update product" : "Add product"}
          </Button>
        </form>

        <form onSubmit={savePost} className="space-y-4 rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
          <h2 className="text-2xl">Posts & community links</h2>
          <p className="text-sm text-muted">Discord, group links, and notes published in the footer.</p>
          <ul className="space-y-2 text-sm">
            {posts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2">
                <button
                  type="button"
                  className="text-left"
                  onClick={() =>
                    setPostForm({
                      id: post.id,
                      title: post.title,
                      body: post.body,
                      url: post.url,
                      kind: post.kind,
                      published: post.published,
                    })
                  }
                >
                  <span className="font-medium">{post.title}</span>
                  <span className="text-muted">
                    {" "}
                    · {post.kind}
                    {post.published ? "" : " · draft"}
                  </span>
                </button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void deleteSitePost({ data: { id: post.id } }).then(refreshLists);
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Field label="Title" value={postForm.title} onChange={(title) => setPostForm({ ...postForm, title })} />
          <Field label="Body" value={postForm.body} onChange={(body) => setPostForm({ ...postForm, body })} />
          <Field
            label="https link"
            value={postForm.url}
            onChange={(url) => setPostForm({ ...postForm, url })}
            placeholder="https://discord.gg/…"
          />
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Kind</span>
            <select
              value={postForm.kind}
              onChange={(e) => setPostForm({ ...postForm, kind: e.target.value as SitePost["kind"] })}
              className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
            >
              <option value="discord">Discord</option>
              <option value="group">Group</option>
              <option value="news">News</option>
              <option value="link">Link</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={postForm.published}
              onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
            />
            Published
          </label>
          <Button type="submit" disabled={busy || postForm.title.trim().length < 2}>
            {postForm.id ? "Update post" : "Publish post"}
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
                step="0.01"
                value={priceDollars}
                onChange={(e) =>
                  setDraft({ ...draft, priceCents: Math.max(1, Math.round(Number(e.target.value) * 100) || 5990) })
                }
                className="h-11 w-full rounded-lg bg-paper px-3 shadow-(--shadow-card)"
              />
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
          {draft.heroClips.map((clip, i) => (
            <div key={i} className="grid gap-3 rounded-2xl bg-paper p-4 sm:grid-cols-2">
              <Field
                label={`Clip ${i + 1}`}
                value={clip.src}
                onChange={(src) => {
                  const heroClips = draft.heroClips.map((item, idx) => (idx === i ? { ...item, src } : item));
                  setDraft({ ...draft, heroClips });
                }}
              />
              <Field
                label="Poster"
                value={clip.poster}
                onChange={(poster) => {
                  const heroClips = draft.heroClips.map((item, idx) => (idx === i ? { ...item, poster } : item));
                  setDraft({ ...draft, heroClips });
                }}
              />
            </div>
          ))}
          <Button type="submit" disabled={busy}>
            Save hero media
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
            Save gallery
          </Button>
        </form>

        {status ? <p className="rounded-lg bg-chip px-3 py-2 text-sm">{status}</p> : null}
        <p className="text-sm text-muted">
          <Link to="/" className="underline">
            View site
          </Link>
        </p>
      </main>
    </SiteShell>
  );
}
