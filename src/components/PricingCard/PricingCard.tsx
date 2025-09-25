import { Card, CardBody, CardHeader } from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import type { PricingPlan } from "../../config/siteConfig";

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={
        plan.highlight
          ? "border-dracula-accent shadow-[0_0_0_2px_rgba(189,147,249,0.2)]"
          : ""
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          {plan.highlight && <Badge>Most popular</Badge>}
        </div>
        <p className="mt-1 text-2xl font-bold">{plan.price}</p>
      </CardHeader>
      <CardBody>
        <ul className="space-y-2 list-disc ml-5">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="mt-5">
          <Button aria-label={`Choose ${plan.name} plan`}>Get started</Button>
        </div>
      </CardBody>
    </Card>
  );
}
