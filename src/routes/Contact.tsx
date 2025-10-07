import { useState, useMemo, useRef, useEffect } from "react";
import SEO from "../components/utility/SEO";
import Section from "../components/Section";
import Button from "../components/ui/Button";
import { site } from "../config/siteConfig";

type SendState = "idle" | "sending" | "ok" | "error";

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function Contact() {
  const [status, setStatus] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Controlled fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  // Focus the first invalid field on error
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const canSubmit = useMemo(() => {
    const clientErrors: FieldErrors = {};
    if (!name.trim()) clientErrors.name = "Please enter your name.";
    if (!email.trim()) clientErrors.email = "Please enter your email.";
    else if (!isValidEmail(email))
      clientErrors.email = "Please enter a valid email.";
    if (!message.trim()) clientErrors.message = "Please enter a message.";

    // if honeypot filled, block silently
    const ok =
      Object.keys(clientErrors).length === 0 &&
      website.trim() === "" &&
      status !== "sending";
    return ok;
  }, [name, email, message, website, status]);

  useEffect(() => {
    // Clear field-level errors as user types (nice UX)
    setFieldErrors((prev) => ({
      ...prev,
      ...(name.trim() ? { name: undefined } : {}),
      ...(email.trim() && isValidEmail(email) ? { email: undefined } : {}),
      ...(message.trim() ? { message: undefined } : {}),
    }));
  }, [name, email, message]);

  function focusFirstError(errs: FieldErrors) {
    if (errs.name) nameRef.current?.focus();
    else if (errs.email) emailRef.current?.focus();
    else if (errs.message) messageRef.current?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    setFieldErrors({});

    // Client-side guard
    const newFieldErrors: FieldErrors = {};
    if (!name.trim()) newFieldErrors.name = "Please enter your name.";
    if (!email.trim()) newFieldErrors.email = "Please enter your email.";
    else if (!isValidEmail(email))
      newFieldErrors.email = "Please enter a valid email.";
    if (!message.trim()) newFieldErrors.message = "Please enter a message.";

    if (website.trim() !== "") {
      // honeypot triggered; pretend success to bots
      setStatus("ok");
      return;
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setStatus("idle");
      setFieldErrors(newFieldErrors);
      focusFirstError(newFieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        website: website.trim(),
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // Try to parse structured errors from your API
        const data = await res.json().catch(() => ({} as any));

        // Common patterns:
        // - 422: { errors: { name?: string, email?: string, message?: string }, error?: string }
        // - 429: { error: "Rate limit exceeded" }
        // - 400: { error: "Bad request" } (e.g., honeypot)
        // - 5xx: { error: "Internal error" }
        const serverFieldErrors: FieldErrors = data?.errors ?? {};

        if (Object.keys(serverFieldErrors).length > 0 || res.status === 422) {
          setFieldErrors(serverFieldErrors);
          focusFirstError(serverFieldErrors);
          setStatus("error");
          setErrorMsg(
            data?.error || "Please fix the highlighted fields and try again."
          );
          return;
        }

        if (res.status === 429) {
          setStatus("error");
          setErrorMsg(
            "You’ve sent too many messages recently. Please try again in a few minutes."
          );
          return;
        }

        if (res.status === 400) {
          setStatus("error");
          setErrorMsg(
            data?.error || "Your request looks invalid. Please try again."
          );
          return;
        }

        setStatus("error");
        setErrorMsg(
          data?.error ||
            "We couldn't send your message right now. Please try again shortly."
        );
        return;
      }

      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setFieldErrors({});
    } catch {
      setStatus("error");
      setErrorMsg(
        "Network problem — check your connection and try again, or email me directly."
      );
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
            Thanks! I’ll get back to you soon.
          </div>
        )}

        {status === "error" && errorMsg && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700"
          >
            {errorMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="block text-sm font-medium">Name</span>
            <input
              ref={nameRef}
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={fieldErrors.name ? "true" : "false"}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={`mt-1 w-full rounded-xl2 border bg-white p-2 ${
                fieldErrors.name ? "border-red-300" : "border-dracula-muted/30"
              }`}
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.name}
              </p>
            )}
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Email</span>
            <input
              ref={emailRef}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={fieldErrors.email ? "true" : "false"}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`mt-1 w-full rounded-xl2 border bg-white p-2 ${
                fieldErrors.email ? "border-red-300" : "border-dracula-muted/30"
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Message</span>
            <textarea
              ref={messageRef}
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={fieldErrors.message ? "true" : "false"}
              aria-describedby={
                fieldErrors.message ? "message-error" : undefined
              }
              className={`mt-1 w-full rounded-xl2 border bg-white p-2 ${
                fieldErrors.message
                  ? "border-red-300"
                  : "border-dracula-muted/30"
              }`}
            />
            {fieldErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {fieldErrors.message}
              </p>
            )}
          </label>

          {/* honeypot (kept hidden) */}
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
