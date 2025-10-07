"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import BaseButton from "./BaseButton";

const colorScheme = {
    lightGreen: {
        text: "#cddbd3",
        border: "#cddbd3",
        background: "transparent",
        hoverBackground: "#cddbd3",
        hoverText: "black",
    },
    darkGreen: {
        text: "white",
        border: "#1f5d37",
        background: "#1f5d37",
        hoverBackground: "black",
        hoverText: "white",
    },
    darkGray: {
        text: "black",
        border: "black",
        background: "transparent",
        hoverBackground: "black",
        hoverText: "white",
    },
    white: {
        text: "#1f5d37",
        border: "#1f5d37",
        background: "white",
        hoverBackground: "#cddbd3",
        hoverText: "black",
    }
}

type ColorSchemeKey = keyof typeof colorScheme;

export default function AnimatedButton({ label, color, linkTo }: { label: string, color: ColorSchemeKey, linkTo: string }) {
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const tl = useRef<gsap.core.Timeline>(null);

    const scheme = colorScheme[color];


    useEffect(() => {
        if (!bgRef.current || !textRef.current) return;
        
        tl.current = gsap.timeline({ paused: true });

        tl.current
        .fromTo(
            bgRef.current,
            { y: "100%" },
            { y: "0%", duration: 0.3, ease: "power1.out" }
        )
        .to(
            textRef.current,
            { color: scheme.hoverText, duration: 0.1, ease: "none" },
            0
        );
    }, []);

    const handleMouseEnter = () => {
        tl.current?.play();
    };

    const handleMouseLeave = () => {
        tl.current?.reverse();
    };

    return (
        <BaseButton 
            handleMouseLeave={handleMouseLeave} 
            handleMouseEnter={handleMouseEnter} 
            bgRef={bgRef} 
            textRef={textRef}
            label={label}
            colorScheme={scheme}
            linkTo={linkTo}
        />
    );
}
