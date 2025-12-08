"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollHandlerProps {
	scrollSections: React.ReactNode[];
	stickySection: React.ReactNode;
}

export function ScrollWrapper({ scrollSections, stickySection }: ScrollHandlerProps) {
	const scrollSectionsRef = useRef<(HTMLDivElement | null)[]>([]);
	const stickySectionRef = useRef<HTMLDivElement>(null);
	const headerTopMargin = 94;

	const sectionsWithRefs = scrollSections.map((child, index) => 
		<div
			key={index}
			ref={(element) => { scrollSectionsRef.current[index] = element }}
			className={`w-full h-full`}
		>
			{child}
		</div>
	);

	useGSAP(() => {
		const startTrigger = stickySectionRef.current;
		const endTrigger = scrollSectionsRef.current[scrollSectionsRef.current.length - 1];

		//Sticky
		ScrollTrigger.create({
			trigger: startTrigger,
			start: `top-=${headerTopMargin} top`,
			endTrigger: endTrigger,
			end: "bottom bottom",
			pin: true,
			scrub: true,
			pinSpacing: false,
		});

		//scroll
		scrollSectionsRef.current.forEach((section, index) => {
			ScrollTrigger.create({
				trigger: section,
				start: `top-=${(headerTopMargin + (headerTopMargin * index))}px top`,
				endTrigger: endTrigger,
				end: "bottom bottom",
				pin: true,
				scrub: true,
				pinSpacing: false,
			});
		});
	});

	return (
		<section className={`h-calc(${(100 * scrollSections.length)}vh - ${headerTopMargin * scrollSections.length}px) flex flex-row md:flex-row body-x-padding bg-[var(--reliwe-offwhite)]`}>
			<article 
				ref={stickySectionRef}
				className="w-full hidden md:flex md:w-1/2 md:h-[calc(100vh-94px)] bg-[var(--reliwe-offwhite)] text-white items-center justify-center"
			>
				<div className="w-full h-full relative pr-16 pb-23 ">
					<div className="w-full h-full relative overflow-hidden">
						{stickySection}
					</div>
				</div>
			</article>
			<article className="w-full md:w-1/2 h-full">
				{sectionsWithRefs}
			</article>

		</section>
	)
}
