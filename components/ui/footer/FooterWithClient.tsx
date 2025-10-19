"use client";

import { useState, useEffect } from "react";
import Footer from "./Footer";

export default function FooterWithClient() {
    const [aboveHero, setAboveHero] = useState(false);
    const [isFooterVisible, setIsFooterVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            
            const triggerPoint = window.innerHeight * 1.02;
            setAboveHero(scrollY > triggerPoint);
            
            const scrollPercentage = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            setIsFooterVisible(scrollPercentage > 50);
        };

        window.addEventListener("scroll", handleScroll);
        
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <Footer aboveHero={aboveHero} isFooterVisible={isFooterVisible} isClient={true} />;
}