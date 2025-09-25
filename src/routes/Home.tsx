import SEO from "../components/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Clean, fast, mobile-first websites that help local businesses get more customers."
      />
      <div className="bg-gradient-to-b from-white to-dracula-bg">
        <Section className="py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              I build clean, fast, mobile-first websites that help local
              businesses get more customers.
            </h1>
            <p className="mt-4 text-lg text-dracula-muted">
              Friendly process. Reliable delivery. SEO-ready. Let's get your
              site working as hard as you do.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button>Get a free homepage mockup</Button>
              </Link>
              <Link to="/work">
                <Button variant="secondary">See example projects</Button>
              </Link>
            </div>
            <div
              className="mt-10 flex flex-wrap gap-2"
              aria-label="Trust badges"
            >
              <Badge>Fast</Badge>
              <Badge>SEO-ready</Badge>
              <Badge>Reliable</Badge>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

export default Home;
