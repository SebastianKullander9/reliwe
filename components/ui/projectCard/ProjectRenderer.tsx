import ImagesDisplay from "./ImagesDisplay";
import ImageDisplay from "./ImageDisplay";
import ProjectCardMulti from "./ProjectCardMulti";
import ProjectCardSingle from "./ProjectCardSingle";

export type ProjectItem = {
	title: string;
	text: string;
	year: string;
	movingInYear: string;
	apartmentAmount: string;
	roomAmount: string;
	imgUrls: string[];
}

interface ProjectRendererProps {
	project: ProjectItem;
	index: number;
}

export default function ProjectRenderer({ project, index }: ProjectRendererProps) {
	const hasMultipleImages = project.imgUrls.length > 1;

	return (
		<>
			{hasMultipleImages ? (
				<ProjectCardMulti project={project} index={index}/>
			): (
				<ProjectCardSingle project={project} index={index}/>
			)}
		</>
	);
};