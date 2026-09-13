"use client";

import Link from "next/link";
import BaseButtonBackground from "../buttons/baseButton/BaseButtonBackground";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiArrowUpRight } from "react-icons/fi";

type MobileMenuProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    return (
        <section
            className={`${isOpen ? "translate-y-0" : "translate-y-[110%]"} 
                        transition-transform duration-300 fixed inset-0 
                        bg-[var(--reliwe-offwhite)] z-[9999]`}
        >
            <div className="h-full flex flex-col justify-center items-center text-center gap-24 body-x-padding relative">
				<button
					aria-label="Close menu"
					onClick={() => setIsOpen(false)}
					className="absolute top-6 right-6 text-3xl"
				>
					✕
				</button>
                <nav className="flex flex-col text-2xl gap-4 items-center">
					<Link href="/">
						Hem
					</Link>
                    <Link href="/om-oss">
                        Om oss
                    </Link>

					<Link href="/projekt">
                        Projekt
                    </Link>

					<a
						href="https://lewabostad.se"
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-row items-center gap-1"
					>
						Lewa Bostad
						<FiArrowUpRight size={22} />
					</a>

                    <Link href="/kontakt">
                        Kontakt
                    </Link>
                </nav>

                <div>
                    <Link href="/intresse">
                        <BaseButtonBackground 
                            label="Anmäl intresse" 
                            bgColor="#1f5d37" 
                            hoverTextColor="#faf7f5" 
                        />
                    </Link>
                </div>

                <div className="absolute bottom-4 !text-sm flex flex-col gap-2">
                    <Link href="/integritetspolicy" onClick={() => setIsOpen(false)}>
                        <span className="!text-sm underline underline-offset-3">Integritetspolicy</span>
                    </Link>
                    <p className="!text-sm">© {new Date().getFullYear()} Reliwe AB</p>
                </div>
            </div>
        </section>
    )
}