import Link from "next/link";
import Image from "next/image";
import ButtonAnimationWrapper from "@/components/ui/buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "@/components/ui/buttons/newButtons/ButtonBackground";

type SanityImage = {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
}

type FeaturedProject = {
    title: string;
    images?: SanityImage;
    year?: string;
    imageUrl?: string;
}

type CallToProjectsData = {
    heading: string;
    text: string;
    featuredProjects: FeaturedProject[];
}

export default function CallToProjects({ data }: { data: CallToProjectsData }) {
    const { heading, text, featuredProjects } = data;

    return (
        <>
            <section
                className="w-full h-auto py-24 lg:h-screen bg-[var(--reliwe-offwhite)] body-x-padding section-y-padding flex flex-col gap-24"
                aria-labelledby="projects-heading"
            >
                <div className="flex flex-col lg:flex-row items-horizontal-gap lg:gap-0">
                    <div className="w-full lg:w-1/2">
                        <h2 className="heading lg:text-start text-center">{heading}</h2>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col items-vertical-gap">
                        <p className="">{text}</p>
                        <div className="hidden lg:block">
                            <Link href="/projekt">
								<ButtonAnimationWrapper>
                           	 		<ButtonBackground label="Läs mer" />
								</ButtonAnimationWrapper>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row h-full gap-24 sm:gap-12">
                    {featuredProjects.map((project) => (
                        <div
                            key={project.title}
                            className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-full lg:w-1/2 flex flex-col "
                        >
                            <div className="relative w-full h-full">
                                {project.imageUrl && (
                                    <Image
                                        fill
                                        loading="lazy"
                                        className="object-cover"
                                        src={project.imageUrl}
                                        alt={project.images?.alt || project.title}
										unoptimized
                                    />
                                )}
                            </div>
							<div className="flex flex-col md:flex-row items-center justify-between bg-[var(--reliwe-green)] p-3 text-[var(--reliwe-offwhite)]">
								<h3 className="text-start text-lg md:text-xl tracking-wider">{project.title}</h3>
								<p className="!text-sm">Pågående</p>
							</div>
                        </div>
                    ))}

                    <div className="lg:hidden flex justify-center mt-[-28px]">
                        <Link href="/projekt">
							<ButtonAnimationWrapper>
                            	<ButtonBackground label="Läs mer" />
							</ButtonAnimationWrapper>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="w-full h-48 bg-[var(--reliwe-offwhite)]" />
        </>
    );
}