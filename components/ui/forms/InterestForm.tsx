import Input from "../inputs/Input";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";
import PillSelect from "../inputs/PillSelect";
import Link from "next/link";
import TextArea from "../inputs/TextArea";

export default function InterestForm() {
	return (
		<form className="flex flex-col max-w-180 mx-auto gap-4">
			<div className="flex flex-col gap-4">
				<p className="font-light tracking-wider text-[var(--reliwe-green)]">
					INTRESSEANMÄLAN
				</p>
				<h2 className="font-extrabold text-4xl">
					Var med från start
				</h2>
				<p className="max-w-prose">
					Anmäl ditt intresse idag och säkra din plats i en av Stockholms mest spännande stadsutvecklingar.
				</p>
			</div>
			<div className="border border-[var(--reliwe-green-accent)] rounded-lg p-8 flex flex-col gap-4">
				<div className="inline-flex flex-row gap-8 w-full">
					<Input 
						label="Förnamn"
						placeholder="Sven Svensson"
						required
					/>
					<Input 
						label="Efternamn"
						placeholder="Sven Svensson"
						required
					/>
				</div>
				<div className="inline-flex flex-row gap-8 w-full">
					<Input 
						label="E-post"
						placeholder="email@test.se"
						required
					/>
					<Input 
						label="Telefon"
						placeholder="000-0000000"
						required
					/>
				</div>
				<PillSelect />

				<TextArea />
				<ButtonAnimationWrapper hasMaxWidth={false}>
					<ButtonBackground label="Skicka intresseanmälan"/>
				</ButtonAnimationWrapper>
				<p className="text-center text-xs">
					Genom att skicka in formuläret godkänner du vår{" "}
					<Link 
						href="/integritetspolicy" 
						className="underline">
						integritetspolicy
					</Link>
					.
				</p>
			</div>
		</form>
	);
};

/*
Önskemål om fastighet:
Upplands VäsbyLinköpingUppsala

Önskemål om antal rum:

Önskemål om storlek på yta:

För- och efternamn: (obligatorisk)

E-post: (obligatorisk)

Telefon: (obligatorisk)

Övriga önskemål:

*/