"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Card = {
    image: { asset: { _ref: string } | { url: string }; alt?: string };
    title: string;
    text: string;
};

type SustainabilityProps = {
    cards: Card[];
};

export default function SustainabilityTwo({ cards }: SustainabilityProps) {
	const endPin = useRef<HTMLDivElement>(null);
	const pinOffsetRef = useRef(0);
	const headerRef = useRef<HTMLDivElement>(null);
	const [pinOffset, setPinOffset] = useState(0);

	useGSAP(() => {
		if (!headerRef.current) return;

		const offset = headerRef.current.offsetHeight;

		gsap.utils.toArray<HTMLElement>(".panel").forEach((panel, index) => {
			if (index > 0) {
				gsap.set(panel, {
					height: `calc(100vh - ${offset - (index * 1)}px)`
				});
			} else {
				gsap.set(panel, {
					height: "100vh"
				});
			}

			ScrollTrigger.create({
				trigger: panel,
				start: index === 0 ? "top top" : `top top+=${offset - (index * 1)}px`,
				endTrigger: endPin.current,
				end: "bottom bottom",
				pin: true,
				pinSpacing: false,
				anticipatePin: 1,
				invalidateOnRefresh: true
			});
		});

		ScrollTrigger.refresh();
	});

	return (
		<>
			{cards.map((card, index) => {
					const imgUrl = "url" in card.image.asset ? card.image.asset.url : urlFor(card.image).url();

					return (
						<div 
							className={`w-full panel bg-[var(--reliwe-offwhite)] body-x-padding`}
							key={card.title + index}
							ref={index + 1 === cards.length ? endPin : null}
						>
							{index === 0 && (
								<h1 className="heading text-start md:text-center pt-[94px] border-b md:body-x-padding" ref={headerRef}>
									Hållbarhet i fokus
								</h1>
							)}

							<div className={`flex flex-col md:flex-row justify-center pt-4 md:pt-24 md:body-x-padding gap-4 md:gap-8 ${index > 0 ? "border-t" : ""}`}>
								<h3 className="md:hidden uppercase whitespace-nowrap text-xl tracking-wider text-start">{card.title}</h3>
								<div>
									<Image 
										src={imgUrl}
										alt=""
										width={750}
										height={450}
										className="rounded-lg"
									/>
								</div>
								<div className="flex flex-col justify-between">
									<h3 className="hidden md:block uppercase text-2xl tracking-wider text-center">{card.title}</h3>
									<p className="max-w-prose">{card.text}</p>
								</div>
							</div>
						</div>
					);
			})}
		</>
	);
};