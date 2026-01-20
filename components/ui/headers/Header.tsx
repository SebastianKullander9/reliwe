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
import { MdKeyboardArrowDown } from "react-icons/md";

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
    const [hamburgerColor, setHamburgerColor] = useState(btnScrollChange ? "#faf7f5" : "#faf7f5");

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

    useEffect(() => {
    const watchScroll = () => {
        const currentScroll = window.scrollY;
        
        // Handle color changes
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

        const hideThreshold = colorCutoff + 100;
        
        if (currentScroll > prevScroll.current && currentScroll > hideThreshold) {
            setShowHeader(false);
        } else {
            setShowHeader(true);
        }

        prevScroll.current = currentScroll;
    };

    window.addEventListener("scroll", watchScroll);
    return () => window.removeEventListener("scroll", watchScroll);
}, [colorCutoff, startBackground, scrolledBackground, startTextColor, scrolledTextColor, btnScrollChange]);

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
                className={`fixed w-full header-height grid grid-cols-3 items-center body-x-padding z-[9999]
                    ${showHeader ? "translate-y-0" : "-translate-y-full"} 
                    transition-transform duration-300`}
                style={{ backgroundColor: isOpen ? "var(--reliwe-offwhite)" : background }}
            >
                <div className="flex justify-start">
                    <Link href="/" aria-label="Go to reliwe home page">
                        <Image 
                            width={80} 
                            height={80} 
                            src={
                                isOpen ? (
                                    "/logo/reliwe-logo-black.png"
                                ): btnScrollChange
                                ? (btnColor ? "/logo/reliwe-logo-offwhite.png" : "/logo/reliwe-logo-offwhite.png")
                                : 
                                "/logo/reliwe-logo-offwhite.png"
                            } 
                            alt="Reliwe company logo"
                            priority
                        />
                    </Link>
                    <span className="sr-only">Reliwe</span>
                </div>
                <div className="hidden md:flex justify-center">
					<nav aria-label="Main navigation" className="gap-16 flex">
						{linkData.map((link) => {
							const isActive = pathname.startsWith(link.href);

							if (link.href === "/projekt") {
								return (
									<div key={link.href} className="relative group flex flex-col items-center">
										<Link href="/projekt">
											<span className="relative cursor-pointer" style={{ color: text }}>
												<div className="flex flex-row items-center">
													{link.label}
													<MdKeyboardArrowDown size={28} />
												</div>
											<span
												className={`absolute left-0 bottom-[-3] h-[1px] transition-all duration-300
												w-0 ${isActive ? "w-full" : "group-hover:w-full"}`}
												style={{ backgroundColor: text }}
											/>
											</span>
										</Link>

									<div
										className="absolute top-full left-1/2 -translate-x-1/2
												opacity-0 group-hover:opacity-100
												pointer-events-none group-hover:pointer-events-auto
												transition"
									>
										<div className="bg-[var(--reliwe-offwhite)] rounded-md shadow-md py-2 min-w-[160px]">
										<Link href="/projekt" className="block px-4 py-2 hover:bg-gray-100">
											Alla
										</Link>
										<Link href="/projekt?status=planned" className="block px-4 py-2 hover:bg-gray-100">
											Planerade
										</Link>
										<Link href="/projekt?status=ongoing" className="block px-4 py-2 hover:bg-gray-100">
											Pågående
										</Link>
										<Link href="/projekt?status=done" className="block px-4 py-2 hover:bg-gray-100">
											Genomförda
										</Link>
										</div>
									</div>
									</div>
								);
							}

							return (
							<Link key={link.href} href={link.href}>
								<span className="relative group" style={{ color: text }}>
								{link.label}
								<span
									className={`absolute left-0 bottom-[-3] h-[1px] transition-all duration-300
									w-0 ${isActive ? "w-full" : "group-hover:w-full"}`}
									style={{ backgroundColor: text }}
								/>
								</span>
							</Link>
							);
						})}
						</nav>
				</div>
                <div className="md:hidden ml-auto col-end-4">
					<Hamburger
						toggled={isOpen}
						toggle={setIsOpen}
						distance="sm"
						size={28}
						color={isOpen ? "black" : hamburgerColor}
					/>
				</div>
            </header>
        </>
    );
}