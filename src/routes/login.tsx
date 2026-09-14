import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
        <Link to="/" className="text-sm text-muted hover:text-fg">
          ← {SITE.name}
        </Link>
        <h1 className="mt-4 text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Admin and saved operator notes live behind this door. Checkout itself stays on Stripe.
        </p>
        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
                className="h-11 w-full rounded-full bg-ink text-sm font-medium text-paper hover:bg-ink-2"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
      </div>
    </main>
  );
}
