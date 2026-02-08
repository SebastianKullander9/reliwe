"use client";

import { useState, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import "./embla.css";
import moveLeft from "../../../public/svgs/arrow-left.svg";
import moveRight from "../../../public/svgs/arrow-right.svg";
import { TfiArrowLeft } from "react-icons/tfi";
import { TfiArrowRight } from "react-icons/tfi";
import { colorScheme } from "./colorScheme";

type ImagesDisplayProps = {
    imgUrls: string[];
    projectName: string;
    clampedIndex: number;
}

export default function ImagesDisplay({ imgUrls, projectName, clampedIndex }: ImagesDisplayProps) {
    const OPTIONS: EmblaOptionsType = { 
        loop: true, 
        align: "start",
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isLgUp, setIsLgUp] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsLgUp(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const disableCarousel = imgUrls.length === 2 && isLgUp;

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCanScrollPrev(emblaApi.canScrollPrev());
            setCanScrollNext(emblaApi.canScrollNext());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    return (
        <figure className="w-full flex flex-col" aria-label="Project image gallery -mx-0 md:-mx-4">
            <div 
                className="flex flex-row order-2 md:order-1 justify-center md:justify-start mt-4 md:mt-0 gap-8 md:gap-2"
                style={{ display: disableCarousel ? "none" : "flex" }}
            >
                <button 
                    aria-label="Scroll images left"
                    onClick={scrollPrev}
                    disabled={!canScrollPrev && !OPTIONS.loop}
                    className="p-2 rounded-full transition-colors duration-200 cursor-pointer arrow-hover"
                    style={{ "--hover-color": colorScheme[clampedIndex].hoverColor } as React.CSSProperties}
                >
					<TfiArrowLeft size={30}/>
                    
                </button>
                <button 
                    aria-label="Scroll images right"
                    onClick={scrollNext}
                    disabled={!canScrollNext && !OPTIONS.loop}
                    className="p-2 rounded-full transition-colors duration-200 cursor-pointer arrow-hover"
                    style={{ "--hover-color": colorScheme[clampedIndex].hoverColor } as React.CSSProperties}
                >
					<TfiArrowRight size={30}/>
                </button>
            </div>
            <div className="flex embla order-1 md:order-2">
                <div 
                    ref={emblaRef} 
                    className={`embla__viewport ${disableCarousel ? "pointer-events-none" : ""}`}
                    role="region" 
                    aria-roledescription="Image carousel" 
                    aria-label="Project gallery"
                >
                    <div className="embla__container">
                        {imgUrls.map((url, index) => (
                            <div 
                                className={`embla__slide ${disableCarousel ? "flex-[0_0_50%]" : "flex-[0_0_100%]"} md:flex-[0_0_50%] md:p-4`} 
                                key={url + index}
                            >
                                <div className="relative w-full aspect-[4/3] cursor-grab">
                                    <Image
                                        fill
                                        className="object-cover"
                                        src={url}
                                        alt={`Exterior view of project ${projectName}, Image ${index + 1}`}
                                        priority={index === 0}
										unoptimized
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </figure>
    );
}