import Image from "next/image";
import { ProjectWithSubpage } from "@/app/types/types";
import { urlFor } from "@/sanity/lib/image";

interface TextSectionProps {
    project: ProjectWithSubpage;
}

export default function ImageTextSections({ project }: TextSectionProps) {
    const sections = project.subpage?.sections;

    if (!sections?.length) return null;

    const imgUrls = sections.map(section =>
        section.image
            ? urlFor(section.image).width(2000).quality(90).auto("format").url()
            : null
    );

    return (
        <div className="xl:container body-x-padding flex flex-col gap-48 my-24">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className={`flex gap-4 md:gap-12 items-start ${section.imagePosition === "left" ? "flex-col-reverse md:flex-row" : "flex-col-reverse md:flex-row-reverse"}`}
                >
                    {imgUrls[index] && (
                        <div className="relative w-full md:w-[55%] shrink-0 rounded-lg overflow-hidden aspect-[5/6]">
                            <Image
                                src={imgUrls[index]!}
                                alt={section.image?.alt ?? ""}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-6 pt-2 flex-1">
                        <div className="w-15 h-1 bg-[var(--reliwe-green)] rounded-full" />
						{section.title && (
							<h2 className="heading-poppins font-extrabold text-4xl">
								{section.title}
							</h2>
						)}
                        <p className="leading-relaxed">
                            {section.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}