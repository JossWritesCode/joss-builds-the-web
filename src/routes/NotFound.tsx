import SEO from "../components/SEO";
import Section from "../components/Section";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" />
      <Section className="py-16 text-center">
        <h1 className="text-4xl font-extrabold">404</h1>
        <p className="mt-2 text-dracula-muted">
          Sorry, we couldn’t find that page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block underline text-dracula-accent"
        >
          Go back home
        </Link>
      </Section>
    </>
  );
}
