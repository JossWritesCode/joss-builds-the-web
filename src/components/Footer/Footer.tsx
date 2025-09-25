import Section from "../Section";
import { site } from "../../config/siteConfig";

function Footer() {
  return (
    <footer className="mt-16 border-t border-dracula-muted/20">
      <Section className="py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            className="hover:text-dracula-highlight"
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </Section>
    </footer>
  );
}
export default Footer;
