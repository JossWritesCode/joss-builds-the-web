import SEO from "../components/SEO";
import Section from "../components/Section";
import { Card, CardBody } from "../components/ui/Card";

const items = [
  {
    title: "Business Websites",
    desc: "Professional, mobile-first sites that convert visitors into customers.",
  },
  {
    title: "Online Stores",
    desc: "Shopify or WooCommerce setups with products, payments, and shipping.",
  },
  {
    title: "Fixes & Upgrades",
    desc: "Performance, accessibility, SEO improvements, and content updates.",
  },
];

function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Builds, shops, and upgrades tailored to small businesses."
      />
      <Section className="py-10 grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <Card key={it.title}>
            <CardBody>
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-dracula-muted">{it.desc}</p>
            </CardBody>
          </Card>
        ))}
      </Section>
    </>
  );
}
export default Services;
