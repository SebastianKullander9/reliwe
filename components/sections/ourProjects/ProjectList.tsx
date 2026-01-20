"use client";

import ProjectRenderer from "@/components/ui/projectCard/ProjectRenderer";

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
	return (
		<div>
			{projects.map((project, index) => (
				<ProjectRenderer
				key={index}
				project={project}
				index={index}
				/>
			))}
		</div>
	);
}