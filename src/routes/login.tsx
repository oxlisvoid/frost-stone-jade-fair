import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { deskLogin } from "@/lib/content-fns";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");

  const social = async (providerId: string) => {
    setError("");
    setBusy(true);
    try {
      await signIn(providerId, { callbackURL: "/admin", errorCallbackURL: "/login" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google / X sign-in failed. Use email or the operator password.");
      setBusy(false);
    }
  };

  const emailAuth = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: "Operator",
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: "/admin",
        });
        if (err) throw new Error(err.message ?? "Could not sign in");
      }
      await navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Email sign-in failed.");
      setBusy(false);
    }
  };

  const pinAuth = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      await deskLogin({ data: { password: pin } });
      await navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open the panel.");
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-6 shadow-(--shadow-card)">
        <Link to="/" className="text-sm text-muted hover:text-fg">
          ← {SITE.name}
        </Link>
        <h1 className="mt-4 text-3xl">Operator sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Customers pay on Stripe. This door is only for editing the site.
        </p>

        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                disabled={busy}
                onClick={() => void social(p.providerId)}
                className="h-11 w-full rounded-full bg-ink text-sm font-medium text-paper hover:bg-ink-2 disabled:opacity-60"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Social sign-in is disabled.</p>
          )}
        </div>

        <form onSubmit={emailAuth} className="mt-6 space-y-3 border-t border-line pt-5">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Email</p>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@oxlisvoid.com"
            className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
            autoComplete="email"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minLength={8}
            className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
            autoComplete={mode === "up" ? "new-password" : "current-password"}
          />
          <button
            type="submit"
            disabled={busy}
            className="h-11 w-full rounded-full bg-ink text-sm font-medium text-paper hover:bg-ink-2 disabled:opacity-60"
          >
            {busy ? "Working…" : mode === "up" ? "Create operator account" : "Sign in with email"}
          </button>
          <button
            type="button"
            className="w-full text-center text-xs text-muted hover:text-fg"
            onClick={() => setMode((m) => (m === "in" ? "up" : "in"))}
          >
            {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
          </button>
        </form>

        <form onSubmit={pinAuth} className="mt-5 space-y-3 border-t border-line pt-5">
          <p className="text-xs font-semibold tracking-wide text-subtle uppercase">Panel password</p>
          <input
            required
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Operator password"
            className="h-11 w-full rounded-lg bg-paper px-3 text-sm shadow-(--shadow-card)"
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={busy}
            className="h-11 w-full rounded-full border border-line text-sm font-medium hover:bg-paper disabled:opacity-60"
          >
            Open panel
          </button>
        </form>

        {error ? <p className="mt-4 rounded-lg bg-chip px-3 py-2 text-sm text-accent">{error}</p> : null}
      </div>
    </main>
  );
}
