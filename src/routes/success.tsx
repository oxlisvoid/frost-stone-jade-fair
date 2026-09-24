import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { useAccess } from "@/lib/access";
import { loadCheckoutSession } from "@/lib/checkout-fn";

export const Route = createFileRoute("/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : "",
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { session_id } = Route.useSearch();
  const unlock = useAccess((s) => s.unlock);
  const [state, setState] = useState<"loading" | "paid" | "pending" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!session_id) {
      setState("error");
      setMessage("Missing checkout session.");
      return;
    }
    let cancelled = false;
    void loadCheckoutSession({ data: { sessionId: session_id } })
      .then((session) => {
        if (cancelled) return;
        setEmail(session.customerEmail ?? null);
        if (session.paid) {
          unlock();
          setState("paid");
        } else {
          setState("pending");
          setMessage("Payment is still processing. Refresh this page in a moment.");
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState("error");
        setMessage(err instanceof Error ? err.message : "Could not verify payment.");
      });
    return () => {
      cancelled = true;
    };
  }, [session_id, unlock]);

  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        {state === "loading" ? <p className="text-muted">Confirming Stripe payment…</p> : null}
        {state === "paid" ? (
          <>
            <p className="text-sm font-medium text-good">Payment confirmed</p>
            <h1 className="mt-2 text-4xl">Check your email</h1>
            <p className="mt-4 text-muted">
              Stripe captured the payment{email ? ` for ${email}` : ""}. The toolkit and course on this
              site are demos. The real workflows, tutorials, playbooks, and prompt libraries are
              emailed to that address in under 8 hours.
            </p>
            <p className="mt-3 text-sm text-muted">
              Check spam and promotions. More than 30 people are online if you need a hand —
              reply to the delivery email or write oxlisvoid1@gmail.com.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link to="/toolkit">Browse the demo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/">Back home</Link>
              </Button>
            </div>
          </>
        ) : null}
        {state === "pending" || state === "error" ? (
          <>
            <h1 className="text-4xl">{state === "error" ? "Not confirmed" : "Almost"}</h1>
            <p className="mt-3 text-muted">{message}</p>
            <Button asChild className="mt-6">
              <Link to="/checkout">Back to checkout</Link>
            </Button>
          </>
        ) : null}
      </main>
    </SiteShell>
  );
}
