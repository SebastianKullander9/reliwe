import { createHash } from "crypto";

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const LIST_ID = process.env.MAILCHIMP_LIST_ID!;
const SERVER = process.env.MAILCHIMP_SERVER_PREFIX!;
const BASE = `https://${SERVER}.api.mailchimp.com/3.0`;

function authHeader() {
	return "Basic " + Buffer.from(`anystring:${API_KEY}`).toString("base64");
}

function hashEmail(email: string) {
	return createHash("md5").update(email.toLowerCase()).digest("hex");
}

export interface SubscriberFields {
	MMERGE1?: string; // Namn
	MMERGE5?: string; // Antal rum i bostad
	MMERGE6?: string; // Önskat område
	MMERGE7?: string; // Önskat övrigt
	MMERGE8?: string; // Typ boende intresse
}

export async function upsertSubscriber(email: string, mergeFields: SubscriberFields): Promise<void> {
	const hash = hashEmail(email);
	const res = await fetch(`${BASE}/lists/${LIST_ID}/members/${hash}`, {
		method: "PUT",
		headers: {
			Authorization: authHeader(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email_address: email,
			status_if_new: "subscribed",
			merge_fields: mergeFields,
		}),
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(`Mailchimp upsert failed (${res.status}): ${JSON.stringify(err)}`);
	}
}

export async function applyTags(email: string, tags: string[]): Promise<void> {
	if (tags.length === 0) return;
	const hash = hashEmail(email);
	const res = await fetch(`${BASE}/lists/${LIST_ID}/members/${hash}/tags`, {
		method: "POST",
		headers: {
			Authorization: authHeader(),
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tags: tags.map((name) => ({ name, status: "active" })),
		}),
	});

	// 204 No Content = success
	if (!res.ok && res.status !== 204) {
		const err = await res.json().catch(() => ({}));
		throw new Error(`Mailchimp tags failed (${res.status}): ${JSON.stringify(err)}`);
	}
}

export async function addToMailchimp(
	email: string,
	mergeFields: SubscriberFields,
	tags: string[]
): Promise<void> {
	await upsertSubscriber(email, mergeFields);
	await applyTags(email, tags);
}
