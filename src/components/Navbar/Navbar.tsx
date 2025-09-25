import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className="sticky top-0 z-50 bg-dracula-bg/80 backdrop-blur border-b border-dracula-muted/20">
      <Section className="py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          aria-label="Go home"
          className="font-extrabold tracking-tight text-lg"
          onClick={close}
        >
          <span className="text-dracula-text">Joss </span>
          <span className="text-dracula-accent">Builds</span>
          <span className="text-dracula-text"> the Web</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-5">
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

        {/* Desktop email */}
        <a
          className="hidden md:inline text-sm text-dracula-text md:hover:text-dracula-highlight"
          href={`mailto:${site.email}`}
        >
          Email
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl2 p-2 text-dracula-text hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-accent/40"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </Section>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-dracula-muted/20 bg-dracula-bg/95 backdrop-blur transition-[max-height,opacity] duration-200 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile primary">
          <ul className="px-4 py-3 grid gap-2">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  onClick={close}
                  className={({ isActive }) =>
                    `block rounded-xl2 px-3 py-2 text-sm font-medium hover:bg-white/70 ${
                      isActive ? "text-dracula-accent" : "text-dracula-text"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                onClick={close}
                className="block rounded-xl2 px-3 py-2 text-sm font-medium text-dracula-text hover:bg-white/70"
              >
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
