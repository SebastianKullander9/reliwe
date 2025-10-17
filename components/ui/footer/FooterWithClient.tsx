"use client";

import { useState, useEffect } from "react";
import Footer from "./Footer";

export default function FooterWithClient() {
	const [aboveHero, setAboveHero] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			const triggerPoint = window.innerHeight * 1.02;
			setAboveHero(scrollY > triggerPoint);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<Footer aboveHero={aboveHero}/>
		</>
	)
}