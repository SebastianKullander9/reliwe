import { RefObject } from "react";
import { sections } from "./content";

interface SectionHandlerProps {
	refs: RefObject<(HTMLDivElement | null)[]>;
	sectionHeaderOffset: number;

}

export default function SectionHandler({ refs, sectionHeaderOffset }: SectionHandlerProps) {

	const setRef = (index: number) => (element: HTMLDivElement | null) => {
		refs.current[index] = element;
	}

	return (
		<>
			{sections.map((section, index) => (
				<article
					className="w-full h-screen body-x-padding bg-[var(--reliwe-offwhite)]"
					key={section.title + index}
					ref={setRef(index)}
				>
					<div className="border-t-1">
						<h3 className="text-center uppercase text-xl tracking-wider py-8">
							{section.title}
						</h3>
					</div>
					<div 
						className="h-full flex justify-center items-center"
						style={{ 
							marginTop: `-${sectionHeaderOffset * (index + 1)}px` 
						}}
					>
						<p className="max-w-[45ch]">
							{section.text}
						</p>
					</div>
				</article>
			))}
		</>
	);
};