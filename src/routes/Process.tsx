import { motion, useReducedMotion } from "framer-motion";
import { PhoneCall, PencilRuler, Hammer, Rocket } from "lucide-react";
import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import { Card, CardBody } from "../components/ui/Card";
import type { LucideIcon } from "lucide-react";

type Step = {
  t: string;
  d: string;
  bullets: string[];
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    t: "Call",
    d: "30-minute chat about your goals and audience.",
    bullets: [
      "Clarify vision & scope",
      "Spot risks early",
      "Realistic timeline & budget",
    ],
    icon: PhoneCall,
  },
  {
    t: "Mockup",
    d: "See a free homepage design within 3 business days—before you commit.",
    bullets: [
      "Get a real preview of your site's look & feel",
      "Fast edits with your actual content",
      "Easy to share with partners or stakeholders",
    ],
    icon: PencilRuler,
  },
  {
    t: "Build",
    d: "Fast, accessible, mobile-first implementation.",
    bullets: [
      "A11y & SEO foundations",
      "Performance budgets",
      "CMS or headless setup",
    ],
    icon: Hammer,
  },
  {
    t: "Launch",
    d: "Deploy + basic SEO + analytics. Training included.",
    bullets: [
      "Custom domain & SSL",
      "Analytics events wired",
      "Editor training video",
    ],
    icon: Rocket,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

function Process() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Process"
        description="A simple four-step process: Call → Mockup → Build → Launch."
      />
      <Section className="relative overflow-hidden py-16 md:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-28 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(189,147,249,0.12),transparent_60%)]" />
          <div className="absolute -bottom-28 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(98,114,164,0.10),transparent_60%)]" />
        </div>
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 top-[9.5rem] h-1 w-[1200px] -translate-x-1/2 rounded-full bg-dracula-muted/25"
        />
        <motion.div
          className="relative z-10 mx-auto max-w-[90rem]"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="mb-10 md:mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              A simple, transparent process
            </h1>
            <p className="mt-3 text-sm md:text-base text-dracula-muted">
              From first chat to launch—clear steps, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.t}
                  variants={item}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          filter: [
                            "drop-shadow(0 0 0 rgba(189,147,249,0))",
                            "drop-shadow(0 8px 16px rgba(189,147,249,0.35))",
                            "drop-shadow(0 0 0 rgba(189,147,249,0))",
                          ],
                          transition: { duration: 0.9, delay: 0.45 + i * 0.15 },
                        }
                  }
                  whileTap={{ scale: 0.98 }}
                  className="h-full"
                >
                  <Card
                    role="button"
                    className="h-full cursor-pointer transition-transform md:will-change-transform transform-gpu
             active:scale-[0.98] md:active:scale-100
             md:hover:-translate-y-1 md:hover:rotate-[0.25deg] md:hover:scale-[1.01]"
                  >
                    <CardBody className="relative text-center px-6 py-8 md:px-8 md:py-10">
                      <div className="hidden md:block absolute -top-4 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-dracula-accent shadow-[0_0_0_8px_rgba(189,147,249,0.14)]" />

                      <div className="mx-auto mb-4 md:mb-6 relative inline-flex">
                        <div
                          className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-xl
                                     bg-gradient-to-br from-dracula-accent/20 to-[#ff79c6]/20
                                     ring-1 ring-inset ring-dracula-accent/20"
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5 md:h-6 md:w-6 text-dracula-accent" />
                        </div>
                        <div
                          className="absolute -top-2 -right-2 flex items-center justify-center h-7 w-7 md:h-8 md:w-8
                                     rounded-full bg-dracula-accent text-white text-sm md:text-base font-semibold shadow-soft"
                          aria-hidden="true"
                        >
                          {i + 1}
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-semibold">
                        {s.t}
                      </h3>
                      <p className="mt-2 md:mt-3 text-sm md:text-base text-dracula-muted leading-relaxed">
                        {s.d}
                      </p>

                      <ul className="mt-6 md:mt-7 text-left text-sm md:text-[15px] space-y-2.5 mx-auto max-w-[24rem]">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex gap-2.5 items-start">
                            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-dracula-accent" />
                            <span className="text-dracula-text/85">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4 }}
              className="text-center text-sm md:text-base text-dracula-muted"
            >
              🚀 Ready to see your homepage mockup this week?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl2 px-5 py-3 text-sm md:text-base font-medium
                  bg-dracula-accent text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                Book a free call
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}

export default Process;
