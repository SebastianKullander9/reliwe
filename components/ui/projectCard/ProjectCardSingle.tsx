import { colorScheme } from "./colorScheme";
import ImageDisplay from "./ImageDisplay";
import { ProjectItem } from "./ProjectRenderer";
import ProjectStats from "./ProjectStats";
import Link from "next/link";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";

interface ProjectCardSingleProps {
	project: ProjectItem;
	index: number;
}

export default function ProjectCardSingle({ project, index }: ProjectCardSingleProps) {
	const clampedIndex = index % colorScheme.length;

	return (
		<>
			<article 
				className="w-full min-h-[calc(100vh)] body-x-padding section-y-padding flex flex-col items-vertical-gap"
				style={{ backgroundColor: colorScheme[clampedIndex].backgroundColor }}	
			>
				<div>
					<h2 className="heading text-center md:text-start">
						{project.title}
					</h2>
				</div>
				<div className="flex flex-1 items-end">
					<div className="w-full flex flex-col md:flex-row justify-between items-vertical-gap">
						<div className="max-w-prose flex flex-col justify-between items-vertical-gap">
							<div className="flex flex-col gap-12">
								<p>{project.text}</p>
								{project.hasSubpage && (
									<Link href={`/projekt/${project.slug}`} className="hidden md:block">
										<ButtonAnimationWrapper>
											<ButtonBackground label="Läs mer" />
										</ButtonAnimationWrapper>
									</Link>
								)}
							</div>
							<ProjectStats project={project} />

						</div>
						<div className="relative w-full md:max-w-[45vw]">
							<ImageDisplay imgUrls={project.imgUrls} projectName={project.title} />
						</div>
					</div>
				</div>
				{project.hasSubpage && (
						<div className="flex flex-row justify-center md:hidden">
							<Link href={`/projekt/${project.slug}`}>
								<ButtonAnimationWrapper>
									<ButtonBackground label="Läs mer" />
								</ButtonAnimationWrapper>
							</Link>
						</div>
					)}
			</article>

			<div className="h-20 w-full" style={{ backgroundColor: colorScheme[clampedIndex].backgroundColor }} />
		</>

	);
};