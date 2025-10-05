"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AnimatedButton from "../button/AnimatedButton";
import { Cross as Hamburger } from "hamburger-react";
import MobileMenu from "./MobileMenu";

export default function SecondaryHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
 
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 1) {
                setScrolled(true);
                console.log("true");
            } else {
                setScrolled(false);
                console.log("false");
            }
        })
    }, []);

    return (
        <nav className={`fixed top-0 z-10 w-full flex flex-row site-x-padding mx-auto py-3 items-center justify-between transition-colors duration-300 ${scrolled ? "bg-white" : "bg-[var(--reliwe-green-accent)]"}`}>
            <MobileMenu isOpen={isOpen} />

            <div className="z-[51]">
                <Link href="/">
                    <Image src={`/logo/${scrolled || isOpen ? "reliwe-transparent-green.png" : "reliwe-transparent-black.png"}`} alt="A logo for the company" width={70} height={70} />
                </Link>
            </div>
            <ul className={`gap-8 text-lg hidden md:flex text-[var(${scrolled ? "--reliwe-green": "black"})]`}>
                <Link href="/vara-projekt">
                    <li>Våra projekt</li>
                </Link>
                <Link href="/om-oss">
                    <li>Om oss</li>
                </Link>
                <Link href="/kontakt">
                    <li>Kontakt</li>
                </Link>
            </ul>
            <div className="hidden md:block">
                {scrolled ? (
                    <AnimatedButton label="Anmäl intresse" color="darkGreen" />
                ) : (
                    <AnimatedButton label="Anmäl intresse" color="darkGray" />
                )}
            </div>

            <div className="z-[51] md:hidden">
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={28}  distance="sm" color={scrolled || isOpen ? "#1f5d37" : "black"} />
            </div>
        </nav>
    )
}