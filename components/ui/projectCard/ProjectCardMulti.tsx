import { colorScheme } from "./colorScheme";
import ImagesDisplay from "./ImagesDisplay";
import { ProjectItem } from "./ProjectRenderer";
import ProjectStats from "./ProjectStats";

interface ProjectCardMultiProps {
	project: ProjectItem;
	index: number;
}

export default function ProjectCardMulti({ project, index }: ProjectCardMultiProps) {
	const clampedIndex = index % colorScheme.length;

	return (
		<article
			className="w-full body-x-padding section-y-padding flex flex-col items-vertical-gap md:gap-24"
			style={{ backgroundColor: colorScheme[clampedIndex].backgroundColor }}
		>
			<div className="flex flex-col md:flex-row items-vertical-gap">
				<div className="w-full md:w-1/2">
					<h2 className="heading text-center md:text-start">
						{project.title}
					</h2>
				</div>
				<div className="w-full md:w-1/2 flex flex-col items-vertical-gap">
					<p>{project.text}</p>
					<ProjectStats project={project} />
				</div>
			</div>
			<div>
				<ImagesDisplay imgUrls={project.imgUrls} projectName={project.title} clampedIndex={clampedIndex} />
			</div>
		</article>
	);
};