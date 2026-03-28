import { Project } from "@/app/types/types";
import InfoCard from "@/components/ui/infoCard/InfoCard";

interface InfoSectionProps {
	project: Project;
}

export default function InfoSection({ project }: InfoSectionProps) {
	return (
		<div className="w-full flex ">
			<div className="body-x-padding py-24 flex flex-row justify-between w-full">
				<div className="flex flex-col justify-between">
					<h2 className="heading-no-break max-w-[24ch]">
						{project.subpage?.title}
					</h2>
					<p className="max-w-prose">
						{project.subpage?.textBlocks?.[0]}
					</p>
				</div>
				<InfoCard project={project} />
			</div>
		</div>
	);
};