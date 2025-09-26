import { useState } from "react";
import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import { site } from "../config/siteConfig";

type SendState = "idle" | "sending" | "ok" | "error";

function Contact() {
  const [status, setStatus] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      website: (formData.get("website") as string) ?? "", // 🕵️ honeypot
    };

    try {
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
      form.reset();
    } catch (err) {
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
          <a
            className="text-dracula-accent md:hover:underline"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
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

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="block text-sm font-medium">Name</span>
            <input
              required
              name="name"
              autoComplete="name"
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
            />
          </label>

          {/* honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </Button>
        </form>
      </Section>
    </>
  );
}

export default Contact;
