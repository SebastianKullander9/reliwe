"use client";

import Image from "next/image";
import imageBig from "../../../public/site-images/abouttwobig.jpg";
import imageSmall from "../../../public/site-images/startpagesquare2.jpg"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CallToAbout() {
	const pinStart = useRef<HTMLDivElement>(null);
	const pinEnd = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (!pinStart.current && !pinEnd.current) return;

		const mm = gsap.matchMedia();

		mm.add("(min-width: 1350px)", () => {
			ScrollTrigger.create({
				trigger: pinStart.current,
				start: "bottom bottom",
				endTrigger: pinEnd.current,
				end: "bottom bottom",
				pin: true,
				pinSpacing: false,
				anticipatePin: 0,
			});
		});

		return () => mm.revert();
	});

	return (
		<div className="min-h-screen bg-[var(--reliwe-offwhite)] body-x-padding pb-48 flex flex-col gap-4 md:gap-8">
			<div>
				<h1 className="heading">
					Rum för livet
				</h1>
				<p className="max-w-prose !text-xl md:!text-2xl xl:!text-2xl">
					Välkommen till en bostadsutvecklare som skapar hållbara hem och levande stadsdelar där människor kan trivas och växa – idag och hela livet ut.
				</p>
			</div>
			<div className="grid grid-cols-12 gap-4 md:gap-8">
				<div className="col-span-12 md:col-span-3 relative">
					<Image 
						src={imageSmall}
						alt=""
						width={600}
						height={600}
						className="aspect-square rounded-lg"
					/>
				</div>
				<div className="col-span-12 md:col-span-6 relative pb-8" ref={pinEnd}>
					<Image 
						src={imageBig}
						alt=""
						width={1200}
						height={800}
						className="w-full h-auto rounded-lg"
						onLoad={() => {
							ScrollTrigger.refresh();
						}}
					/>
				</div>
				<div className="col-span-12 md:col-span-3 xl:h-[70vh] flex flex-col justify-end gap-8" ref={pinStart}>
					<p className="!text-sm xl:!text-lg">
						Vi skapar bostäder där människor trivs, oavsett upplåtelseform. Våra projekt präglas av omtanke, hög kvalitet och långsiktigt värde. I många hus planerar vi lokaler i bottenplan som bidrar till god närservice och levande stadsdelar – allt för en enklare och tryggare vardag för våra boende.
					</p>
					<div className="flex justify-center md:justify-start pb-8">
						<Link href="/om-oss">
							<BaseButtonBackground
								label="Läs mer"
								bgColor="#1f5d37"
								hoverTextColor="#faf7f5"
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};