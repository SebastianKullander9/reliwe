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
			<div className="min-h-[50vh] bg-[var(--reliwe-green-accent)]">
				<IntroBanner
					title={content.introBanner.title}
					texts={content.introBanner.texts}
					imgUrl=""
					imgAlt=""
					screenReaderH1="Contact us"
					showImage={false}
					bgColor="#c9cec3"
				/>
			</div>
            <div className="w-full h-[50vh] bg-[var(--reliwe-green-accent)] flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-full order-2 md:order-1 hidden md:block">
                    <Image
                        fill
                        className="object-contain"
                        src={content.contactInfo.image.asset.url}
                        alt={content.contactInfo.image.alt}
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center items-horizontal-gap order-1 md:order-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-large">
                            E-post
                        </p>
                        <p className="text-base font-medium">
                            {content.contactInfo.email}
                        </p>
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