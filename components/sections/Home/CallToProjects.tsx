import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";
import Link from "next/link";
import Image from "next/image";

export default function CallToProjects() {
    return (
        <>
            <section className="w-full h-auto lg:h-screen bg-[var(--reliwe-offwhite)] body-x-padding section-y-padding flex flex-col gap-24" aria-labelledby="projects-heading">
                <div className="flex flex-col lg:flex-row items-horizontal-gap lg:gap-0">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-4xl lg:text-7xl text-center lg:text-start">
                            Våra projekt
                        </h2>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col items-vertical-gap">
                        <p>
                            Vi utvecklar bostäder för livet - oavsett om du söker en
                            bostadsrätt eller en hyresrätt. Våra projekt finns i attraktiva
                            tillväxtområden och byggs med fokus på kvalitet, hållbarhet och
                            långsiktigt boende.
                        </p>
                        <div className="hidden lg:block">
                            <Link href="/vara-projekt">
                                <BaseButtonBackground label="Våra projekt" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row h-full gap-24 sm:gap-12">
                    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-full lg:w-1/2 flex flex-col items-vertical-gap">
                        <h3 className="text-center uppercase text-xl tracking-wider">
                            Ekängen, Linköping
                        </h3>
                        <div className="relative w-full h-full">   
                            <Image 
                                fill
                                loading="lazy"
                                className="object-cover"
                                src="/project-images/Ekängen-Bygglov-2024-01-19.jpg" 
                                alt="Visualization of the Ekängen residential project in Linköping" 
                            />
                        </div>
                    </div>
                    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-full lg:w-1/2 flex flex-col items-vertical-gap">
                        <h3 className="text-center uppercase text-xl tracking-wider">
                            Inflygningen, Riksten
                        </h3>
                        <div className="relative w-full h-full">
                            <Image 
                                fill
                                loading="lazy"
                                className="object-cover"
                                src="/project-images/Inflygningen-Perspektiv-gata.jpg" 
                                alt="Visualization of the Inflygningen residential project in Riksten" 
                            />
                        </div>
                    </div>
                    <div className="lg:hidden flex justify-center mt-[-28px]">
                        <Link href="/vara-projekt">
                            <BaseButtonBackground label="Våra projekt" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="w-full h-48 bg-[var(--reliwe-offwhite)]" />
        </>
        
    )
}