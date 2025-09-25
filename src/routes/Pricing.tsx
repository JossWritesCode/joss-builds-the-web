import SEO from "../components/SEO";
import Section from "../components/Section";
import PricingCard from "../components/PricingCard";
import { pricing } from "../config/siteConfig";

function Pricing() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Transparent pricing for Starter, Business, and Shop engagements."
      />
      <Section className="py-10">
        <div className="grid md:grid-cols-3 gap-6">
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
