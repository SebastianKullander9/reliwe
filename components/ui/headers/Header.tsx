"use client";

import Link from "next/link";
import Image from "next/image";
import { linkData } from "./linkData";
import BaseButton from "../buttons/baseButton/BaseButton";
import { Cross as Hamburger } from "hamburger-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import BaseButtonBackground from "../buttons/baseButton/BaseButtonBackground";
import MobileMenu from "./MobileMenu";

type HeaderProps = {
    startBackground: string;
    scrolledBackground: string;
    startTextColor: string;
    scrolledTextColor: string;
    colorCutoff: number;
    btnScrollChange?: boolean;
}

export default function Header({ 
    startBackground, 
    scrolledBackground, 
    startTextColor, 
    scrolledTextColor, 
    colorCutoff,
    btnScrollChange=false
}: HeaderProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const prevScroll = useRef(0);
    const [background, setBackground] = useState(startBackground);
    const [text, setText] = useState(startTextColor);
    const [btnColor, setBtnColor] = useState("#faf7f5");
    const [hamburgerColor, setHamburgerColor] = useState(btnScrollChange ? "#faf7f5" : "black");

    useEffect(() => {
        const watchScroll = () => {
            const currentScroll = window.scrollY;
            
            if (window.scrollY < colorCutoff) {
                setBackground(startBackground);
                setText(startTextColor);
                setBtnColor("#faf7f5");
                
                if (btnScrollChange) {
                    setHamburgerColor("#faf7f5");
                }
            } else {
                setBackground(scrolledBackground);
                setText(scrolledTextColor);
                setBtnColor("")

                if (btnScrollChange) {
                    setHamburgerColor("black");
                }
            }

            if (currentScroll > prevScroll.current && currentScroll > 30) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }

            prevScroll.current = currentScroll;
        };

        window.addEventListener("scroll", watchScroll);
        return () => window.removeEventListener("scroll", watchScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    return (
        <>
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

            <header 
                className={`fixed w-full header-height flex flex-row justify-between items-center body-x-padding z-[9999]
                    ${showHeader ? "translate-y-0" : "-translate-y-full"} 
                    transition-transform duration-300`}
                style={{ backgroundColor: isOpen ? "var(--reliwe-offwhite)" : background }}
            >
                <div className="min-w-50 flex justify-start">
                    <Link href="/" aria-label="Go to reliwe home page" onClick={() => setIsOpen(false)}>
                        <Image 
                            width={80} 
                            height={80} 
                            src={
                                isOpen ? (
                                    "/logo/reliwe-logo-black.png"
                                ): btnScrollChange
                                ? (btnColor ? "/logo/reliwe-logo-offwhite.png" : "/logo/reliwe-logo-black.png")
                                : 
                                "/logo/reliwe-logo-black.png"
                            } 
                            alt="Reliwe company logo"
                            priority
                        />
                    </Link>
                    <span className="sr-only">Reliwe</span>
                </div>
                <nav aria-label="Main navigation" className="gap-16 hidden md:flex">
                    {linkData.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link key={link.href} href={link.href}>
                                <span className="relative group" style={{ color: text }}>
                                    {link.label}
                                    <span 
                                        className={`
                                            absolute left-0 bottom-0 h-[1px] transition-all duration-300
                                            w-0 ${isActive ? "w-full" : "group-hover:w-full"}
                                            group-focus:w-full focus-visible:w-full
                                        `}
                                        style={{ backgroundColor: text }}
                                    ></span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="min-w-50 justify-end hidden md:flex">
                    {btnScrollChange ? (
                        btnColor ? (
							<Link target="_blank" href="https://form.typeform.com/to/LGYdubKX">
								<BaseButton 
									label="Anmäl intresse" 
									bgColor={btnColor} 
									hoverTextColor="#000000"
								/>
							</Link>
                        ) : (
							<Link target="_blank" href="https://form.typeform.com/to/LGYdubKX">
                            	<BaseButtonBackground label="Anmäl intresse" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
							</Link>
                        )
                    ) : (
						<Link target="_blank" href="https://form.typeform.com/to/LGYdubKX">
                        	<BaseButtonBackground label="Anmäl intresse" bgColor="#1f5d37" hoverTextColor="#faf7f5" />
						</Link>
                    )}  
                </div>
                <div className="md:hidden">
                    <Hamburger toggled={isOpen} toggle={setIsOpen} distance="sm" size={28} color={isOpen ? "black" : hamburgerColor} />
                </div>
            </header>
        </>
    );
}