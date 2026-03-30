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
			<div className="bg-[var(--reliwe-green-accent)]">
				<div className="relative container mx-auto py-8">
					<div className="container flex flex-row justify-between mx-auto body-x-padding items-center">
						<div>
							<h1 className="heading !text-6xl">
								{project.title}
							</h1>
						</div>
						
					</div>
					<div className="
						bg-[var(--reliwe-green)] absolute w-30 h-30 rounded-full 
						justify-center items-center flex text-[var(--reliwe-offwhite)] text-lg top-0 -translate-y-1/2 border-2 border-[var(--reliwe-green-accent)] right-0 -translate-x-1/2
					">
						<p>
							{projectStatusMap[project.status]}
						</p>
					</div>
				</div>
			</div>
		</section>
		
	);
};