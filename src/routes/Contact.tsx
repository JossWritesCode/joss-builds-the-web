import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import { site } from "../config/siteConfig";
import { useState } from "react";

function Contact() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const isFormspree = site.contact.formProvider === "formspree";
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

  return (
    <>
      <SEO title="Contact" description="Get in touch to start your project." />
      <Section className="py-10 max-w-2xl">
        <p className="mb-6">
          Prefer email?{" "}
          <span className="text-dracula-accent ">{site.email}</span>
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
            Something went wrong. Please email me directly.
          </div>
        )}
        {isFormspree && (
          <form
            className="space-y-4"
            action={`https://formspree.io/f/${formspreeId}`}
            method="POST"
            onSubmit={() => setStatus("ok")}
          >
            <label className="block">
              <span className="block text-sm font-medium">Name</span>
              <input
                required
                name="name"
                className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium">Email</span>
              <input
                required
                type="email"
                name="email"
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
            <Button type="submit">Send</Button>
          </form>
        )}
        {false && (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-4"
            onSubmit={() => setStatus("ok")}
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <label className="block">
              <span className="block text-sm font-medium">Name</span>
              <input
                required
                name="name"
                className="mt-1 w-full rounded-xl2 border border-dracula-muted/30 bg-white p-2"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium">Email</span>
              <input
                required
                type="email"
                name="email"
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
            <Button type="submit">Send</Button>
          </form>
        )}
      </Section>
    </>
  );
}
export default Contact;
