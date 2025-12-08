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
    const [activeFilter, setActiveFilter] = useState<"all" | "planned" | "ongoing" | "done">("all");

	const statuses: ("all" | "planned" | "ongoing" | "done")[] = [
		"all",
		"planned",
		"ongoing",
		"done",
	];

	const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((p) => p.status === activeFilter);

    return (
        <>
            <div className="h-full py-8 pb-8 bg-[var(--reliwe-offwhite)]">
                <div className="max-w-6xl mx-auto flex justify-center gap-3 sm:gap-4">

                    {statuses.map((status) => {
                        const isActive = activeFilter === status;

                        return (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
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
