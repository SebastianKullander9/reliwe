import { Project } from "@/app/types/types";
import InfoCard from "@/components/ui/infoCard/InfoCard";

interface InfoSectionProps {
	project: Project;
}

export default function InfoSection({ project }: InfoSectionProps) {
	return (
		<div className="w-full flex ">
			<div className="body-x-padding py-24 flex flex-row justify-between w-full">
				<div className="flex flex-col gap-12">
					<h2 className="heading-poppins font-extrabold text-4xl">
						{project.subpage?.title}
					</h2>
					<div className="max-w-prose flex flex-col gap-8">
						<p>
							{project.subpage?.textBlocks?.[0]}
						</p>
						<p>
							{project.subpage?.textBlocks?.[1]}
						</p>
						<p>
							{project.subpage?.textBlocks?.[2]}
						</p>
					</div>
				</div>
				<InfoCard project={project} />
			</div>
		</div>
	);
};