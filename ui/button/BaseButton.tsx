import { RefObject } from "react";

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
}

export default function BaseButton({ label, handleMouseEnter, handleMouseLeave, textRef, bgRef, colorScheme }: BaseButtonProps) {

    console.log(colorScheme)
    return (
        <button
            className={`relative w-full px-4 py-2 border-1 cursor-pointer rounded-full overflow-hidden`}
            style={{ borderColor: colorScheme.border, backgroundColor: colorScheme.background}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p ref={textRef} className={`relative z-10 site-text-size`} style={{ color: colorScheme.text }}>{label}</p>
            <div
                ref={bgRef}
                className={`absolute inset-0 translate-y-full`}
                style={{ backgroundColor: colorScheme.hoverBackground }}
            ></div>
        </button>
    )
}