import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.ZOHO_SMTP_HOST || "smtp.zoho.ca";
const SMTP_PORT = Number(process.env.ZOHO_SMTP_PORT || 587);
const SMTP_USER = process.env.ZOHO_SMTP_USER;
const SMTP_PASS = process.env.ZOHO_SMTP_PASS;
const TO_EMAIL = process.env.TO_EMAIL || SMTP_USER;

if (!SMTP_USER || !SMTP_PASS) {
  throw new Error(
    "Missing required SMTP env vars: ZOHO_SMTP_USER and ZOHO_SMTP_PASS"
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

const MAX_LEN = 5000;
const MAX_NAME = 200;
const MAX_EMAIL = 320;

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = { windowMs: 60_000, max: 5 }; // 5 requests / minute
function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return { limited: false, retryAfter: 0 };
  }
  if (rec.count >= RATE_LIMIT.max) {
    return { limited: true, retryAfter: Math.ceil((rec.resetAt - now) / 1000) };
  }
  rec.count++;
  return { limited: false, retryAfter: 0 };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Basic type guard – Vercel usually parses JSON, but we’ll be safe:
  if (!/application\/json/i.test(req.headers["content-type"] ?? "")) {
    return res
      .status(415)
      .json({ ok: false, error: "Expected application/json" });
  }

  // Rate limit (best-effort)
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.socket as any)?.remoteAddress ||
    "unknown";
  const rl = rateLimited(ip);
  if (rl.limited) {
    res.setHeader("Retry-After", String(rl.retryAfter));
    return res.status(429).json({
      ok: false,
      error: "Rate limit exceeded. Please try again shortly.",
    });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const rawName = String(body.name ?? "").trim();
  const rawEmail = String(body.email ?? "").trim();
  const rawMsg = String(body.message ?? "").trim();
  const rawWebsite = String(body.website ?? "").trim(); // honeypot

  if (rawWebsite) {
    return res.status(400).json({ ok: false, error: "Spam detected" });
  }

  const errors: FieldErrors = {};
  if (!rawName) errors.name = "Name is required.";
  else if (rawName.length > MAX_NAME) errors.name = "Name is too long.";

  if (!rawEmail) errors.email = "Email is required.";
  else if (!isValidEmail(rawEmail)) errors.email = "Email looks invalid.";
  else if (rawEmail.length > MAX_EMAIL) errors.email = "Email is too long.";

  if (!rawMsg) errors.message = "Please include a message.";
  else if (rawMsg.length > MAX_LEN) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      ok: false,
      error: "Validation failed",
      errors,
    });
  }

  try {
    await transporter.sendMail({
      from: `Website Contact <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: rawEmail,
      subject: `New contact from ${rawName}`,
      text: `Name: ${rawName}\nEmail: ${rawEmail}\n\n${rawMsg}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("SMTP send error:", err);

    return res.status(502).json({
      ok: false,
      error:
        "Email provider error. Please try again later or email me directly.",
    });
  }
}
