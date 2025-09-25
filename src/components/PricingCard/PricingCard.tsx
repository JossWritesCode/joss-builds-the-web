import { cn } from "../utils";
import type { PricingPlan } from "../../config/siteConfig";

type Plan = PricingPlan & { displayPrice?: string; note?: string };

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl2 border border-dracula-border bg-white p-5 shadow-soft transition",
        plan.popular
          ? "ring-1 ring-dracula-accent/30"
          : "hover:shadow-lg hover:ring-1 hover:ring-dracula-accent/20"
      )}
    >
      {(plan.popular || plan.badge) && (
        <div className="absolute -right-2 -top-2 rounded-lg bg-dracula-accent px-2 py-1 text-xs font-semibold text-white shadow-soft">
          {plan.badge ?? "Most popular"}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-dracula-ink">{plan.name}</h3>

        <div className="mt-2 text-dracula-ink">
          {/* setup + monthly */}
          {plan.setupPrice || plan.monthlyPrice ? (
            <>
              {plan.setupPrice && (
                <div className="text-xl font-semibold">{plan.setupPrice}</div>
              )}
              {plan.monthlyPrice && (
                <div className="text-sm text-dracula-muted">
                  + {plan.monthlyPrice}
                </div>
              )}
            </>
          ) : (
            // flat or toggle (already formatted)
            <div className="text-xl font-semibold">
              {plan.fromPrice && (
                <span className="mr-1 text-base text-dracula-muted">from</span>
              )}
              {plan.displayPrice}
            </div>
          )}

          {plan.note && (
            <p className="mt-1 text-sm text-dracula-muted">{plan.note}</p>
          )}
        </div>

        <ul className="mt-4 space-y-2 text-sm text-dracula-text">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-1 inline-block h-4 w-4 shrink-0 rounded-full bg-dracula-accent/15"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <a
          href={plan.ctaHref ?? "/contact"}
          className={cn(
            "inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-accent/40",
            plan.popular
              ? "bg-dracula-accent text-white shadow-soft hover:opacity-90"
              : "text-dracula-ink hover:bg-dracula-border/40"
          )}
        >
          {plan.ctaText ?? "Get started"}
        </a>
        <a
          href="/process"
          className="text-sm text-dracula-accentDark underline-offset-4 hover:underline"
        >
          What’s included?
        </a>
      </div>
    </div>
  );
}
