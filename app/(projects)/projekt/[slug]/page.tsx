"use server";

import { client } from "@/sanity/lib/client";
import { ProjectWithSubpage } from "@/app/types/types";
import SubPage from "@/components/sections/projectSubPage/SubPage";

interface ProjectSubPageProps {
	params: Promise<{ slug: string }>;
}

export default async function ProjectSubPage({ params }: ProjectSubPageProps) {
	const { slug } = await params;

	const project: ProjectWithSubpage = await client.fetch(`
		*[_type=="estateProject" && slug.current==$slug][0]{
			title,
			text,
			year,
			apartmentAmount,
			movingInYear,
			roomAmount,
			images,
			status,
			hasSubpage,
			subpage
		}
	`, { slug }, { next: { revalidate: 0 }});

	return (
		<>
			<SubPage project={project} />
		</>
	);
};