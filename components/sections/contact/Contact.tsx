import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Image from "next/image";
import BodyBackground from "./BodyBackground";

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
        generalEmail: string;
        rentalEmail: string;
        address1: {
            street: string;
            city: string;
        };
		address2: {
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
			<BodyBackground color="#dddfda" />
			<div className="min-h-[50dvh] bg-[var(--reliwe-green-accent)]">
				<IntroBanner
					title={content.introBanner.title}
					texts={content.introBanner.texts}
					imgUrl=""
					imgAlt=""
					screenReaderH1="Contact us"
					showImage={false}
					bgColor="#dddfda"
				/>
			</div>
            <div className="w-full min-h-[50dvh] md:h-[50dvh] pb-[env(safe-area-inset-bottom)] md:pb-0 bg-[var(--reliwe-green-accent)] flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-full order-2 md:order-1 hidden md:block">
                    <Image
                        fill
                        className="object-contain"
                        src={content.contactInfo.image.asset.url}
                        alt={content.contactInfo.image.alt}
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center items-horizontal-gap order-1 md:order-2 py-12 md:py-0">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-large">
                                Allmänna frågor
                            </p>
                            <a
                                href={`mailto:${content.contactInfo.generalEmail}`}
                                className="text-base font-medium hover:opacity-60 transition-opacity duration-200"
                            >
                                {content.contactInfo.generalEmail}
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-large">
                                Hyra Bostad
                            </p>
                            <a
                                href={`mailto:${content.contactInfo.rentalEmail}`}
                                className="text-base font-medium hover:opacity-60 transition-opacity duration-200"
                            >
                                {content.contactInfo.rentalEmail}
                            </a>
                        </div>
                    </div>
					<div className="flex flex-col md:flex-row gap-8">
						<div className="flex flex-col gap-1">
							<div>
								<p className="text-large">Stockholm</p>
								<p className="text-base font-medium">{content.contactInfo.address1?.street || "Ingen adress angiven"}</p>
								<p className="text-base font-medium">{content.contactInfo.address1?.city || ""}</p>
							</div>
						</div>
						<div className="flex flex-col gap-1">
							<div>
								<p className="text-large">Norrköping</p>
								<p className="text-base font-medium">{content.contactInfo.address2?.street || "Ingen adress angiven"}</p>
								<p className="text-base font-medium">{content.contactInfo.address2?.city || ""}</p>
							</div>
						</div>
					</div>
                </div>
            </div>
        </section>
    )
}