import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Section from "../Section";
import { site } from "../../config/siteConfig";
import logo from "../../assets/logo.png";
import { Mail, Menu } from "lucide-react";

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
  const location = useLocation();

  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inPanel = mobilePanelRef.current?.contains(target);
      const onToggle = toggleBtnRef.current?.contains(target);
      if (!inPanel && !onToggle) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      } as any);
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50 bg-dracula-bg/80 backdrop-blur border-b border-dracula-muted/20">
      <Section className="py-3 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Go home"
          className="flex items-center gap-2 font-extrabold tracking-tight text-lg"
          onClick={close}
        >
          <img
            src={logo}
            alt="Joss Builds the Web logo"
            className="h-8 w-auto"
          />
          <span>
            <span className="text-dracula-text">Joss </span>
            <span className="text-dracula-accent">Builds</span>
            <span className="text-dracula-text"> the Web</span>
          </span>
        </Link>

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

        <a
          className="hidden md:inline text-sm text-dracula-text md:hover:text-dracula-highlight"
          href={`mailto:${site.email}`}
          aria-label="Email"
        >
          <Mail className="w-5 h-5" />
        </a>

        <button
          ref={toggleBtnRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-xl2 p-2 text-dracula-text hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dracula-accent/40"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </Section>

      <div
        id="mobile-menu"
        ref={mobilePanelRef}
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
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
