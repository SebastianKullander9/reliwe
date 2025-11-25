import Accordion from "@/components/ui/accordion/Accordion";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/lib/client";

type Section = {
	title: string;
	content: PortableTextBlock[];
}

type IntegrityPolicy = {
	title: string;
	sections: Section[];
}

const portableTextComponents = {
    block: {
        normal: ({ children }: any) => <p className="mb-4">{children}</p>,
        h1: ({ children }: any) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-lg font-bold mb-3">{children}</h3>,
    },
    marks: {
        strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
    },
};

async function getIntegrityPolicy() {
    const query = `*[_type == "integrityPolicy"][0]{
        title,
        sections[]{
            title,
            content
        }
    }`;
    
    return await client.fetch<IntegrityPolicy>(query, {}, { next: { revalidate: 0 } });

}

export default async function IntegrityPolicy() {
    const policy = await getIntegrityPolicy();

    return (
        <section className="w-full min-h-screen bg-[var(--reliwe-offwhite)] flex flex-col items-center justify-start pt-48 gap-12 body-x-padding">
            <h1 className="heading text-4xl lg:text-5xl text-center pb-12">{policy.title}</h1>
            <div className="max-w-prose w-full pb-24">
                {policy.sections.map((section: Section, index: number) => (
                    <Accordion 
                        key={index}
                        title={section.title}
                        content={<PortableText value={section.content} components={portableTextComponents}/>}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}