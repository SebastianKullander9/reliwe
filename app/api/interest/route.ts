import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Rate limiting — simple in-memory store (resets on server restart).
// Replace with Redis or Upstash for multi-instance / persistent limiting.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // max submissions per IP per window

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

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const NAME_RE = /^[\p{L}\s'\-]{2,100}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+46|0)\d[\d\s\-]{6,14}$/;

const ALLOWED_ROOMS = new Set(
	Array.from({ length: 10 }, (_, i) => `${i + 1} rok`)
);
const ALLOWED_EXTRAS = new Set(["bostadsratt", "hyresratt", "balkong"]);

const EXTRAS_LABELS: Record<string, string> = {
	bostadsratt: "Bostadsrätt",
	hyresratt: "Hyresrätt",
	balkong: "Balkong/uteplats",
};

function sanitize(str: string): string {
	return str.trim().replace(/\s+/g, " ");
}

interface FormPayload {
	projectTitle: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	rooms: string[];
	extras: string[];
	message: string;
}

interface ValidationErrors {
	[key: string]: string;
}

function validate(data: FormPayload): ValidationErrors {
	const errors: ValidationErrors = {};

	if (!NAME_RE.test(data.firstName)) {
		errors.firstName = "Ange ett giltigt förnamn (2–100 tecken, endast bokstäver).";
	}
	if (!NAME_RE.test(data.lastName)) {
		errors.lastName = "Ange ett giltigt efternamn (2–100 tecken, endast bokstäver).";
	}
	if (!EMAIL_RE.test(data.email)) {
		errors.email = "Ange en giltig e-postadress.";
	}
	if (!PHONE_RE.test(data.phone.replace(/\s/g, ""))) {
		errors.phone = "Ange ett giltigt telefonnummer.";
	}
	if (
		!Array.isArray(data.rooms) ||
		data.rooms.length === 0 ||
		data.rooms.some((r) => !ALLOWED_ROOMS.has(r))
	) {
		errors.rooms = "Välj minst ett antal rum.";
	}
	if (!Array.isArray(data.extras) || data.extras.some((e) => !ALLOWED_EXTRAS.has(e))) {
		errors.extras = "Ogiltigt val för övriga önskemål.";
	}
	if (data.message.length > 1000) {
		errors.message = "Meddelandet får vara max 1 000 tecken.";
	}

	return errors;
}

// ---------------------------------------------------------------------------
// Email helpers
// ---------------------------------------------------------------------------
function buildHtml(p: FormPayload): string {
	const extrasText =
		p.extras.length > 0
			? p.extras.map((e) => EXTRAS_LABELS[e] ?? e).join(", ")
			: "—";
	const messageText = p.message || "—";

	return `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
        <!-- Header -->
        <tr>
          <td style="background:#1a3c2e;padding:24px 32px;">
            <p style="margin:0;color:#c8e6c0;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Reliwe</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;">Ny intresseanmälan</h1>
            <p style="margin:8px 0 0;color:#c8e6c0;font-size:15px;">${p.projectTitle}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Namn</p>
                  <p style="margin:0;font-size:16px;color:#111;">${p.firstName} ${p.lastName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">E-post</p>
                  <p style="margin:0;font-size:16px;color:#111;">
                    <a href="mailto:${p.email}" style="color:#1a3c2e;">${p.email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Telefon</p>
                  <p style="margin:0;font-size:16px;color:#111;">
                    <a href="tel:${p.phone}" style="color:#1a3c2e;">${p.phone}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Önskat antal rum</p>
                  <p style="margin:0;font-size:16px;color:#111;">${p.rooms.join(", ")}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Övriga önskemål</p>
                  <p style="margin:0;font-size:16px;color:#111;">${extrasText}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Meddelande</p>
                  <p style="margin:0;font-size:16px;color:#111;white-space:pre-wrap;">${messageText}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e0e0e0;">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center;">
              Skickat via intresseanmälningsformuläret på reliwe.se
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

function buildText(p: FormPayload): string {
	const extrasText =
		p.extras.length > 0
			? p.extras.map((e) => EXTRAS_LABELS[e] ?? e).join(", ")
			: "—";
	return [
		"NY INTRESSEANMÄLAN",
		p.projectTitle,
		"",
		`Namn:              ${p.firstName} ${p.lastName}`,
		`E-post:            ${p.email}`,
		`Telefon:           ${p.phone}`,
		`Önskat antal rum:  ${p.rooms.join(", ")}`,
		`Övriga önskemål:   ${extrasText}`,
		"",
		"Meddelande:",
		p.message || "—",
	].join("\n");
}

// ---------------------------------------------------------------------------
// POST /api/interest
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
	// --- Rate limiting ---
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

	if (isRateLimited(ip)) {
		return NextResponse.json(
			{ error: "För många försök. Vänta en stund och försök igen." },
			{ status: 429 }
		);
	}

	// --- Parse body ---
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

	// --- Sanitize ---
	const payload: FormPayload = {
		projectTitle: sanitize(String(raw.projectTitle ?? "")),
		firstName: sanitize(String(raw.firstName ?? "")),
		lastName: sanitize(String(raw.lastName ?? "")),
		email: sanitize(String(raw.email ?? "")).toLowerCase(),
		phone: sanitize(String(raw.phone ?? "")),
		rooms: Array.isArray(raw.rooms) ? raw.rooms.map((r) => String(r)) : [],
		extras: Array.isArray(raw.extras) ? raw.extras.map((e) => String(e)) : [],
		message: sanitize(String(raw.message ?? "")),
	};

	// --- Validate ---
	const errors = validate(payload);
	if (Object.keys(errors).length > 0) {
		return NextResponse.json({ errors }, { status: 422 });
	}

	// --- Send email via Resend ---
	const resend = new Resend(process.env.RESEND_API_KEY);

	const { error: sendError } = await resend.emails.send({
		from: process.env.RESEND_FROM_EMAIL!,
		to: process.env.RESEND_TO_EMAIL!,
		replyTo: payload.email,
		subject: `Ny intresseanmälan – ${payload.projectTitle} – ${payload.firstName} ${payload.lastName}`,
		html: buildHtml(payload),
		text: buildText(payload),
	});

	if (sendError) {
		console.error("[interest-form] Resend error:", sendError);
		return NextResponse.json(
			{ error: "Kunde inte skicka anmälan. Försök igen senare." },
			{ status: 500 }
		);
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
