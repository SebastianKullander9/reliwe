import { ReactNode } from "react";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { ProjectWithSubpage } from "@/app/types/types";
import { urlFor } from "@/sanity/lib/image";

const portableTextComponents: PortableTextComponents = {
    block: {
        normal: ({ children }: { children?: ReactNode }) => <p className="leading-relaxed">{children}</p>,
        h3: ({ children }: { children?: ReactNode }) => <h3 className="heading-poppins font-bold text-2xl mt-4">{children}</h3>,
        h4: ({ children }: { children?: ReactNode }) => <h4 className="heading-poppins font-semibold text-xl mt-2">{children}</h4>,
    },
    list: {
        bullet: ({ children }: { children?: ReactNode }) => <ul className="list-disc pl-6 flex flex-col gap-2 leading-relaxed">{children}</ul>,
        number: ({ children }: { children?: ReactNode }) => <ol className="list-decimal pl-6 flex flex-col gap-2 leading-relaxed">{children}</ol>,
    },
    marks: {
        strong: ({ children }: { children?: ReactNode }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
        link: ({ children, value }: { children?: ReactNode; value?: { href?: string } }) => {
            const href = value?.href ?? "";
            const isExternal = /^https?:\/\//.test(href);
            return (
                <a
                    href={href}
                    className="underline underline-offset-2 hover:opacity-60 transition-opacity duration-200"
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                >
                    {children}
                </a>
            );
        },
    },
};

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
                        {section.content?.length ? (
                            <div className="flex flex-col gap-4">
                                <PortableText value={section.content} components={portableTextComponents} />
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}