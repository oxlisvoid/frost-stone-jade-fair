import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function SiteFooter() {
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
          <p className="max-w-sm text-sm leading-relaxed text-muted">{SITE.tagline}</p>
          <p className="text-sm text-muted">
            <a className="hover:text-fg" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
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
                Toolkit
              </Link>
            </li>
            <li>
              <Link to="/prompt" className="hover:text-muted">
                VoidPrompt
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-muted">
                All Access
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-muted">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-wide text-subtle uppercase">Legal</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/legal" hash="privacy" className="hover:text-muted">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/legal" hash="terms" className="hover:text-muted">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/legal" hash="refund" className="hover:text-muted">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/legal" hash="security" className="hover:text-muted">
                Data protection
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
