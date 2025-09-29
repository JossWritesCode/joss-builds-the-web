import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.ZOHO_SMTP_HOST || "smtp.zoho.ca";
const SMTP_PORT = Number(process.env.ZOHO_SMTP_PORT || 587);
const SMTP_USER = process.env.ZOHO_SMTP_USER;
const SMTP_PASS = process.env.ZOHO_SMTP_PASS;
const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  throw new Error(
    "Missing required SMTP environment variables: ZOHO_SMTP_USER and ZOHO_SMTP_PASS"
  );
}
if (!TO_EMAIL) {
  throw new Error("Missing recipient email: set TO_EMAIL or ZOHO_SMTP_USER");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
const MAX_LEN = 5000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  if (!/application\/json/i.test(req.headers["content-type"] ?? "")) {
    return res
      .status(415)
      .json({ ok: false, error: "Expected application/json" });
  }

  const {
    name = "",
    email = "",
    message = "",
    website = "",
  } = (req.body ?? {}) as Record<string, string>;

  const _name = String(name).trim();
  const _email = String(email).trim();
  const _message = String(message).trim();
  const _website = String(website).trim();

  // Honeypot
  if (_website)
    return res.status(400).json({ ok: false, error: "Spam detected" });

  if (!_name || !_email || !_message || !isValidEmail(_email)) {
    return res.status(400).json({ ok: false, error: "Invalid input" });
  }
  if (_name.length > 200 || _email.length > 320 || _message.length > MAX_LEN) {
    return res.status(413).json({ ok: false, error: "Message too large" });
  }

  try {
    await transporter.sendMail({
      from: `Website Contact <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: _email,
      subject: `New contact from ${_name}`,
      text: `Name: ${_name}\nEmail: ${_email}\n\n${_message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("SMTP send error:", err);
    return res.status(502).json({ ok: false, error: "Email provider error" });
  }
}
