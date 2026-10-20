import { NextResponse } from "next/server";
import { socials } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 200,
  email: 320,
  subject: 300,
  message: 5000,
};

type Payload = { code: string; error: string };

function json(payload: Payload, status: number) {
  return NextResponse.json(payload, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ code: "bad_request", error: "Invalid JSON body" }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return json({ code: "bad_request", error: "Missing required fields" }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ code: "bad_request", error: "Invalid email" }, 400);
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return json({ code: "bad_request", error: "Field too long" }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Service non configuré : le client retombe sur le mailto (aucun faux "envoyé").
    return json({ code: "not_configured", error: "Contact service not configured" }, 503);
  }

  const to = process.env.CONTACT_EMAIL || socials.email;
  const text = `Nom / Name: ${name}\nEmail: ${email}\n\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio god-peace <onboarding@resend.dev>",
        to: [to],
        subject: `[Portfolio] ${subject}`,
        text,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend error:", res.status, await res.text().catch(() => ""));
      return json({ code: "provider_error", error: "Email provider unavailable" }, 502);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.error("[contact] Network error contacting Resend");
    return json({ code: "network_error", error: "Email provider unreachable" }, 502);
  }
}
