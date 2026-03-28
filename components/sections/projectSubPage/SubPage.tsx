import { Project } from "@/app/types/types";
import InfoSection from "./InfoSection";
import IntroSection from "./IntroSection";
import { urlFor } from "@/sanity/lib/image";
import TextSection from "./TextSection";

interface ProjectSubPageProps {
	project: Project;
}

export default function SubPage({ project }: ProjectSubPageProps) {
	const imgUrls = project.images?.map((img) => 
		urlFor(img).width(2000).quality(90).auto("format").url()
	) ?? [];

	console.log(imgUrls);

	return (
		<section>
			<IntroSection project={project} imgUrls={imgUrls} />
			<InfoSection project={project} />
			<TextSection project={project} imgUrls={imgUrls} />
		</section>
	);
};