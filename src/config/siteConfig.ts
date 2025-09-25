export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
};

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

export const pricing: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$499 setup + $50/mo",
    features: [
      "Modern 1–3 page site",
      "Mobile-first & accessible",
      "Contact form + analytics",
      "Basic SEO setup",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$1,800 flat",
    highlight: true,
    features: [
      "Custom multi-page site",
      "Copy guidance & SEO",
      "Performance optimized",
      "Launch support + training",
    ],
  },
  {
    id: "shop",
    name: "Shop",
    price: "from $3,500",
    features: [
      "Shopify / Woo storefront",
      "Payment & shipping setup",
      "Product pages & collection",
      "Conversion best practices",
    ],
  },
];
