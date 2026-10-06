import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Intro from "./Intro";
import ScrollSection from "./scrollSection/ScrollSection";
import KeyNumbers from "../Home/KeyNumbers";
import Interest from "../interest/Interest";
import Background, { BackgroundButton, BackgroundImage } from "./Background";

type SanityImage = {
    asset: {
        url: string;
    };
    alt: string;
}

type ScrollSectionContent = {
    title: string;
    text: string;
}

type BackgroundSectionContent = {
    _key?: string;
    title: string;
    texts: string[];
    image?: BackgroundImage;
    imagePosition?: "left" | "right";
    button?: BackgroundButton;
}

type AboutContent = {
    introBanner: {
        title: string;
        texts: string[];
        image: SanityImage;
    };
    intro: {
        title: string;
        text: string;
        image: SanityImage;
    };
    scrollSections: ScrollSectionContent[];
    backgroundSections?: BackgroundSectionContent[];
    /** Legacy single section, kept as a fallback until the content is migrated. */
    background?: BackgroundSectionContent;
}

export default function About({ content }: { content: AboutContent }) {
    if (!content || !content.introBanner) {
        return <div>Loading...</div>;
    }

    const backgroundSections = content.backgroundSections?.length
        ? content.backgroundSections
        : content.background
            ? [content.background]
            : [];

    return (
        <section>
            <IntroBanner 
                title={content.introBanner.title}
                texts={content.introBanner.texts}
                imgUrl={content.introBanner.image.asset.url}
                imgAlt={content.introBanner.image.alt}
                screenReaderH1="About us"
            />
            <Intro 
                title={content.intro.title}
                text={content.intro.text}
                image={content.intro.image}
            />
			<ScrollSection sections={content.scrollSections ?? []} />
			<div className="h-24 w-full bg-[var(--reliwe-offwhite)]" />
			<KeyNumbers />
			{backgroundSections.map((section, index) => (
				<Background
					key={section?._key ?? index}
					title={section?.title}
					texts={section?.texts}
					image={section?.image}
					imagePosition={section?.imagePosition}
					button={section?.button}
				/>
			))}
			{/* <Interest /> hidden: "Anmäl intresse" is now available in the header */}
        </section>
    )
}