"use client";

import Image from "next/image";
import heroImage from "@/public/site-images/barkaby-hero.webp";

export default function Hero() {
    return (
        <section className="relative -z-20 h-screen">
            <div className="absolute sm:fixed inset-0">
                <Image 
                    src={heroImage} 
                    alt="Background image for hero section" 
                    fill
                    className="object-cover transition-opacity duration-500"
                    placeholder="blur"
                    priority
					sizes="100vw"
					quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/30" />
            </div>
        </section>
    );
}

/*
<div className="relative w-full  flex flex-col justify-end pb-[10vh] items-center leading-[10vw] lg:leading-[7vw] gap-36">
	<div className="w-[clamp(170px,25vw,320px)] absolute top-1/2 -translate-y-1/2">
		<Image 
			src={LogoImage}
			alt="Image of the companys logo"
			priority
		/>
	</div>
</div>
*/