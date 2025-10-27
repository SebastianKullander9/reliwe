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
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative w-full h-[100svh] flex flex-col justify-center items-center leading-[10vw] lg:leading-[7vw] gap-36">
                <div>
                    <h1 className={`${americana.className} text-[7.2svw] lg:text-[4.61svw] text-[#d8e6dc] uppercase`}>En plats för</h1>
                    <h1 className={`${americana.className} text-[18.8svw] lg:text-[12svw] text-[#d8e6dc] uppercase`}>Livet</h1>
                </div>
            </div>
        </section>
    );
}