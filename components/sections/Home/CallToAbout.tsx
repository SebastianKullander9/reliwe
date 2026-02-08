"use client";

import Image from "next/image";
import imageBig from "../../../public/site-images/abouttwobig.jpg";
import imageSmall from "../../../public/site-images/startpagesquare2.jpg"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Link from "next/link";
import ButtonBackground from "@/components/ui/buttons/newButtons/ButtonBackground";
import ButtonAnimationWrapper from "@/components/ui/buttons/newButtons/ButtonAnimationWrapper";

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
		<div className="min-h-screen bg-[var(--reliwe-offwhite)] body-x-padding pb-48 flex flex-col gap-4 md:gap-8 pt-24 md:pt-0">
			<div>
				<h1 className="heading text-center md:text-start">
					Om oss
				</h1>
				<p className="max-w-prose">
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
						className="aspect-square"
					/>
				</div>
				<div className="col-span-12 md:col-span-6 relative pb-8" ref={pinEnd}>
					<Image 
						src={imageBig}
						alt=""
						width={1200}
						height={800}
						className="w-full h-auto"
						onLoad={() => {
							ScrollTrigger.refresh();
						}}
					/>
				</div>
				<div className="col-span-12 md:col-span-3 xl:h-[70vh] flex flex-col justify-end gap-8" ref={pinStart}>
					<p className="text-default">
						Vi skapar bostäder där människor trivs, oavsett upplåtelseform. Våra projekt präglas av omtanke, hög kvalitet och långsiktigt värde. I många hus planerar vi lokaler i bottenplan som bidrar till god närservice och levande stadsdelar – allt för en enklare och tryggare vardag för våra boende.
					</p>
					<div className="flex justify-center md:justify-start pb-8">
						<Link href="/om-oss">
							<ButtonAnimationWrapper>
								<ButtonBackground label="Läs mer" />
							</ButtonAnimationWrapper>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};