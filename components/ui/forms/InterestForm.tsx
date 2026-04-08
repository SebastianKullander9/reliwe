import Input from "../inputs/Input";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";
import PillSelect from "../inputs/PillSelect";
import Link from "next/link";
import TextArea from "../inputs/TextArea";
import CheckboxGroup from "../inputs/CheckboxGroup";

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
					Anmäl ditt intresse om du vill veta mer om våra planerade eller
					pågående projekt. Detta är ingen köplats, utan ett sätt för oss att få en
					bild av intresset och att dela mer information med dig.
				</p>
			</div>
			<div className="border border-[var(--reliwe-green-accent)] rounded-lg p-3 md:p-8 flex flex-col gap-4">
				<div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 w-full">
					<Input 
						label="Förnamn"
						placeholder="Erik"
						required
					/>
					<Input 
						label="Efternamn"
						placeholder="Andersson"
						required
					/>
				</div>
				<div className="inline-flex flex-col md:flex-row gap-4 md:gap-8 w-full">
					<Input 
						label="E-post"
						placeholder="erik.andersson@mail.se"
						required
					/>
					<Input 
						label="Telefon"
						placeholder="070-123 45 67"
						required
					/>
				</div>
				<PillSelect />
				<label className="pl-4">
					Övriga önskemål
				</label>
				<CheckboxGroup name="ovriga" options={[
					{label: "Bostadsrätt", value: "test1"}, 
					{label: "Hyresrätt", value: "test2"}, 
					{label: "Balkong/uteplats", value: "test3"}
				]}/>
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