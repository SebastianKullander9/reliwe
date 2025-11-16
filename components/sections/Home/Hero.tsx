"use client";

import Image from "next/image";
import heroImage from "@/public/site-images/hero.jpg";
import { americana } from "../../../app/fonts";

export default function Hero() {
    return (
        <section className="relative -z-20">
            <div className="absolute sm:fixed inset-0 bg-[#0d0d0d]">
                <Image 
                    src={heroImage} 
                    alt="Background image for hero section" 
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500"
                    placeholder="blur"
                    priority
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/40" />
            </div>
            <div className="relative w-full h-[100svh] flex flex-col justify-end pb-[33vh] items-center leading-[10vw] lg:leading-[7vw] gap-36">
                <div className="">
                    <h1 className={`${americana.className} text-6xl sm:text-7xl md:text-8xl xl:text-9xl text-center text-[var(--reliwe-offwhite)]`}>En plats för livet</h1>
                </div>
            </div>
        </section>
    );
}