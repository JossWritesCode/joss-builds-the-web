import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import { Card, CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Store,
  Wrench,
  CheckCircle,
  Zap,
  Rocket,
} from "lucide-react";

type Bullet = { text: string; type?: "check" | "rocket" | "spark" };
type Item = {
  title: string;
  desc: string;
  icon: React.ReactNode;
  bullets: Bullet[];
  from?: string;
  accent?: string;
  highlight?: boolean;
};

const items: Item[] = [
  {
    title: "Business Websites",
    desc: "Mobile-first sites designed to convert.",
    icon: <Briefcase className="w-6 h-6" aria-hidden />,
    bullets: [
      { text: "Speed boosts", type: "rocket" },
      { text: "SEO & copy", type: "check" },
      { text: "Launch + training", type: "check" },
    ],
    from: "From $1.5k",
    accent: "from-ink/10 to-transparent",
  },
  {
    title: "Online Stores",
    desc: "Shopify or Woo setups with payments & shipping.",
    icon: <Store className="w-6 h-6" aria-hidden />,
    bullets: [
      { text: "Product setup", type: "check" },
      { text: "Payments & tax", type: "check" },
      { text: "Shipping rules", type: "check" },
    ],
    from: "From $2.5k",
    accent: "from-ink/10 to-transparent",
  },
  {
    title: "Fixes & Upgrades",
    desc: "Speed, accessibility, SEO, and care plans.",
    icon: <Wrench className="w-6 h-6" aria-hidden />,
    bullets: [
      { text: "Speed boosts", type: "rocket" },
      { text: "Accessibility", type: "check" },
      { text: "Care plans", type: "spark" },
    ],
    from: "Hourly & Flat-rate",
    accent: "from-ink/10 to-transparent",
  },
];

function BulletIcon({ type }: { type?: Bullet["type"] }) {
  if (type === "rocket")
    return <Rocket className="w-4 h-4 text-dracula-accent" aria-hidden />;
  if (type === "spark")
    return <Zap className="w-4 h-4 text-dracula-accent" aria-hidden />;
  return <CheckCircle className="w-4 h-4 text-dracula-accent" aria-hidden />;
}

function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Builds, shops, and upgrades tailored to small businesses."
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(189,147,249,0.06),transparent_70%)]"
        />

        <Section className="py-10">
          <header className="max-w-3xl mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-dracula-text">
              Websites that look sharp and win customers
            </h1>
            <p className="mt-2 text-dracula-muted">
              Pick a starting point below. Every package includes clear
              timelines, accessible design, and a smooth launch.
            </p>
          </header>

          <div className="grid md:grid-cols-3 items-stretch gap-6">
            {items.map((it) => (
              <Card
                key={it.title}
                className={[
                  "group transition-all duration-200",
                  "md:hover:-translate-y-0.5 md:hover:shadow-lg",
                  "active:translate-y-[1px] active:shadow",
                  "h-full",
                  it.highlight
                    ? "border-dracula-accent/30 ring-1 ring-dracula-accent/15"
                    : "border-border",
                ].join(" ")}
              >
                <div
                  className={`h-1 rounded-t-md bg-gradient-to-r ${it.accent}`}
                />

                <CardBody className="p-6 flex h-full flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-ink/[0.06] p-2 text-ink/80 md:group-hover:text-dracula-accent">
                        {it.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-dracula-text">
                        {it.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm text-dracula-muted">{it.desc}</p>

                    <ul className="mt-4 space-y-2 text-sm">
                      {it.bullets.map((b) => (
                        <li key={b.text} className="flex items-center gap-2">
                          <BulletIcon type={b.type} />
                          <span className="text-dracula-text">{b.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex gap-2 w-full">
                      <Button
                        asChild
                        size="sm"
                        className="flex-1 justify-center md:group-hover:shadow-soft active:scale-[0.98]"
                      >
                        <Link
                          to="/pricing"
                          aria-label={`View pricing for ${it.title}`}
                        >
                          View pricing
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="flex-1 justify-center text-ink/80 md:hover:text-dracula-accentDark active:scale-[0.98]"
                      >
                        <Link
                          to="/work"
                          aria-label={`See examples of ${it.title}`}
                        >
                          See examples
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div
            className="
              mt-10 rounded-xl2 border border-dracula-muted/20 bg-white p-4 shadow-soft
              flex flex-col gap-4
              md:flex-row md:items-center md:justify-between md:gap-3
            "
          >
            <p className="text-sm text-dracula-text md:max-w-[60ch]">
              Not sure which option fits?{" "}
              <span className="text-dracula-accentDark">
                I'll recommend one in a 15-min call.
              </span>
            </p>

            <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto active:scale-[0.98]"
              >
                <Link to="/contact">Book a quick chat</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full md:w-auto active:scale-[0.98]"
              >
                <Link to="/pricing">Compare packages</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center md:text-right">
            <Link
              to="/pricing"
              className="text-sm text-dracula-accentDark md:hover:underline"
            >
              Compare services & pricing →
            </Link>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Services;
