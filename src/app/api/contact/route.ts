import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = 'force-static';

// Rate limiting store (in-memory for simplicity; use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return `contact:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

const contactSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email().max(254),
  subject: z.string().min(5).max(200),
  type: z.enum(["job", "consulting", "collaboration", "other"]),
  message: z.string().min(20).max(2000),
  budget: z.string().optional(),
});

function sanitize(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, subject, type, message, budget } = result.data;

    // Sanitize inputs
    const safeName = sanitize(name);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);
    const safeType = sanitize(type);
    const safeBudget = budget ? sanitize(budget) : "Not specified";

    // Send email via nodemailer
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; background: #f8fafc; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
    .header { background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 32px; color: white; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
    .header p { margin: 8px 0 0; opacity: 0.85; font-size: 14px; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px; }
    .value { font-size: 15px; color: #1e293b; background: #f8fafc; padding: 12px 16px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .message-value { white-space: pre-wrap; line-height: 1.6; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #dbeafe; color: #1d4ed8; }
    .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Form Submission</h1>
      <p>Portfolio contact form — saadbilal.dev</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Inquiry Type</div>
        <div class="value"><span class="badge">${safeType.toUpperCase()}</span></div>
      </div>
      <div class="field">
        <div class="label">From</div>
        <div class="value">${safeName} &lt;${email}&gt;</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${safeSubject}</div>
      </div>
      ${budget ? `<div class="field"><div class="label">Budget</div><div class="value">${safeBudget}</div></div>` : ""}
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-value">${safeMessage}</div>
      </div>
    </div>
    <div class="footer">
      Sent from saadbilal.dev contact form · ${new Date().toUTCString()}
    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${safeType.toUpperCase()}: ${safeSubject}`,
      html: emailHtml,
      text: `New contact from ${safeName} (${email})\nType: ${safeType}\nSubject: ${safeSubject}\nBudget: ${safeBudget}\n\n${safeMessage}`,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
