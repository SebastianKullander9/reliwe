"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProjectStatus = "all" | "planned" | "ongoing" | "done";

type ProjectFilterContextType = {
	activeFilter: ProjectStatus;
	setActiveFilter: (status: ProjectStatus) => void;
};

const ProjectFilterContext = createContext<ProjectFilterContextType | undefined>(undefined);

export function ProjectFilterProvider({ children }: { children: ReactNode }) {
	const [activeFilter, setActiveFilter] = useState<ProjectStatus>("all");

	return (
		<ProjectFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
			{children}
		</ProjectFilterContext.Provider>
	);
}

export function useProjectFilter() {
	const context = useContext(ProjectFilterContext);
	if (context === undefined) {
		throw new Error("useProjectFilter must be used within a ProjectFilterProvider");
	}
	return context;
}