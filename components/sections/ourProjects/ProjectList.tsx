"use client";

import { useState } from "react";
import ProjectCard from "@/components/ui/projectCard/ProjectCard";

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
    const [filter, setFilter] = useState<"all" | "ongoing" | "done" | "planned">("all");

	const sortOrder: Record<Project["status"], number> = {
		planned: 0,
		ongoing: 1,
		done: 2,
	}

    const filteredProjects =
    filter === "all"
        ? projects
              .slice()
              .sort((a, b) => sortOrder[a.status] - sortOrder[b.status])
        : projects.filter((p) => p.status === filter)
                  .sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

    return (
        <>
            <div className="h-full py-8 pb-8 bg-[var(--reliwe-offwhite)]">
                <div className="max-w-6xl mx-auto flex justify-center gap-3 sm:gap-4">
                    {["all", "planned", "ongoing", "done"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as "all" | "ongoing" | "done" | "planned")}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                                filter === status
                                    ? "bg-[var(--reliwe-green)] text-white"
                                    : "bg-[var(--reliwe-green-accent)] hover:bg-[#c0d2c8]"
                            }`}
                        >
                            {status === "all"
                                ? "Alla"
                                : status === "ongoing"
                                ? "Pågående"
                                : status === "planned"
                                ? "Planerade"
                                : "Genomförda"
                            }
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {filteredProjects.map((project: Project, index: number) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        text={project.text}
                        year={project.year}
                        movingInYear={project.movingInYear}
                        apartmentAmount={project.apartmentAmount}
                        roomAmount={project.roomAmount}
                        imgUrls={project.imgUrls}
                        index={index}
                    />
                ))}
            </div>
        </>
        



    )
}
