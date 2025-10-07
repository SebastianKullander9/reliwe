"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AnimatedButton from "../button/AnimatedButton";
import { Cross as Hamburger } from "hamburger-react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

export default function SecondaryHeader() {
    const pathname = usePathname(); // current route
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
 
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 1);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/vara-projekt", label: "Våra projekt" },
        { href: "/om-oss", label: "Om oss" },
        { href: "/kontakt", label: "Kontakt" },
    ];

    return (
        <nav className={`fixed top-0 z-10 w-full flex flex-row site-x-padding mx-auto py-3 items-center justify-between transition-colors duration-300 ${scrolled ? "bg-white" : "bg-[var(--reliwe-green-accent)]"}`}>
            <MobileMenu isOpen={isOpen} />

            <div className="z-[51]">
                <Link href="/">
                    <Image src={`/logo/${scrolled || isOpen ? "reliwe-transparent-green.png" : "reliwe-transparent-black.png"}`} alt="A logo for the company" width={70} height={70} />
                </Link>
            </div>
            <ul className={`gap-8 text-lg hidden md:flex text-[var(${scrolled ? "black": "black"})]`}>
                {navLinks.map((link) => {
                const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href}>
                           <li className="relative cursor-pointer group">
                                {link.label}
                                <span
                                    className={`absolute left-0 bottom-0 h-[1px] bg-black transition-all duration-300 ${
                                        isActive ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                                ></span>
                            </li>
                        </Link>
                    );
                })}
            </ul>
            <div className="hidden md:block">
                {scrolled ? (
                    <AnimatedButton label="Anmäl intresse" color="darkGreen" linkTo="/" />
                ) : (
                    <AnimatedButton label="Anmäl intresse" color="darkGray" linkTo="/" />
                )}
            </div>

            <div className="z-[51] md:hidden">
                <Hamburger toggled={isOpen} toggle={setIsOpen} size={28}  distance="sm" color={scrolled || isOpen ? "#1f5d37" : "black"} />
            </div>
        </nav>
    )
}