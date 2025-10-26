import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Image from "next/image";

type SanityImage = {
    asset: {
        url: string;
    };
    alt: string;
}

type ContactContent = {
    introBanner: {
        title: string;
        texts: string[];
    };
    contactInfo: {
        email: string;
        address: {
            street: string;
            city: string;
        };
        image: SanityImage;
    };
}

export default function Contact({ content }: { content: ContactContent }) {
    if (!content || !content.introBanner) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <IntroBanner
                title={content.introBanner.title}
                texts={content.introBanner.texts}
                imgUrl=""
                imgAlt=""
                screenReaderH1="Contact us"
                showImage={false}
            />
            <div className="w-full h-[50vh] bg-[var(--reliwe-green-accent)] flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-full order-2 md:order-1">
                    <Image
                        fill
                        className="object-contain"
                        src={content.contactInfo.image.asset.url}
                        alt={content.contactInfo.image.alt}
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center items-horizontal-gap order-1 md:order-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-family text-[21px]">
                            E-post
                        </h2>
                        <p>
                            {content.contactInfo.email}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-family text-[21px]">
                            Besöksadress
                        </h2>
                        <div>
                            <p>
                                {content.contactInfo.address.street}
                            </p>
                            <p>
                                {content.contactInfo.address.city}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}