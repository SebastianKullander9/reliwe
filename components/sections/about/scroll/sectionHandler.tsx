import { content } from "../aboutContent";
import { ScrollWrapper } from "./scrollWrapper";
import furnitureIllustration from "../../../../public/about/furniture-2.svg";
import Image from "next/image";

export default function SectionHandler() {
	return (
		<ScrollWrapper 
			scrollSections={
				content.map((section, index) => (
					<div
						key={section.title + index}
						className={`
							bg-[var(--reliwe-offwhite)] text-black relative
							${index === content.length - 1 && "hidden md:block"}
						`}
						style={{ height: `calc(100vh - ${(94 * index) + 94}px)` }}
					>
						<div className="w-full h-[100px] flex items-center absolute border-t justify-center">
							<h3 className="text-center uppercase text-xl tracking-wider">{section.title}</h3>
						</div>
						<div className="h-full w-full flex items-center justify-center">
							<p className="max-w-[45ch]">{section.text}</p>
						</div>
					</div>
				))
			}
			stickySection={
				<Image src={furnitureIllustration} width={550} height={550} alt="" />
			}
		/>
	);
};