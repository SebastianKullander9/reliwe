"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";
import PillSelect from "../inputs/PillSelect";
import CheckboxGroup from "../inputs/CheckboxGroup";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";

interface FormFields {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	rooms: string[];
	extras: string[];
	message: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	rooms?: string;
	extras?: string;
	message?: string;
}

const NAME_RE = /^[\p{L}\s'\-]{2,100}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^(\+46|0)\d[\d\s\-]{6,14}$/;

function validateClient(fields: FormFields): FormErrors {
	const errors: FormErrors = {};

	if (!NAME_RE.test(fields.firstName.trim())) {
		errors.firstName = "Ange ett giltigt förnamn (2–100 tecken).";
	}
	if (!NAME_RE.test(fields.lastName.trim())) {
		errors.lastName = "Ange ett giltigt efternamn (2–100 tecken).";
	}
	if (!EMAIL_RE.test(fields.email.trim())) {
		errors.email = "Ange en giltig e-postadress.";
	}
	if (!PHONE_RE.test(fields.phone.replace(/\s/g, ""))) {
		errors.phone = "Ange ett giltigt telefonnummer (t.ex. 070-123 45 67).";
	}
	if (fields.rooms.length === 0) {
		errors.rooms = "Välj minst ett antal rum.";
	}
	if (fields.message.length > 1000) {
		errors.message = "Meddelandet får vara max 1 000 tecken.";
	}

	return errors;
}

const EXTRAS_OPTIONS = [
	{ label: "Bostadsrätt", value: "bostadsratt" },
	{ label: "Hyresrätt", value: "hyresratt" },
	{ label: "Balkong/uteplats", value: "balkong" },
];

function SuccessState({ onReset }: { onReset: () => void }) {
	return (
		<div className="flex flex-col max-w-180 mx-auto gap-4">
			<div className="border border-[var(--reliwe-green-accent)] rounded-lg p-8 flex flex-col items-center gap-4 text-center">
				<div className="w-16 h-16 rounded-full bg-[var(--reliwe-green-accent)] flex items-center justify-center">
					<svg
						className="w-8 h-8 text-[var(--reliwe-green)]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2.5}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>
				<p className="font-light tracking-wider text-[var(--reliwe-green)] text-sm">
					TACK!
				</p>
				<h2 className="font-extrabold text-3xl">Din anmälan är mottagen</h2>
				<p className="max-w-prose text-sm text-gray-500">
					Vi har tagit emot din intresseanmälan och återkommer med mer
					information om projektet. Håll utkik i din inkorg!
				</p>
				<div className="flex flex-col w-full gap-3 mt-2">
					<Link href="/projekt">
						<ButtonAnimationWrapper hasMaxWidth={false}>
							<ButtonBackground label="Gå tillbaka till alla projekt" />
						</ButtonAnimationWrapper>
					</Link>
					<Link target="_blank" href="https://form.typeform.com/to/eX3wW0qu">
						<button
							onClick={onReset}
							className="w-full px-4 py-3 rounded-full bg-[var(--reliwe-green-accent)] hover:bg-[var(--reliwe-green-accent2)] text-[var(--reliwe-green)] transition-colors"
						>
							Anmäl intresse för flera projekt
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

interface InterestFormProps {
	projectTitle: string;
	availableRooms: number[];
}

export default function InterestForm({ projectTitle, availableRooms }: InterestFormProps) {
	const roomOptions = availableRooms
		.slice()
		.sort((a, b) => a - b)
		.map((n) => `${n} rok`);
	const [fields, setFields] = useState<FormFields>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		rooms: [],
		extras: [],
		message: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (submitted) {
			containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [submitted]);

	const setField = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
		setFields((prev) => ({ ...prev, [key]: value }));

		if (touched[key]) {
			const next = { ...fields, [key]: value };
			const nextErrors = validateClient(next);
			setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
		}
	};

	const markTouched = (key: keyof FormFields) => {
		setTouched((prev) => ({ ...prev, [key]: true }));
		const nextErrors = validateClient(fields);
		setErrors((prev) => ({ ...prev, [key]: nextErrors[key] }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitError(null);

		const clientErrors = validateClient(fields);

		if (Object.keys(clientErrors).length > 0) {
			setErrors(clientErrors);
			setTouched({
				firstName: true,
				lastName: true,
				email: true,
				phone: true,
				rooms: true,
				extras: true,
				message: true,
			});
			return;
		}

		setLoading(true);
		try {
			const res = await fetch("/api/interest", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...fields, projectTitle }),
			});

			if (res.ok) {
				setSubmitted(true);
				return;
			}

			const data = await res.json();

			if (res.status === 422 && data.errors) {
				setErrors(data.errors as FormErrors);
				setTouched({
					firstName: true,
					lastName: true,
					email: true,
					phone: true,
					rooms: true,
					extras: true,
					message: true,
				});
			} else if (res.status === 429) {
				setSubmitError(
					data.error ?? "För många försök. Vänta en stund och försök igen."
				);
			} else {
				setSubmitError(
					"Något gick fel. Kontrollera dina uppgifter och försök igen."
				);
			}
		} catch {
			setSubmitError(
				"Kunde inte nå servern. Kontrollera din internetanslutning och försök igen."
			);
		} finally {
			setLoading(false);
		}
	};

	if (submitted) {
		return (
			<div ref={containerRef}>
				<SuccessState onReset={() => setSubmitted(false)} />
			</div>
		);
	}

	return (
		<form
			className="flex flex-col max-w-180 mx-auto gap-4"
			onSubmit={handleSubmit}
			noValidate
		>
			<div className="flex flex-col gap-4">
				<p className="font-light tracking-wider text-[var(--reliwe-green)]">
					INTRESSEANMÄLAN
				</p>
				<h2 className="font-extrabold text-4xl">Var med från start</h2>
				<p className="max-w-prose">
					Anmäl ditt intresse om du vill veta mer om våra planerade eller
					pågående projekt. Detta är ingen köplats, utan ett sätt för oss att
					få en bild av intresset och att dela mer information med dig.
				</p>
			</div>

			<div className="border border-[var(--reliwe-green-accent)] rounded-lg p-3 md:p-8 flex flex-col gap-4">
				{/* Name row */}
				<div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 w-full">
					<Input
						label="Förnamn"
						placeholder="Erik"
						required
						value={fields.firstName}
						onChange={(e) => setField("firstName", e.target.value)}
						error={touched.firstName ? errors.firstName : undefined}
						autoComplete="given-name"
						onBlur={() => markTouched("firstName")}
					/>
					<Input
						label="Efternamn"
						placeholder="Andersson"
						required
						value={fields.lastName}
						onChange={(e) => setField("lastName", e.target.value)}
						error={touched.lastName ? errors.lastName : undefined}
						autoComplete="family-name"
						onBlur={() => markTouched("lastName")}
					/>
				</div>

				{/* Contact row */}
				<div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 w-full">
					<Input
						label="E-post"
						placeholder="erik.andersson@mail.se"
						required
						type="email"
						value={fields.email}
						onChange={(e) => setField("email", e.target.value)}
						error={touched.email ? errors.email : undefined}
						autoComplete="email"
						onBlur={() => markTouched("email")}
					/>
					<Input
						label="Telefon"
						placeholder="070-123 45 67"
						required
						type="tel"
						value={fields.phone}
						onChange={(e) => setField("phone", e.target.value)}
						error={touched.phone ? errors.phone : undefined}
						autoComplete="tel"
						onBlur={() => markTouched("phone")}
					/>
				</div>

				{/* Room selection */}
				<PillSelect
					options={roomOptions}
					value={fields.rooms}
					onChange={(v) => {
						setField("rooms", v);
						setTouched((prev) => ({ ...prev, rooms: true }));
					}}
					error={touched.rooms ? errors.rooms : undefined}
					required
				/>

				{/* Extras / housing type */}
				<CheckboxGroup
					name="ovriga"
					label="Övriga önskemål"
					options={EXTRAS_OPTIONS}
					value={fields.extras}
					onChange={(v) => setField("extras", v)}
				/>

				{/* Free-text message */}
				<TextArea
					value={fields.message}
					onChange={(e) => setField("message", e.target.value)}
					error={touched.message ? errors.message : undefined}
					maxLength={1000}
					onBlur={() => markTouched("message")}
				/>

				{/* Global submit error */}
				{submitError && (
					<p className="text-sm text-red-500 text-center px-2">{submitError}</p>
				)}

				<ButtonAnimationWrapper hasMaxWidth={false}>
					<ButtonBackground
						label={loading ? "Skickar..." : "Skicka intresseanmälan"}
						disabled={loading}
					/>
				</ButtonAnimationWrapper>

				<p className="text-center text-xs">
					Genom att skicka in formuläret godkänner du vår{" "}
					<Link href="/integritetspolicy" className="underline">
						integritetspolicy
					</Link>
					.
				</p>
			</div>
		</form>
	);
}
