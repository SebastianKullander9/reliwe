import { Project } from "@/app/types/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { projectStatusMap } from "../Home/CallToProjects";

interface IntroSectionProps {
	project: Project;
	imgUrls: string[];
}

export default function IntroSection({ project, imgUrls }: IntroSectionProps) {

	return (
		<section>
			<div className="relative w-full h-[75vh] overflow-hidden">
				<Image 
					src={imgUrls[0]}
					alt="Hero image from one of reliwes projects 'Barkaby'"
					fill
					className="object-cover object-center"
					priority
				/>
			</div>
			<div className="bg-[var(--reliwe-green-accent)] flex flex-row justify-between body-x-padding items-center p-4">
				<div>
					<h1 className="heading !text-4xl">
						{project.title}
					</h1>
				</div>
				<div>
					<p>
						{projectStatusMap[project.status]}
					</p>
				</div>
			</div>
		</section>
		
	);
};