import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { loadPublicPosts } from "@/lib/catalog-fns";
import type { SitePost } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function SiteFooter() {
  const { content } = useSiteContent();
  const [posts, setPosts] = useState<SitePost[]>([]);

  useEffect(() => {
    void loadPublicPosts()
      .then(setPosts)
      .catch(() => undefined);
  }, []);

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="space-y-3 md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-md bg-ink text-[11px] font-semibold text-paper">
              OV
            </span>
            <span className="font-semibold">{SITE.name}</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{content.tagline}</p>
          <p className="text-sm text-muted">
            <a className="hover:text-fg" href={`mailto:${content.email}`}>
              {content.email}
            </a>
          </p>
          <p className="text-sm text-muted">
            30+ people online. Tools emailed within 24 hours of payment.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-subtle uppercase">Product</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/course" className="hover:text-muted">
                Course demo
              </Link>
            </li>
            <li>
              <Link to="/toolkit" className="hover:text-muted">
                Toolkit demo
              </Link>
            </li>
            <li>
              <Link to="/prompt" className="hover:text-muted">
                VoidPrompt
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-muted">
                Mailbox
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-subtle uppercase">Community</p>
          <ul className="space-y-2 text-sm">
            {content.discordUrl ? (
              <li>
                <a className="hover:text-muted" href={content.discordUrl} target="_blank" rel="noreferrer">
                  Discord
                </a>
              </li>
            ) : null}
            {posts.map((post) =>
              post.url ? (
                <li key={post.id}>
                  <a className="hover:text-muted" href={post.url} target="_blank" rel="noreferrer">
                    {post.title}
                  </a>
                </li>
              ) : (
                <li key={post.id}>{post.title}</li>
              ),
            )}
            <li>
              <Link to="/legal" hash="privacy" className="hover:text-muted">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/legal" hash="terms" className="hover:text-muted">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/legal" hash="refund" className="hover:text-muted">
                Refunds
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Built for creators who would rather own than rent.</p>
        </div>
      </div>
    </footer>
  );
}
