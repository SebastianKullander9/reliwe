import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface CallToAboutData {
    heading: string;
    text: string;
    image?: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
        alt?: string;
    };
}

export default function CallToAbout({ data }: { data: CallToAboutData }) {
    const { heading, text, image } = data;

    return (
        <section
            className="w-full py-24 md:h-[calc(100vh+100px)] bg-[var(--reliwe-offwhite)] body-x-padding flex items-center"
            aria-labelledby="about-heading"
        >
            <div className="flex flex-col lg:flex-row items-horizontal-gap max-h-9/10">
                <div className="w-full lg:w-1/2 flex flex-col justify-between items-vertical-gap lg:gap-0">
                    <h2 className="heading lg:text-start lg:max-w-[10ch] text-center">{heading}</h2>
                    <div className="flex flex-col items-vertical-gap max-w-prose">
                        <p className="max-w-prose">{text}</p>
                        <div className="hidden lg:block">
                            <Link href="/om-oss">
                                <BaseButtonBackground
                                    label="Om oss"
                                    bgColor="#1f5d37"
                                    hoverTextColor="#faf7f5"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-vertical-gap lg:gap-0 relative">
                    {image && (
                        <Image
                            src={urlFor(image).url()}
							width={2000}
							height={800}
							className="object-contain max-h-full object-right"
                            alt={image.alt || ""}
                            loading="lazy"
                        />
                    )}
                    <div className="lg:hidden flex justify-center">
                        <Link href="/om-oss">
                            <BaseButtonBackground
                                label="Om oss"
                                bgColor="#1f5d37"
                                hoverTextColor="#faf7f5"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}