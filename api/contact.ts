import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// ---- Env validation (fail fast, once) --------------------------------------
const apiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.TO_EMAIL;

if (!apiKey) {
  // Prefer clear config error over mysterious runtime failures
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(apiKey);

// ---- Helpers ----------------------------------------------------------------
function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
const MAX_LEN = 5000; // basic payload guard

// ---- Handler ----------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  if (!/application\/json/i.test(req.headers["content-type"] ?? "")) {
    return res
      .status(415)
      .json({ ok: false, error: "Expected application/json" });
  }

  let body: unknown;
  try {
    body = req.body ?? {};
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid JSON body" });
  }

  const {
    name = "",
    email = "",
    message = "",
    website = "",
  } = body as Record<string, string>;

  // Normalize inputs
  const _name = String(name).trim();
  const _email = String(email).trim();
  const _message = String(message).trim();
  const _website = String(website).trim();

  // Honeypot (bots often fill every field)
  if (_website) {
    return res.status(400).json({ ok: false, error: "Spam detected" });
  }

  // Basic validation
  if (!_name || !_email || !_message || !isValidEmail(_email)) {
    return res.status(400).json({ ok: false, error: "Invalid input" });
  }
  if (_name.length > 200 || _email.length > 320 || _message.length > MAX_LEN) {
    return res.status(413).json({ ok: false, error: "Message too large" });
  }
  if (!toEmail) {
    throw new Error("Missing TO_EMAIL environment variable");
  }
  try {
    await resend.emails.send({
      from: "Website Contact <hello@jossbuildstheweb.ca>",
      to: [toEmail],
      replyTo: _email,
      subject: `New contact from ${_name}`,
      text: `Name: ${_name}\nEmail: ${_email}\n\n${_message}`,
      // You could also add an HTML version here if you like.
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend send error:", err);
    return res.status(502).json({ ok: false, error: "Email provider error" });
  }
}
