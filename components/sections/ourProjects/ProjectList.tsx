"use client";

import ProjectRenderer from "@/components/ui/projectCard/ProjectRenderer";
import { useSearchParams, useRouter } from "next/navigation";

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
	const searchParams = useSearchParams();
	const router = useRouter();
	const statusQuery = searchParams.get("status") as Project["status"] | null;

	const statuses: ("all" | "planned" | "ongoing" | "done")[] = [
		"all",
		"planned",
		"ongoing",
		"done",
	];

	const filteredProjects = statusQuery
		? projects.filter((p) => p.status === statusQuery)
		: projects;

	const handleFilterClick = (status: typeof statuses[number]) => {
		const url = status === "all" ? "/projekt" : `/projekt?status=${status}`;
		router.push(url);
	};

	return (
		<>
			<div className="h-full py-8 pb-8 bg-[var(--reliwe-offwhite)]">
				<div className="max-w-6xl mx-auto flex justify-center gap-3 sm:gap-4">
					{statuses.map((status) => {
						const isActive = statusQuery === status || (!statusQuery && status === "all");

						return (
							<button
								key={status}
								onClick={() => handleFilterClick(status)}
								className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
									isActive
										? "bg-[var(--reliwe-green)] text-white"
										: "bg-[var(--reliwe-green-accent)] hover:bg-[#bcc2b4]"
								}`}
							>
								{status === "all"
									? "Alla"
									: status === "ongoing"
									? "Pågående"
									: status === "planned"
									? "Planerade"
									: "Genomförda"}
							</button>
						);
					})}
				</div>
			</div>

			<div>
				{filteredProjects.map((project, index) => (
					<ProjectRenderer
						key={index}
						project={project}
						index={index}
					/>
				))}
			</div>
		</>

	);
}