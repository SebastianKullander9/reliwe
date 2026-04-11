import InterestForm from "@/components/ui/forms/InterestForm";

interface InterestSectionProps {
	projectTitle: string;
	availableRooms: number[];
}

export default function InterestSection({ projectTitle, availableRooms }: InterestSectionProps) {
	return (
		<section className="py-24 body-x-padding">
			<InterestForm projectTitle={projectTitle} availableRooms={availableRooms} />
		</section>
	);
}
