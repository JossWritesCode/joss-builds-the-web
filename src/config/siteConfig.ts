export const site = {
  name: "Joss Builds the Web",
  title: "Web Developer — React • WordPress • Shopify",
  email: "hello@jossbuildstheweb.com",
  location: "Toronto, ON",
  phone: "",
  links: {
    github: "https://github.com/josswritescode",
  },
  seo: {
    defaultTitle: "Joss Builds the Web",
    defaultDescription:
      "Clean, fast, mobile-first websites that help local businesses get more customers.",
    url: "https://jossbuildstheweb.com",
    image: "/og-image.png",
  },
  contact: {
    formProvider: "formspree" as "formspree" | "netlify",
  },
};

export type PricingPlan = {
  id: string;
  name: string;
  features: string[];
  ctaHref?: string;
  ctaText?: string;
  popular?: boolean;
  badge?: string;

  // 1) setup+monthly (Starter)
  setupPrice?: string; // "$499 setup"
  monthlyPrice?: string; // "$50/mo"

  // 2) toggle (Business) – preformatted strings, no math
  displayMonthly?: string; // "$200/mo"
  displayYearly?: string; // "$2,000/yr"
  noteMonthly?: string; // "Month-to-month; cancel anytime."
  noteYearly?: string; // "2 months free when billed yearly."

  // 3) flat (Shop)
  price?: string;
  pricePrefix?: string;
  priceSuffix?: string;
  fromPrice?: boolean;
};
export const pricing: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    setupPrice: "$699 setup",
    monthlyPrice: "$65/mo",
    features: [
      "Modern 1–3 page site",
      "Mobile-first & accessible",
      "Contact form + basic analytics",
      "SEO essentials (titles, meta, sitemap)",
      "Care plan: security updates, backups, minor content edits",
      "Hosting included or client-owned hosting supported",
    ],
    ctaHref: "/contact",
  },
  {
    id: "business",
    name: "Business",
    popular: true,
    badge: "Most popular",
    displayMonthly: "$225/mo",
    displayYearly: "$2,400/yr",
    noteMonthly:
      "Month-to-month with a one-time $600 setup for new builds (3-month minimum).",
    noteYearly: "Pay yearly and save ~$300 — setup fee waived for new builds.",
    features: [
      "Custom multi-page site tailored to your brand",
      "Copy guidance + on-page SEO",
      "Ongoing content updates & priority support",
      "Performance optimization + analytics dashboard",
      "Launch support + handoff training",
      "Hosting included or client-owned hosting supported",
    ],
    ctaHref: "/contact",
  },
  {
    id: "shop",
    name: "Shop",
    fromPrice: true,
    pricePrefix: "$",
    price: "3,600",
    priceSuffix: "",
    features: [
      "Shopify or WooCommerce storefront",
      "Payments + shipping configured",
      "Theme setup + conversion best practices",
      "Up to 25 products (more by quote)",
      "Owner training + launch checklist",
      "Optional care plan for promos & ongoing updates",
    ],
    ctaHref: "/contact",
  },
];
