import Image from "next/image";
import BaseButtonBackground from "../buttons/baseButton/BaseButtonBackground";
import Link from "next/link";

type FooterProps = {
    aboveHero?: boolean;
}

export default function Footer({ aboveHero }: FooterProps) {
    return (
        <>
            <footer className={`w-full h-screen flex flex-col md:flex-row fixed inset-0 -z-20 ${aboveHero ? "-z-20" : "-z-30"}`}>
                <div className="w-full md:w-1/2 h-full bg-[var(--reliwe-green-accent)] flex items-center justify-center order-1 md:order-none pb-12 md:pb-0">
                    <Image 
                        src="/site-images/tree-accent-green.jpg" 
                        alt="An illustration of a tree that fits with the brands color scheme"
                        width={600} 
                        height={600}
                    />
                </div>
                <div className="w-full md:w-1/2 h-full bg-[var(--reliwe-green-accent)] flex flex-col items-vertical-gap items-center justify-center">
                    <h2 className="text-4xl lg:text-7xl text-center">
                        Du hittar oss här
                    </h2>
                    <p className="text-center">
                        Har du frågor om våra projekt eller vill komma i kontakt med oss?
                    </p>
                    <div>
                        <Link href="/kontakt">
                            <BaseButtonBackground label="Kontakta oss" bgColor="#1f5d37" hoverTextColor="#faf7f5"/>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-24 flex justify-center">
                    <div className="absolute bottom-4 !text-sm flex flex-row items-horizontal-gap items-center">
                        <p className="!text-sm">© {new Date().getFullYear()} Reliwe Sverige AB</p>
                        <p>|</p>
                        <Link href="/integritetspolicy">
                            <span className="!text-sm hover:underline">Integritetspolicy</span>
                        </Link>
                    </div>
                </div>
            </footer>
            <div className="w-full h-screen pointer-events-none -z-50" aria-hidden="true" data-scroll-spacer />
        </>
    );
}