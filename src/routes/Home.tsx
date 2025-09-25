import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Link } from "react-router-dom";
import skyline from "../assets/toronto-skyline-bright.jpg";

function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Clean, fast, mobile-first websites that help local businesses get more customers."
      />
      <section className="relative isolate">
        <img
          src={skyline}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 70vw"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/55 to-black/15 md:from-black/70 md:via-black/40 md:to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 -z-10 bg-gradient-to-b from-transparent to-dracula-bg md:h-24" />

        <div className="min-h-[78vh] flex items-end pt-[env(safe-area-inset-top)]">
          <Section className="pb-8 md:pb-16">
            <div className="max-w-[34rem] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
              <h1 className="font-extrabold tracking-tight leading-tight text-[clamp(1.9rem,6vw,3rem)]">
                I build clean, fast, mobile-first websites that help local
                businesses get more customers.
              </h1>

              <p className="mt-3 text-base leading-relaxed text-white/85 md:text-lg">
                Friendly process. Reliable delivery. SEO-ready. Let&apos;s get
                your site working as hard as you do.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:max-w-md">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 text-base shadow-lg shadow-black/20"
                >
                  <Link to="/contact">Get a free homepage mockup</Link>
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="w-full h-12 text-base shadow-lg shadow-black/20"
                >
                  <Link to="/work">See example projects</Link>
                </Button>
              </div>

              <div
                className="mt-5 flex flex-wrap gap-2"
                aria-label="Trust badges"
              >
                <Badge>Fast</Badge>
                <Badge>SEO-ready</Badge>
                <Badge>Reliable</Badge>
              </div>
            </div>
          </Section>
        </div>
      </section>
    </>
  );
}

export default Home;
