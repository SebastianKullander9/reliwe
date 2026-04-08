import { Project } from "@/app/types/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { projectStatusMap } from "../Home/CallToProjects";

interface IntroSectionProps {
	project: Project;
	imgUrls: string[];
}

export default function HeroSection({ project, imgUrls }: IntroSectionProps) {

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
				<div className="body-x-padding xl:container flex flex-col md:flex-row justify-between mx-auto body-x-padding md:items-center p-4 ">
					<p className="heading-poppins md:text-xl uppercase tracking-widest">
						{project.title}
					</p>
					<p className="uppercase tracking-widest text-[var(--reliwe-green)] md:text-md">
						{projectStatusMap[project.status]}
					</p>
				</div>
			</div>
		</section>
	);
};