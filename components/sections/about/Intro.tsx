import Image from "next/image";

type IntroProps = {
    title: string;
    text: string;
    image: {
        asset: { _ref?: string; url?: string };
        alt?: string;
    };
};

export default function Intro({ title, text, image }: IntroProps) {
    return (
        <>
            <section 
                className="w-full min-h-screen body-x-padding section-y-padding bg-[var(--reliwe-offwhite)] flex flex-col md:flex-row justify-center items-vertical-gap md:gap-0"
            >
                <div className="w-full md:w-1/2 flex flex-col md:justify-between items-vertical-gap md:gap-0">
                    <h2 className="heading text-center md:text-start">{title}</h2>
                    <p className="max-w-prose">{text}</p>
                </div>
                <div className="w-full aspect-[4/5] md:aspect-auto md:w-1/2 relative">
                    {image?.asset?.url && (
                        <Image 
                            src={image.asset.url}
                            fill
                            className="object-cover xl:object-contain xl:object-right"
                            alt={image.alt || ""}
                        />
                    )}
                </div>
            </section>
            <div className="w-full h-24 bg-[var(--reliwe-offwhite)]" />
        </>
    )
}