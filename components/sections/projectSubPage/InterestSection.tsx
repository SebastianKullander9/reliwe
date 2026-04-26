import InterestForm from "@/components/ui/forms/InterestForm";

interface InterestSectionProps {
	projectTitle: string;
	availableRooms: number[];
	otherProjects: { _id: string; title: string; slug: string | null }[];
}

export default function InterestSection({ projectTitle, availableRooms, otherProjects }: InterestSectionProps) {
	return (
		<section className="py-24 body-x-padding">
			<InterestForm projectTitle={projectTitle} availableRooms={availableRooms} otherProjects={otherProjects} />
		</section>
	);
}
