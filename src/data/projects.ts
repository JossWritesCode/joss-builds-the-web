export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags: string[];
  image?: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Local Bakery",
    blurb: "Mobile-first menu & online orders.",
    tags: ["React", "Netlify"],
    image: "/images/golden-crust-bakery.png",
    link: "https://goldencrustbakery.netlify.app",
  },
  {
    id: "p2",
    title: "Yoga Studio",
    blurb: "Schedule, trainers, booking links.",
    image: "/images/ember-earth-yoga.png",
    tags: ["Vite", "Vercel"],
    link: "https://ember-and-earth-yoga.vercel.app/",
  },
  {
    id: "p3",
    title: "Contractor",
    blurb: "Services + lead-gen form.",
    tags: ["Tailwind", "SEO"],
  },
  {
    id: "p4",
    title: "Café",
    blurb: "Brand-forward one-pager.",
    tags: ["Design", "Fast"],
  },
  {
    id: "p5",
    title: "Therapist",
    blurb: "Accessible, calm, compliant.",
    tags: ["A11y", "Content"],
  },
  {
    id: "p6",
    title: "Florist",
    blurb: "Seasonal catalog layout.",
    tags: ["Grid", "UX"],
  },
];
