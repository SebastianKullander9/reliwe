import { PortableText } from "@portabletext/react";

const portableTextComponents = {
    marks: {
        link: ({ children, value }: { children: React.ReactNode; value?: { href: string } }) => (
            <a
                href={value?.href}
                className="underline underline-offset-2 hover:opacity-60 transition-opacity duration-200"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </a>
        ),
    },
};

export default function ProjectText({ text }: { text: any }) {
    if (!text) return null;
    if (typeof text === "string") return <p>{text}</p>;
    return <PortableText value={text} components={portableTextComponents} />;
}
