"use client";

import Image from "next/image";
import heroImage from "@/public/site-images/hero.jpg";
import LogoImage from "@/public/logo/reliwe-logo-offwhite.png";
import { americana } from "../../../app/fonts";

export default function Hero() {
    return (
        <section className="relative -z-20">
            <div className="absolute sm:fixed inset-0 bg-[var(--reliwe-offwhite)]">
                <Image 
                    src={heroImage} 
                    alt="Background image for hero section" 
                    fill
                    className="object-cover  transition-opacity duration-500"
                    placeholder="blur"
                    priority
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/40" />
            </div>
			
            <div className="relative w-full h-[100svh] flex flex-col justify-end pb-[10vh] items-center leading-[10vw] lg:leading-[7vw] gap-36">
                <div className="">
                    <h1 className={`${americana.className} text-6xl sm:text-7xl md:text-8xl xl:text-8xl text-center text-[var(--reliwe-offwhite)]`}>En plats för livet</h1>
                </div>
				<div className="relative w-[clamp(140px,25vw,240px)]">
					<Image 
						src={LogoImage}
						alt="Image of the companys logo"
						priority
					/>
				</div>
            </div>
        </section>
    );
}