import Input from "../inputs/Input";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";

export default function InterestForm() {
	return (
		<form className="flex flex-col max-w-160 mx-auto gap-4">
			<div className="text-center flex flex-col gap-4">
				<h2 className="font-extrabold text-4xl">
					Var med från start
				</h2>
				<p>
					Anmäl ditt intresse idag och säkra din plats i en av Stockholms mest spännande stadsutvecklingar.
				</p>
			</div>
			<div className="inline-flex flex-row gap-8">
				<Input 
					label="Förnamn*"
					placeholder="Sven Svensson"
				/>
				<Input 
					label="Efternamn*"
					placeholder="Sven Svensson"
				/>
			</div>
			<Input 
				label="Önskemål om antal rum"
				placeholder="Ex, 2-3 rum"
			/>

			<Input 
				label="E-post*"
				placeholder="email@test.se"
			/>
			<Input 
				label="Telefon*"
				placeholder="000-0000000"
			/>
			<Input 
				label="Överige önskemål"
				placeholder=""
			/>
			<ButtonAnimationWrapper hasMaxWidth={false}>
				<ButtonBackground label="Skicka intresseanmälan"/>
			</ButtonAnimationWrapper>
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