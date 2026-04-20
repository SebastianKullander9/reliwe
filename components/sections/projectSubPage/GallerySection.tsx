"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import { ProjectWithSubpage } from "@/app/types/types";
import Masonry from "react-masonry-css";
import { useLenis } from "lenis/react";

interface GallerySectionProps {
    project: ProjectWithSubpage;
}

const breakpointColumns = {
    default: 2,
    640: 1,
};

export default function GallerySection({ project }: GallerySectionProps) {
    const images = project.subpage?.gallery;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const lenis = useLenis();

	useEffect(() => {
		if (lightboxIndex !== null) {
			lenis?.stop();
		} else {
			lenis?.start();
		}
		return () => { lenis?.start(); };
	}, [lightboxIndex, lenis]);

    if (!images || images.length === 0) return null;

    const current = lightboxIndex !== null ? images[lightboxIndex] : null;

    return (
        <>
            <section className="section-y-padding body-x-padding">
                <p className="font-light tracking-wider text-[var(--reliwe-green)] mb-2">
                    GALLERI
                </p>
                <h2 className="font-extrabold text-4xl mb-8">{project.subpage?.title ?? project.title}</h2>

                <Masonry
                    breakpointCols={breakpointColumns}
                    className="flex gap-4"
                    columnClassName="flex flex-col gap-4"
                >
                    {images.map((image, index) => {
                        const url = urlFor(image.asset)
                            .width(1200)
                            .quality(85)
                            .auto("format")
                            .url();

                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg cursor-pointer group relative"
                                onClick={() => setLightboxIndex(index)}
                            >
                                <Image
                                    src={url}
                                    alt={image.alt ?? `Galleribild ${index + 1}`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-[var(--reliwe-green)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
                            </div>
                        );
                    })}
                </Masonry>
            </section>

            {lightboxIndex !== null && current && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                    onClick={() => setLightboxIndex(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        onClick={() => setLightboxIndex(null)}
                    >
                        ✕
                    </button>

                    <div
                        className="relative max-w-5xl max-h-[90vh] w-full mx-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={urlFor(current.asset).width(1600).quality(90).auto("format").url()}
                            alt={current.alt ?? `Galleribild ${lightboxIndex + 1}`}
                            width={1600}
                            height={1000}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                        />
                        {current.alt && (
                            <p className="text-white/70 text-sm text-center mt-2">{current.alt}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}