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

const NAME_RE = /^[\p{L}\s'\-]{2,100}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+46|0)\d[\d\s\-]{6,14}$/;
const ALLOWED_ROOMS = new Set([...Array.from({ length: 9 }, (_, i) => `${i + 1} rok`), "5+ rok"]);
const ALLOWED_EXTRAS = new Set(["bostadsratt", "hyresratt"]);
const EXTRAS_LABELS: Record<string, string> = { bostadsratt: "Bostadsrätt", hyresratt: "Hyresrätt" };

function sanitize(str: string): string {
	return str.trim().replace(/\s+/g, " ");
}

interface FormPayload {
	selectedProjects: string[];
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	rooms: string[];
	extras: string[];
	message: string;
}

interface ValidationErrors { [key: string]: string }

function validate(data: FormPayload): ValidationErrors {
	const errors: ValidationErrors = {};
	if (!Array.isArray(data.selectedProjects) || data.selectedProjects.length === 0) {
		errors.selectedProjects = "Välj minst ett projekt.";
	}
	if (!NAME_RE.test(data.firstName)) {
		errors.firstName = "Ange ett giltigt förnamn (2–100 tecken).";
	}
	if (!NAME_RE.test(data.lastName)) {
		errors.lastName = "Ange ett giltigt efternamn (2–100 tecken).";
	}
	if (!EMAIL_RE.test(data.email)) {
		errors.email = "Ange en giltig e-postadress.";
	}
	if (!PHONE_RE.test(data.phone.replace(/\s/g, ""))) {
		errors.phone = "Ange ett giltigt telefonnummer (t.ex. 070-123 45 67).";
	}
	if (!Array.isArray(data.rooms) || data.rooms.length === 0 || data.rooms.some((r) => !ALLOWED_ROOMS.has(r))) {
		errors.rooms = "Välj minst ett antal rum.";
	}
	if (data.extras.some((e) => !ALLOWED_EXTRAS.has(e))) {
		errors.extras = "Ogiltigt val för övriga önskemål.";
	}
	if (data.message.length > 1000) {
		errors.message = "Meddelandet får vara max 1 000 tecken.";
	}
	return errors;
}

function buildHtml(projects: string[]): string {
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
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">Ny intresseanmälan</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0;font-size:16px;color:#111;">En ny intresseanmälan har inkommit för: <strong>${projects.join(", ")}</strong>. Kontaktuppgifterna finns i Mailchimp.</p>
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

function buildText(projects: string[]): string {
	return `NY INTRESSEANMÄLAN\n\nEn ny intresseanmälan har inkommit för: ${projects.join(", ")}. Kontaktuppgifterna finns i Mailchimp.`;
}

export async function POST(request: NextRequest) {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

	if (isRateLimited(ip)) {
		return NextResponse.json({ error: "För många försök. Vänta en stund och försök igen." }, { status: 429 });
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

	const payload: FormPayload = {
		selectedProjects: Array.isArray(raw.selectedProjects)
			? raw.selectedProjects.map((s) => String(s)).filter((s) => s.length > 0 && s.length <= 200)
			: [],
		firstName: sanitize(String(raw.firstName ?? "")),
		lastName: sanitize(String(raw.lastName ?? "")),
		email: sanitize(String(raw.email ?? "")).toLowerCase(),
		phone: sanitize(String(raw.phone ?? "")),
		rooms: Array.isArray(raw.rooms) ? raw.rooms.map((r) => String(r)) : [],
		extras: Array.isArray(raw.extras) ? raw.extras.map((e) => String(e)) : [],
		message: sanitize(String(raw.message ?? "")),
	};

	const errors = validate(payload);
	if (Object.keys(errors).length > 0) {
		return NextResponse.json({ errors }, { status: 422 });
	}

	const resend = new Resend(process.env.RESEND_API_KEY);
	const extrasLabels = payload.extras.map((e) => EXTRAS_LABELS[e] ?? e);

	const [emailResult] = await Promise.allSettled([
		resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL!,
			to: process.env.RESEND_TO_EMAIL!,
			subject: `Ny intresseanmälan – ${payload.selectedProjects.join(", ")}`,
			html: buildHtml(payload.selectedProjects),
			text: buildText(payload.selectedProjects),
		}),
		addToMailchimp(
			payload.email,
			{
				MMERGE1: `${payload.firstName} ${payload.lastName}`,
				MMERGE5: payload.rooms.join(", "),
				MMERGE6: payload.selectedProjects.join(", "),
				...(payload.message.length > 0 && { MMERGE7: payload.message }),
				...(extrasLabels.length > 0 && { MMERGE8: extrasLabels.join(", ") }),
			},
			payload.selectedProjects
		).catch((err) => console.error("[intresse] Mailchimp error:", err)),
	]);

	if (emailResult.status === "rejected" || (emailResult.status === "fulfilled" && emailResult.value.error)) {
		const err = emailResult.status === "fulfilled" ? emailResult.value.error : emailResult.reason;
		console.error("[intresse] Resend error:", err);
		return NextResponse.json({ error: "Kunde inte skicka anmälan. Försök igen senare." }, { status: 500 });
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
