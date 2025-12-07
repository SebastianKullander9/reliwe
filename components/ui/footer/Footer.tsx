import Image from "next/image";
import BaseButtonBackground from "../buttons/baseButton/BaseButtonBackground";
import Link from "next/link";

type FooterProps = {
    aboveHero?: boolean;
    isFooterVisible?: boolean;
    isClient?: boolean;
}

export default function Footer({ aboveHero, isFooterVisible, isClient=false }: FooterProps) {
    return (
        <>
            <footer className={`w-full h-screen flex flex-col md:flex-row fixed inset-0 transition-all duration-300 ${isClient ? "" : "z-1"} ${
                isFooterVisible ? "z-10" : (aboveHero ? "-z-20" : "-z-30")
            }`}>
                <div className="w-full md:w-1/2 h-full bg-[var(--reliwe-green-accent)] flex items-center justify-center order-1 md:order-none pb-12 md:pb-0">
                    <Image 
                        src="/site-images/tree-accent-green-new.jpg" 
                        alt="An illustration of a tree that fits with the brands color scheme"
                        width={600} 
                        height={600}
                    />
                </div>
                <div className="w-full md:w-1/2 h-full bg-[var(--reliwe-green-accent)] flex flex-col items-center justify-center body-x-padding">
					<div className="flex flex-col items-vertical-gap">
						<div className="flex flex-col gap-4 md:gap-48 justify-between h-full">
							<h2 className="heading text-center">
								Du hittar oss här
							</h2>
							<p className="text-center">
								Har du frågor om våra projekt eller vill komma i kontakt med oss?
							</p>
						</div>
						<div className="flex items-center flex-col">
							<Link href="/kontakt">
								<BaseButtonBackground label="Kontakta oss" bgColor="#1f5d37" hoverTextColor="#faf7f5"/>
							</Link>
						</div>
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

            <div className="w-full h-screen pointer-events-none" aria-hidden="true" data-scroll-spacer />
        </>
    );
}