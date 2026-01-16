"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import pageImage from "../../../../public/site-images/om-oss-card2.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Card = {
    image: { asset: { _ref: string } | { url: string }; alt?: string };
    title: string;
    text: string;
};

type SustainabilityProps = {
    cards: Card[];
};

export default function Sustainability({ cards }: SustainabilityProps) {
	return (
		<div className="min-h-screen w-full bg-[var(--reliwe-offwhite)] body-x-padding pt-24">
			<h1 className="heading">
				Hållbarhet i fokus
			</h1>
			<div className="grid grid-cols-12 gap-4 md:gap-8">
				<div className="col-span-12 md:col-span-5 flex items-end">
					<div>
						<p>
							Vi utvecklar hållbara och levande stadsdelar där människor kan mötas, trivas och känna trygghet.
						</p>
						<br></br>
						<p>
							Genom att kombinera blandade upplåtelseformer med service, mötesplatser och energieffektiva byggnader i energiklass B eller bättre skapar vi miljöer som håller över tid. 
							Med hållbara materialval, smarta energilösningar och ett tydligt fokus på kvalitet, 
							låga driftskostnader och stabil ekonomi minimerar vi klimatpåverkan och bygger fastigheter som är hållbara – socialt, miljömässigt och ekonomiskt.
						</p>
					</div>
				</div>
				<div className="col-span-12 md:col-span-6 md:col-start-7 pb-24 md:pb-0">
					<Image 
						src={pageImage}
						alt=""
						width={1200}
						height={1200}
					/>
				</div>
			</div>
		</div>
	);
};