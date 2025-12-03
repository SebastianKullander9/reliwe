"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import SectionHandler from "./sectionHandler";
import Image from "next/image";
import furniture from "../../../../public/about/furniture-2.svg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollSection() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
	const sectionHeaderOffset = 95;
	
	useGSAP(() => {
		ScrollTrigger.create({
			trigger: sectionRefs.current[0],
			start: `top-=${sectionHeaderOffset}px top`,
			endTrigger: sectionRefs.current[sectionRefs.current.length - 1],
			end: "bottom bottom",
			pin: scrollRef.current,
			pinSpacing: false,
		});

		sectionRefs.current.forEach((section, index) => {
			ScrollTrigger.create({
				trigger: section,
				start: `top-=${(sectionHeaderOffset * (index + 1))}px top`,
				endTrigger: sectionRefs.current[sectionRefs.current.length - 1],
				end: "bottom bottom",
				pin: true,
				pinSpacing: false,
			});
		});
	}, { dependencies: [], scope: scrollRef });

	return (
		<section className="flex flex-row bg-[var(--reliwe-offwhite)]">
			<div className="w-1/2 relative overflow-hidden">
				<SectionHandler refs={sectionRefs} sectionHeaderOffset={sectionHeaderOffset} />
			</div>
			<div className={`w-1/2 max-h-[calc(100vh-${sectionHeaderOffset * 2}px)] flex flex-col items-center justify-center`} ref={scrollRef}>
				<Image src={furniture} width={700} height={700} alt="" />
			</div>
		</section>
	);
}