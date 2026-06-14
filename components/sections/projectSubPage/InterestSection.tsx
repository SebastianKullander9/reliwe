import InterestForm from "@/components/ui/forms/InterestForm";

interface InterestSectionProps {
	projectTitle: string;
	availableRooms: number[];
	availableHousingTypes: string[];
	otherProjects: { _id: string; title: string; slug: string | null }[];
}

export default function InterestSection({ projectTitle, availableRooms, availableHousingTypes, otherProjects }: InterestSectionProps) {
	return (
		<section id="interest-form" className="py-24 body-x-padding">
			<InterestForm projectTitle={projectTitle} availableRooms={availableRooms} availableHousingTypes={availableHousingTypes} otherProjects={otherProjects} />
		</section>
	);
}
