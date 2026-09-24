import { Link } from "@tanstack/react-router";

export function PromoBanner() {
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-center text-sm sm:flex-row sm:text-left sm:px-6">
        <p>
          <span className="font-medium">OXLISVOID — AI model system.</span> Get access now for $9.99 · one-time · no subscription.
        </p>
        <Link to="/checkout" className="shrink-0 font-medium text-accent-fg underline-offset-4 hover:underline">
          Get access →
        </Link>
      </div>
    </div>
  );
}
