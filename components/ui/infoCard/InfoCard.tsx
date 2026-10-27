import { ProjectWithSubpage } from "@/app/types/types";
import InfoRow from "./InfoRow";
import ScrollToInterestButton from "./ScrollToInterestButton";

interface InfoCardProps {
	project: ProjectWithSubpage;
}

export default function InfoCard({ project }: InfoCardProps) {
	const factCard = project.subpage?.factCard;
	const facts = project.facts?.filter(fact => fact.label && fact.value) ?? [];

	return (
		<div className="bg-[var(--reliwe-green)] p-8 rounded-xl md:min-w-80 lg:min-w-100 xl:min-w-120 flex flex-col gap-12 md:justify-between">
			<div className="flex flex-col gap-4">
				<p className="text-[var(--reliwe-green-accent3)] uppercase tracking-widest text-xs">
					{project.title}
				</p>
				<h2 className="heading-poppins font-extrabold text-4xl pb-4 text-[var(--reliwe-offwhite)] tracking-wider">
					{factCard?.title || "Fakta om projektet"}
				</h2>
				<div className="flex flex-col">
					{facts.map((fact, index) => (
						<InfoRow
							key={fact._key ?? index}
							title={fact.label!}
							text={fact.value!}
						/>
					))}
				</div>
			</div>
			<div className="w-full">
				<ScrollToInterestButton />
			</div>
		</div>
	);
};