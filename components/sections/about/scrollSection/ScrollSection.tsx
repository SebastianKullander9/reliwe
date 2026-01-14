"use client";

import telestaden from "../../../../public/about/Telestaden.png";
import { sections } from "./content";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollSection() {
	const pinnedSection = useRef<HTMLDivElement>(null);
	const pinnedHeader = useRef<HTMLDivElement>(null);
	const endPinnedSection = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!endPinnedSection.current) return;

		ScrollTrigger.create({
			trigger: pinnedSection.current,
			start: "top top",
			endTrigger: endPinnedSection.current,
			end: "bottom bottom",
			pin: true,
			pinSpacing: false,
		});

		ScrollTrigger.create({
			trigger: pinnedHeader.current,
			start: "top top",
			endTrigger: endPinnedSection.current,
			end: "bottom bottom",
			pin: true,
			pinSpacing: false,
			onEnter: () => {
				if (pinnedHeader.current) {
					pinnedHeader.current.style.zIndex = "30";
				}
			},
		});
	});

	return (
		<section className="relative">
			<div
				className="absolute w-full h-screen bg-cover bg-center"
				style={{ backgroundImage: `url(${telestaden.src})` }}
				ref={pinnedSection}
			>
				<div 
					className="absolute inset-0" 
					style={{
						background: 'radial-gradient(circle, rgba(0,0,0,0.5) 0%, transparent 100%)'
					}}
				/>
			</div>
			
			<div className="h-screen">
				<div 
					className="absolute top-0 left-0 h-[188px] md:h-[240px] w-full bg-[var(--reliwe-offwhite)] z-20"
					ref={pinnedHeader}
				>
					<h2 
						className="heading absolute left-1/2 -translate-x-1/2 bottom-0"
						style={{ 
							backgroundImage: `url(${telestaden.src})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							WebkitTextFillColor: "transparent",
							color: "transparent"
						}}
					>
						Om oss
					</h2>
				</div>
			</div>
			

			{sections.map((section, index) => (
				<div 
					className={`relative w-full ${index + 1 === sections.length ? "h-[calc(100vh-188px)] md:h-[calc(100vh-240px)]" : ""} h-screen z-10 text-[var(--reliwe-offwhite)] flex items-center justify-center body-x-padding`}
					ref={index + 1 === sections.length ? endPinnedSection : null}
					key={section.title + index}
				>
					<div className="text-center">
						<h1 className="heading-no-break">
							{section.title}
						</h1>
						<p className="max-w-prose">
							{section.text}
						</p>
					</div>
				</div>
			))}
		</section>
	);
}
/*
			<div className="relative w-full h-screen z-10">
				<h1 className="text-7xl text-white">SECTION ONE</h1>
			</div>
			<div className="relative w-full h-screen z-10">
				<h1 className="text-7xl text-white">SECTION TWO</h1>
			</div>
			<div className="relative w-full h-screen z-10" ref={endPinnedSection}>
				<h1 className="text-7xl text-white">SECTION THREE</h1>
			</div>
*/