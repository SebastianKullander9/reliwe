"use client";

import Image from "next/image";
import keyNumberBig from "../../../public/site-images/key-number-big.jpg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function KeyNumbersTwo() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 80%",
				end: "top 40%",
				scrub: true
			}
		});

		tl.from(".keyItem", {
			x: 80,
			opacity: 0,
			ease: "none",
			stagger: 0.2,
		});
	},
	{ scope: containerRef });

	return (
		<section className="min-h-screen bg-[var(--reliwe-offwhite)] body-x-padding overflow-hidden">
			<div>
				<h1 className="heading">
					Nyckeltal
				</h1>
				<p className="max-w-prose text-medium">
					Våra nyckeltal speglar en stabil och långsiktig utveckling. Med en stark projektportfölj och god finansiell ställning 
					fortsätter vi att skapa hållbara bostäder och värde för både kunder och samhälle.
				</p>
			</div>
			<div className="grid grid-cols-12 gap-9">
				<div className="col-span-9 relative h-full">
					<Image 
						src={keyNumberBig}
						width={1600}
						height={1600}
						alt=""
						className="rounded-lg"
					/>
					<div className="absolute inset-0 flex justify-end p-8">
						<p className="text-[var(--reliwe-offwhite)] max-w-[30ch]">
							Reliwe AB is a real estate company focused on creating long-term value through the ownership, development, 
							and management of property. With a clear commitment to quality and sustainability, the company works across 
							...
						</p>
					</div>
				</div>
				<div className="col-span-3 relative h-full flex flex-col gap-8">
					<Image 
						src={keyNumberBig}
						width={800}
						height={800}
						alt=""
						className="rounded-lg"
					/>
					<div ref={containerRef} className="w-full h-full flex flex-col gap-4">
						<div className="keyItem">
							<p className="text-[var(--reliwe-green)] text-default">Bostäder under produktion</p>
							<p className="text-large">3 300</p>
						</div>
						<div className="keyItem">
							<p className="text-[var(--reliwe-green)] text-default">Genomförda bostäder</p>
							<p className="text-large">775</p>
						</div>
						<div className="keyItem">
							<p className="text-[var(--reliwe-green)] text-default">Resultat 2025</p>
							<p className="text-large">130 mkr</p>
						</div>
						<div className="keyItem">
							<p className="text-[var(--reliwe-green)] text-default">Soliditet 2025</p>
							<p className="text-large">76%</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

