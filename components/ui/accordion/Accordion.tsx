"use client";

import Plus from "../../../public/svgs/plus.svg";
import Minus from "../../../public/svgs/minus.svg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type AccordionProps = {
    title: string;
    content: React.ReactNode;
    index: number;
}

export default function Accordion({ title, content, index }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [divHeight, setDivHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        setDivHeight(isOpen ? ref.current.scrollHeight : 0)
    }, [isOpen]);

    return (
        <div className="relative w-full border-t-1 border-gray-700 py-4 overflow-hidden">
            <h2 className="flex whitespace-nowrap">
                <button
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${index}`}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full flex flex-row items-center justify-between cursor-pointer text-bold"
                >
                    {`${index + 1}. ${title}`}
                    <Image 
                        src={isOpen ? Minus : Plus}
                        width={26}
                        height={26}
                        alt=""
                        aria-hidden="true"
                    />
                </button>
            </h2>
            <div 
                ref={ref}
                id={`accordion-content-${index}`}
                className={`w-full overflow-hidden ${isOpen ? `opacity-100 mt-4` : "h-0 opacity-0"} transition-[height, opacity] duration-300`} 
                style={{ height: divHeight }}
            >
                {content}
            </div>
        </div>
    )
}