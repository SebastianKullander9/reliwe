"use client";

import ProjectRenderer from "@/components/ui/projectCard/ProjectRenderer";
import { useProjectFilter } from "@/components/context/ProjectFilterContext";

type Project = {
	title: string;
	text: string;
	year: string;
	movingInYear: string;
	apartmentAmount: string;
	roomAmount: string;
	imgUrls: string[];
	status: "ongoing" | "done" | "planned";
};

export default function ProjectsList({ projects }: { projects: Project[] }) {
	const { activeFilter, setActiveFilter } = useProjectFilter();

	const filteredProjects = activeFilter === "all"
		? projects
		: projects.filter((p) => p.status === activeFilter);

	return (
		<div id="projectTop">
			{filteredProjects.map((project, index) => (
				<ProjectRenderer
					key={index}
					project={project}
					index={index}
				/>
			))}
		</div>
	);
}