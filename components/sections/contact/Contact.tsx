import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Image from "next/image";

export default function Contact() {
    return (
        <section>
            <IntroBanner
                title="Hur kan vi hjälpa till?"
                texts={["Varmt välkommen att kontakta oss om du har frågor om företaget eller våra projekt."]}
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
                        src="/site-images/tree-accent-green.jpg"
                        alt="Illustration of a tree with a matching color scheme for reliwe"
                    />
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center items-horizontal-gap order-1 md:order-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-family text-[21px]">
                            E-post
                        </h2>
                        <p>
                            info@reliwe.se
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-family text-[21px]">
                            Besöksadress
                        </h2>
                        <div>
                            <p>
                                Ingmar Bergmans Gata 2
                            </p>
                            <p>
                                114 34 Stockholm, Sweden
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}