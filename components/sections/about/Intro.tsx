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
  				className="w-full min-h-screen body-x-padding section-y-padding bg-[var(--reliwe-offwhite)] flex flex-col md:flex-row"
			>
                <div className="w-full md:w-[60%] flex flex-col md:justify-between items-vertical-gap md:gap-0">
                    <h2 className="heading text-center md:text-start">{title}</h2>
                    <p className="max-w-prose">{text}</p>
                </div>
                <div className="w-full md:w-[40%] relative aspect-[4/5] md:aspect-auto md:min-h-full">
                    {image?.asset?.url && (
                        <Image
							src={image.asset.url}
							fill
							className="object-cover"
							alt={image.alt || ""}
						/>
                    )}
                </div>
            </section>
            <div className="w-full h-24 bg-[var(--reliwe-offwhite)]" />
        </>
    )
}