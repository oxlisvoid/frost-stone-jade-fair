import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/canceled")({
  component: CanceledPage,
});

function CanceledPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-sm font-medium text-accent">Checkout canceled</p>
        <h1 className="mt-2 text-4xl">No charge was made.</h1>
        <p className="mt-3 text-muted">
          You left Stripe before paying. Your card was not charged. You can pick up All Access whenever you
          are ready.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/checkout">Return to checkout</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/" hash="pricing">
              View pricing
            </Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
