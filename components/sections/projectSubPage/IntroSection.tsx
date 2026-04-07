import { ProjectWithSubpage } from "@/app/types/types";
import InfoCard from "@/components/ui/infoCard/InfoCard";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface InfoSectionProps {
	project: ProjectWithSubpage;
}

export default function IntroSection({ project }: InfoSectionProps) {
	const introContent = project.subpage?.intro;
    
	const imgUrl = introContent?.image
        ? urlFor(introContent.image).width(2000).quality(90).auto("format").url()
        : null;

	return (
		<div className="w-full flex ">
			<div className="body-x-padding py-24 flex flex-col md:flex-row justify-between w-full gap-4 md:gap-8 lg:gap-12">
				<div className="flex flex-col gap-8">
					<h2 className="heading-poppins font-extrabold text-4xl">
						{introContent?.title}
					</h2>
					<div className="flex flex-col gap-4 md:gap-12">
						<p>
							{introContent?.text}
						</p>
						{imgUrl && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                                <Image
                                    src={imgUrl}
                                    alt={introContent?.image?.alt ?? ""}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
					</div>
				</div>
				<InfoCard project={project} />
			</div>
		</div>
	);
};