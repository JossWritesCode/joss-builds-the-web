import { Link, NavLink } from "react-router-dom";
import Section from "../Section";
import { site } from "../../config/siteConfig";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/process", label: "Process" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-dracula-bg/80 backdrop-blur border-b border-dracula-muted/20">
      <Section className="py-3 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Go home"
          className="font-extrabold tracking-tight text-lg"
        >
          <span className="text-dracula-text">Joss </span>
          <span className="text-dracula-accent">Builds</span>
          <span className="text-dracula-text"> the Web</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="hidden md:flex gap-5">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `text-sm font-medium hover:text-dracula-highlight ${
                      isActive ? "text-dracula-accent" : "text-dracula-text"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="md:inline hidden text-sm text-dracula-text hover:text-dracula-highlight"
          href={`mailto:${site.email}`}
        >
          Email
        </a>
      </Section>
    </div>
  );
}
export default Navbar;
