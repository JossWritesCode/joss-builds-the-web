import { useState, useMemo } from "react";
import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import { site } from "../config/siteConfig";

type SendState = "idle" | "sending" | "ok" | "error";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function Contact() {
  const [status, setStatus] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [website, setWebsite] = useState("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      isValidEmail(email) &&
      message.trim().length > 0 &&
      website.trim() === "" && // honeypot must be empty
      status !== "sending"
    );
  }, [name, email, message, website, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    if (!canSubmit) {
      setStatus("idle");
      setErrorMsg("Please fill out your name, a valid email, and a message.");
      return;
    }

    setStatus("sending");
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        website: website.trim(), // honeypot
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg =
          (typeof data?.error === "string" && data.error) ||
          "Something went wrong sending your message.";
        setStatus("error");
        setErrorMsg(msg);
        return;
      }

      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please email me directly.");
    }
  }

  return (
    <>
      <SEO title="Contact" description="Get in touch to start your project." />
      <Section className="py-10 max-w-2xl">
        <p className="mb-6">
          Prefer email?{" "}
          <span className="text-dracula-accent">{site.email}</span>
        </p>

        {status === "ok" && (
          <div
            role="status"
            className="mb-4 p-3 rounded-md bg-dracula-accent/10 border border-dracula-accent/30"
          >
            Thanks! I'll get back to you soon.
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700"
          >
            {errorMsg ?? "Something went wrong. Please email me directly."}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="block text-sm font-medium">Name</span>
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={name.trim() === "" ? "true" : "false"}
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={
                email !== "" && !isValidEmail(email) ? "true" : "false"
              }
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Message</span>
            <textarea
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={message.trim() === "" ? "true" : "false"}
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          {/* honeypot */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <Button type="submit" disabled={!canSubmit}>
            {status === "sending" ? "Sending…" : "Send"}
          </Button>
        </form>
      </Section>
    </>
  );
}

export default Contact;
