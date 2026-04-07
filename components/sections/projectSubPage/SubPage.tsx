import { Project } from "@/app/types/types";
import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import { urlFor } from "@/sanity/lib/image";
import TextSection from "./TextSection";
import InterestSection from "./InterestSection";
import Footer from "@/components/ui/footer/Footer";

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
			<HeroSection project={project} imgUrls={imgUrls} />
			<div className="xl:container mx-auto">
				<IntroSection project={project} />
				<TextSection project={project} imgUrls={imgUrls} />
				<InterestSection />
			</div>
			<Footer />
		</section>
	);
};