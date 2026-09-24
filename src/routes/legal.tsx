import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { OFFER, SITE } from "@/lib/site";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl space-y-14 px-4 py-16 sm:px-6">
        <section id="privacy">
          <h1 className="text-4xl tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {SITE.name} collects name and email at checkout so we can email the toolkit.
            Stripe processes the card on their domain — we never store PAN, expiry, or CVC.
            Download and delivery logs may include time and IP as proof. We do not sell lists.
            Contact{" "}
            <a className="text-fg underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </section>
        <section id="terms">
          <h2 className="text-4xl tracking-tight">Terms of Service</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              You must be 18 or older. All Access ({OFFER.priceLabel}) is a license to use
              OxlisVoid workflows, tutorials, and files to produce original work.
              Redistributing the graphs as a competing pack is not allowed.
            </p>
            <p>
              Payment is captured by Stripe before we email the workflows and files (in under 8 hours).
              You are responsible for how you publish generated characters.
            </p>
          </div>
        </section>
        <section id="refund">
          <h2 className="text-4xl tracking-tight">Refund Policy</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            <p>
              Email {SITE.email} from the checkout address within 30 days of payment, with the Stripe
              receipt. We refund the purchase. One refund per order. Say it is not for you. That is enough.
            </p>
            <p>
              Duplicate charges are refunded as well. Chargebacks filed after a completed refund are contested
              with the receipt and this policy.
            </p>
          </div>
        </section>
        <section id="security">
          <h2 className="text-4xl tracking-tight">Data protection</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>TLS in production (your live domain).</li>
            <li>No card data on our origin.</li>
            <li>Operator desk is password-gated and not linked from the public site.</li>
            <li>The toolkit and course on this site are demos. Paid files are emailed after Stripe confirms payment.</li>
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}
