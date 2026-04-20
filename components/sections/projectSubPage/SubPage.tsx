import { ProjectWithSubpage } from "@/app/types/types";
import HeroSection from "./HeroSection";
import IntroSection from "./IntroSection";
import { urlFor } from "@/sanity/lib/image";
import ImageTextSections from "./ImageTextSections";
import InterestSection from "./InterestSection";
import Footer from "@/components/ui/footer/Footer";
import GallerySection from "./GallerySection";

interface ProjectSubPageProps {
	project: ProjectWithSubpage;
}

export default function SubPage({ project }: ProjectSubPageProps) {
	const heroUrl = project.subpage.heroImage
		? urlFor(project.subpage.heroImage).width(2000).quality(90).auto("format").url()
		: undefined;

	return (
		<section>
			<HeroSection project={project} heroUrl={heroUrl} />
			<div className="xl:container mx-auto">
				<IntroSection project={project} />
				<ImageTextSections project={project} />
				<GallerySection project={project} />
				<InterestSection
					projectTitle={project.title}
					availableRooms={project.subpage?.availableRooms ?? []}
				/>
				
			</div>
			<Footer />
		</section>
	);
};