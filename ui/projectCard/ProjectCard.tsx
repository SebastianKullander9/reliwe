"use client";

import { useState, useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image";
import "./embla.css";

interface ProjectCardProps {
    orientation: "left" | "right";
    title: string;
    text: string;
    year: string;
    apartmentAmount: string;
    movingInYear: string;
    roomAmount: string;
    imgUrl: string[];
}

const OPTIONS: EmblaOptionsType = { loop: true }


export default function ProjectCard({
    orientation,
    title,
    text,
    year,
    apartmentAmount,
    movingInYear,
    roomAmount,
    imgUrl,
}: ProjectCardProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    const onSelect = () => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    };

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi]);

    return (
        <div
            className={`flex flex-col ${
                orientation === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
        >
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
                <div className="relative bg-gray-200 aspect-[4/3] lg:h-full w-full">
                    <div className="embla">
                        <div className="embla__viewport" ref={emblaRef}>
                            <div className="embla__container">
                                {imgUrl.map((url, index) => (
                                    <div className="embla__slide relative cursor-grab" key={index}>
                                        <div className="relative w-full h-full">
                                            <Image
                                                fill
                                                className="object-cover"
                                                src={url}
                                                alt={title}
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                priority={index === 0}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Pagination dots */}
                    <div className={`${imgUrl.length <= 1 ? "hidden" : ""} absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2`}>
                        {imgUrl.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`w-3 h-3 rounded-full transition cursor-pointer ${
                                    index === selectedIndex ? "bg-white" : "bg-white/50"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 bg-[var(--reliwe-green-accent)] flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 gap-12 justify-between">
                <div>
                    <h1 className="card-heading">{title}</h1>
                    <p className="max-w-prose text-lg text-green">
                        {text}
                    </p>
                </div>

                <div className="flex flex-row justify-between max-w-prose flex-wrap gap-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold card-text text-lg">Byggstart</h2>
                            <p className="text-lg text-green">{year}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold card-text text-lg">
                                Inflyttning
                            </h2>
                            <p className="text-lg text-green">
                                {movingInYear}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold card-text text-lg">
                                Antal lägenheter
                            </h2>
                            <p className="text-lg text-green">
                                {apartmentAmount}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold card-text text-lg">Antal rum</h2>
                            <p className="text-lg text-green">
                                {roomAmount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}