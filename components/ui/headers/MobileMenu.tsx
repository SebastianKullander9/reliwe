"use client";

import Link from "next/link";
import BaseButtonBackground from "../buttons/baseButton/BaseButtonBackground";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

type MobileMenuProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
    const [projectsOpen, setProjectsOpen] = useState(false);

    return (
        <section
            className={`${isOpen ? "translate-y-0" : "translate-y-full"} 
                        transition-transform duration-300 fixed inset-0 
                        bg-[var(--reliwe-offwhite)] z-[9999]`}
        >
            <div className="h-full flex flex-col justify-center items-center text-center gap-24 body-x-padding">
                <nav className="flex flex-col text-2xl gap-4 items-center">

                    <Link href="/om-oss" onClick={() => setIsOpen(false)}>
                        Om oss
                    </Link>

                    <button
                        onClick={() => setProjectsOpen(!projectsOpen)}
                        className="text-2xl font-medium flex flex-row items-center"
                    >
                        Projekt
						<MdKeyboardArrowDown size={28} />
                    </button>

                    {projectsOpen && (
                        <div className="flex flex-col text-lg gap-2 mt-2">
                            <Link href="/projekt" onClick={() => setIsOpen(false)}>
                                Alla
                            </Link>
                            <Link href="/projekt?status=planned" onClick={() => setIsOpen(false)}>
                                Planerade
                            </Link>
                            <Link href="/projekt?status=ongoing" onClick={() => setIsOpen(false)}>
                                Pågående
                            </Link>
                            <Link href="/projekt?status=done" onClick={() => setIsOpen(false)}>
                                Genomförda
                            </Link>
                        </div>
                    )}

                    <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                        Kontakt
                    </Link>
                </nav>

                <div>
                    <Link target="_blank" href="https://form.typeform.com/to/eX3wW0qu">
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