"use client";

import Image from "next/image";
import Barkaby from "@/public/site-images/barkaby-hero.webp";
import { sections } from "./content";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutScroll() {
	const containerRef = useRef<HTMLDivElement>(null);
	const bottomSectionRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLDivElement>(null);
	
	useGSAP(() => {
		ScrollTrigger.config({
			autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
			ignoreMobileResize: true,
		});

		ScrollTrigger.create({
			trigger: containerRef.current,
			start: "top top",
			endTrigger: bottomSectionRef.current,
			end: "bottom bottom-=50vh",
			pin: true,
			pinSpacing: false,
			invalidateOnRefresh: true,
		});

		ScrollTrigger.create({
			trigger: containerRef.current,
			start: "top top",
			endTrigger: bottomSectionRef.current,
			end: "bottom bottom-=50vh",
			pin: headingRef.current,
			pinSpacing: false,
			invalidateOnRefresh: true,
		});

		const headingElement = headingRef.current?.querySelector(".animateHeading");
		
		if (headingElement) {
			gsap.to(headingElement, {
				scale: 0.7,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top bottom",
					end: "top top",
					scrub: true,
				},
			});
		}
		
		ScrollTrigger.refresh();
	}, { dependencies: [], scope: containerRef});

	return (
		<div className="relative pb-24">
			<div className="h-40 md:h-65 bg-(--reliwe-offwhite) w-full flex justify-center absolute z-[100] shadow-xs" ref={headingRef}>
				<h2 className="heading base bottom-0 absolute animateHeading">
					Om oss
				</h2>
			</div>

			<div className="relative" ref={containerRef} style={{ zIndex: 10 }}>
				<div className="h-screen relative">
					<div className="bg-black/33 absolute inset-0" style={{ zIndex: 11}} />
					<div className="absolute inset-0">
						<Image 
							src={Barkaby}
							alt=""
							fill
							quality={95}
							sizes="100vw"
							className="object-cover"
						/>
					</div>
				</div>
			</div>

			<div className="relative" style={{ zIndex: 50 }}>
				{sections.map((content, index) => (
					<div 
						ref={sections.length === index + 1 ? bottomSectionRef : undefined}
						className={`${
							index === 0 
								? "h-[75vh] relative" 
								: index === sections.length - 1 
									? "h-[calc(100vh-260px)] flex justify-center items-center relative"
									: "h-screen flex justify-center items-center relative"
						}`}
						key={index}
					>
						{index === 0 ? (
							<div className="absolute w-full body-x-padding md:max-w-prose text-center top-0 left-1/2 -translate-x-1/2 text-(--reliwe-offwhite)">
								<h1 className="heading base">
									{content.title}
								</h1>
								<p>
									{content.text}
								</p>
							</div>
						) : (
							<div className="w-full body-x-padding md:max-w-prose text-center p-12 text-(--reliwe-offwhite)">
								<h1 className="heading base">
									{content.title}
								</h1>
								<p>
									{content.text}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
		
	);
}