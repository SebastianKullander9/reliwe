import { RefObject } from "react";
import Link from "next/link";

type colorScheme = {
    text: string;
    background: string;
    hoverBackground: string;
    hoverText: string;
    border: string;
}

interface BaseButtonProps {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    textRef: RefObject<HTMLParagraphElement | null>;
    bgRef: RefObject<HTMLDivElement | null>;
    label: string;
    colorScheme: colorScheme;
    linkTo: string;
}

export default function BaseButton({ label, handleMouseEnter, handleMouseLeave, textRef, bgRef, colorScheme, linkTo }: BaseButtonProps) {

    console.log(colorScheme)
    return (
        <button
            className={`relative w-full px-4 py-2 border-1 cursor-pointer rounded-full overflow-hidden`}
            style={{ borderColor: colorScheme.border, backgroundColor: colorScheme.background}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={linkTo}>
                <p ref={textRef} className={`relative z-10 site-text-size`} style={{ color: colorScheme.text }}>{label}</p>
            </Link>
            <div
                ref={bgRef}
                className={`absolute inset-0 translate-y-full`}
                style={{ backgroundColor: colorScheme.hoverBackground }}
            ></div>
        </button>
    )
}