import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";
import Image from "next/image";
import Link from "next/link";

export default function CallToAbout() {
    return (
        <section className="w-full h-screen bg-[var(--reliwe-offwhite)] body-x-padding flex items-center" aria-labelledby="about-heading">
            <div className="flex flex-col lg:flex-row items-horizontal-gap">
                <div className="w-full lg:w-1/2 flex flex-col justify-between items-vertical-gap lg:gap-0 items-pb">
                    <h2 className="text-4xl lg:text-7xl text-center lg:text-start">
                        Vi gör plats för livet
                    </h2>
                    <div className="flex flex-col items-vertical-gap">
                        <p className="max-w-prose">
                            Välkommen till en bostadsutvecklare som skapar hållbara hem och
                            levande stadsdelar där människor kan trivas och växa – idag och
                            hela livet ut.
                        </p>
                        <div className="hidden  lg:block">
                            <Link href="/om-oss">  
                                <BaseButtonBackground label="Om oss" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-vertical-gap lg:gap-0">
                    <Image 
                        src="/site-images/hero-2.jpg"
                        loading="lazy"
                        width={1254}
                        height={836}
                        alt="An old couple together on a sofa, looking happy and content"
                    />
                    <div className="lg:hidden flex justify-center">
                        <Link href="/om-oss">
                            <BaseButtonBackground label="Om oss" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}