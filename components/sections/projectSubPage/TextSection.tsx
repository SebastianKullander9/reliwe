import Image from "next/image";
import { Project } from "@/app/types/types";

interface TextSectionProps {
	project: Project;
	imgUrls: string[];
}

export default function TextSection({ project, imgUrls }: TextSectionProps ) {

	return (
		<div className="body-x-padding flex flex-row gap-12 my-24">
			<div className="w-1/2">
				<Image 
					src={imgUrls[1]}
					alt=""
					width={800}
					height={900}
				/>
			</div>
			<div className="flex flex-col w-1/2 gap-8 justify-between">
				<h2 className="heading-no-break">
					Välkommen till Barkarbystaden
				</h2>
				<div className="flex flex-col gap-8">
					<p>
						{project.subpage?.textBlocks?.[1]}
					</p>
					<p>
						{project.subpage?.textBlocks?.[2]}
					</p>
				</div>
			</div>
		</div>
	);
};