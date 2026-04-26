import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addToMailchimp } from "@/lib/mailchimp";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitStore.get(ip);

	if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
		rateLimitStore.set(ip, { count: 1, windowStart: now });
		return false;
	}

	if (entry.count >= RATE_LIMIT_MAX) return true;

	entry.count += 1;
	return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface UpdatesPayload {
	email: string;
	selectedProjects: string[];
}

function buildHtml(count: number): string {
	return `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
        <tr>
          <td style="background:#1a3c2e;padding:24px 32px;">
            <p style="margin:0;color:#c8e6c0;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Reliwe</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">Ny projektprenumeration</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0;font-size:16px;color:#111;">En prenumerant har valt att följa <strong>${count} projekt</strong>. Kontaktuppgifterna finns i Mailchimp.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">Skickat via reliwe.se</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

function buildText(count: number): string {
	return `NY PROJEKTPRENUMERATION\n\nEn prenumerant har valt att följa ${count} projekt. Kontaktuppgifterna finns i Mailchimp.`;
}

export async function POST(request: NextRequest) {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

	if (isRateLimited(ip)) {
		return NextResponse.json(
			{ error: "För många försök. Vänta en stund och försök igen." },
			{ status: 429 }
		);
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
	}

	if (typeof body !== "object" || body === null) {
		return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 });
	}

	const raw = body as Record<string, unknown>;
	const email = String(raw.email ?? "").trim().toLowerCase();
	const selectedProjects = Array.isArray(raw.selectedProjects)
		? raw.selectedProjects.map((s) => String(s)).filter((s) => s.length > 0 && s.length <= 200)
		: [];

	if (!EMAIL_RE.test(email)) {
		return NextResponse.json({ errors: { email: "Ange en giltig e-postadress." } }, { status: 422 });
	}
	if (selectedProjects.length === 0) {
		return NextResponse.json({ errors: { selectedProjects: "Välj minst ett projekt." } }, { status: 422 });
	}

	const payload: UpdatesPayload = { email, selectedProjects };

	const resend = new Resend(process.env.RESEND_API_KEY);

	const [emailResult] = await Promise.allSettled([
		resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL!,
			to: process.env.RESEND_TO_EMAIL!,
			subject: `Ny projektprenumeration – ${selectedProjects.length} projekt`,
			html: buildHtml(selectedProjects.length),
			text: buildText(selectedProjects.length),
		}),
		addToMailchimp(
			email,
			{ MMERGE6: selectedProjects.join(", ") },
			selectedProjects
		).catch((err) => console.error("[interest-updates] Mailchimp error:", err)),
	]);

	if (emailResult.status === "rejected" || (emailResult.status === "fulfilled" && emailResult.value.error)) {
		const err = emailResult.status === "fulfilled" ? emailResult.value.error : emailResult.reason;
		console.error("[interest-updates] Resend error:", err);
		return NextResponse.json({ error: "Kunde inte skicka. Försök igen senare." }, { status: 500 });
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
