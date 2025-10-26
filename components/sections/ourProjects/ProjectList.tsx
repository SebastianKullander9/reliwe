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
    status: "ongoing" | "done" | "upcoming";
};

export default function ProjectsList({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState<"all" | "ongoing" | "done" | "planned">("all");

    const filteredProjects = 
        filter === "all"
            ? projects
            : projects.filter((p) => p.status === filter);

    return (
        <>
            <div className="h-full py-8 pb-8 bg-[var(--reliwe-offwhite)]">
                <div className="max-w-6xl mx-auto flex justify-center gap-3 sm:gap-4">
                    {["all", "ongoing", "planned", "done"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status as "all" | "ongoing" | "done" | "planned")}
                            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                                filter === status
                                    ? "bg-[var(--reliwe-green)] text-white"
                                    : "bg-[var(--reliwe-green-accent)] hover:bg-gray-300"
                            }`}
                        >
                            {status === "all"
                                ? "Alla"
                                : status === "ongoing"
                                ? "Pågående"
                                : status === "planned"
                                ? "Kommande"
                                : "Färdiga"
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
