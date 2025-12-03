import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Intro from "./Intro";
import ScrollSection from "./scroll/scrollSection";
import Sustainability from "./sustainability/Sustainability";

type SanityImage = {
    asset: {
        url: string;
    };
    alt: string;
}

type SustainabilityCard = {
    image: SanityImage;
    title: string;
    text: string;
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
    ourVision: {
        title: string;
        text: string;
    };
    ourRole: {
        title: string;
        text: string;
    };
    sustainability: SustainabilityCard[];
}

export default function About({ content }: { content: AboutContent }) {
    if (!content || !content.introBanner) {
        return <div>Loading...</div>;
    }

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
           	<ScrollSection />
            <Sustainability cards={content.sustainability} />
        </section>
    )
}