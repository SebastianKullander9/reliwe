"use client";

import { useEffect } from "react";
import { scroller } from "react-scroll";
import ProjectRenderer from "@/components/ui/projectCard/ProjectRenderer";
import { useProjectFilter } from "@/components/context/ProjectFilterContext";

type Project = {
	title: string;
	text: any[];
	year: string;
	movingInYear: string;
	apartmentAmount: string;
	roomAmount: string;
	imgUrls: string[];
	status: "ongoing" | "done" | "planned";
	slug: string;
	hasSubpage?: boolean;
};

export default function ProjectsList({ projects }: { projects: Project[] }) {
	const { activeFilter, scrollToSlug, setScrollToSlug } = useProjectFilter();

	const filteredProjects = activeFilter === "all"
		? projects
		: projects.filter((p) => p.status === activeFilter);

	useEffect(() => {
		if (!scrollToSlug) return;

		const timeout = setTimeout(() => {
			scroller.scrollTo(scrollToSlug, {
				smooth: true,
				duration: 600,
				offset: 0,
			});
			setScrollToSlug(null);
		}, 300);

		return () => clearTimeout(timeout);
	}, [scrollToSlug, setScrollToSlug]);

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