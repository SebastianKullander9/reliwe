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
                        content={<PortableText value={section.content} />}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}