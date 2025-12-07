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
    const [activeFilters, setActiveFilters] = useState<("ongoing" | "done" | "planned")[]>([]);

	const statuses: ("planned" | "ongoing" | "done")[] = [
		"planned",
		"ongoing",
		"done",
	];

	const sortOrder: Record<Project["status"], number> = {
		planned: 0,
		ongoing: 1,
		done: 2,
	}

    const toggleFilter = (status: "planned" | "ongoing" | "done") => {
        setActiveFilters((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    const filteredProjects =
        activeFilters.length === 0
            ? [...projects].sort((a, b) => sortOrder[a.status] - sortOrder[b.status])
            : projects
                  .filter((p) => activeFilters.includes(p.status))
                  .sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

    return (
        <>
            <div className="h-full py-8 pb-8 bg-[var(--reliwe-offwhite)]">
                <div className="max-w-6xl mx-auto flex justify-center gap-3 sm:gap-4">

                    {statuses.map((status) => {
                        const isActive = activeFilters.includes(status);

                        return (
                            <button
                                key={status}
                                onClick={() => toggleFilter(status)}
                                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                                    isActive
                                        ? "bg-[var(--reliwe-green)] text-white"
                                        : "bg-[var(--reliwe-green-accent)] hover:bg-[#bcc2b4]"
                                }`}
                            >
                                {status === "ongoing"
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
