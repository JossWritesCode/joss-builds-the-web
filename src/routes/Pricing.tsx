import { useMemo, useState } from "react";
import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import PricingCard from "../components/PricingCard";
import { pricing as basePricing } from "../config/siteConfig";
import type { PricingPlan } from "../config/siteConfig";

type RenderPlan = PricingPlan & { displayPrice?: string; note?: string };

function Pricing() {
  const [yearly, setYearly] = useState(false);

  const pricing = useMemo<RenderPlan[]>(() => {
    return basePricing.map<RenderPlan>((p) => {
      if (p.displayMonthly && p.displayYearly) {
        return {
          ...p,
          displayPrice: yearly ? p.displayYearly : p.displayMonthly,
          note: yearly ? p.noteYearly : p.noteMonthly,
        };
      }
      if (p.setupPrice || p.monthlyPrice) return p;
      return {
        ...p,
        displayPrice: `${p.pricePrefix ?? "$"}${p.price ?? ""}${
          p.priceSuffix ?? ""
        }`,
      };
    });
  }, [yearly]);

  return (
    <>
      <SEO
        title="Pricing"
        description="Transparent pricing for Starter, Business, and Shop engagements."
      />
      <Section className="py-10">
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setYearly(false)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              !yearly ? "bg-dracula-accent text-white" : "text-dracula-ink"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              yearly ? "bg-dracula-accent text-white" : "text-dracula-ink"
            }`}
          >
            Yearly{" "}
            <span className="ml-1 text-xs opacity-80">(save 2 months)</span>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-6 text-xs text-dracula-muted">
          * Pricing is a starting point and may vary based on scope and
          integrations.
        </p>
      </Section>
    </>
  );
}

export default Pricing;
