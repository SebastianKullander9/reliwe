import Image from "next/image";
import { Project } from "@/app/types/types";

interface TextSectionProps {
	project: Project;
	imgUrls: string[];
}

export default function TextSection({ project, imgUrls }: TextSectionProps ) {

	return (
		<div className="body-x-padding my-24 flex flex-col gap-8">
			<h2 className="font-extrabold text-4xl">
				Galleri
			</h2>
			<div className="flex flex-row gap-8">
				<div className="w-1/2">
					<Image 
						src={imgUrls[0]}
						alt=""
						width={800}
						height={900}
					/>
				</div>
				<div>
					<Image 
						src={imgUrls[1]}
						alt=""
						width={800}
						height={900}
					/>
				</div>
			</div>
		</div>
	);
};