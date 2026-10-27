import { ProjectItem } from "./ProjectRenderer";

interface ProjectStatsProps {
	project: ProjectItem;
	className?: string;
}

export default function ProjectStats({ project, className = "" }: ProjectStatsProps) {
	const facts = project.facts?.filter(fact => fact.label && fact.value) ?? [];

	if (!facts.length) return null;

	// Columns filled row by row and spread to the edges; more than 4 facts get a third column on wide screens.
	const columns = facts.length > 4
		? "grid-cols-[repeat(2,auto)] lg:grid-cols-[repeat(3,auto)]"
		: "grid-cols-[repeat(2,auto)]";

	return (
		<div className={`grid ${columns} justify-between items-vertical-gap ${className}`}>
			{facts.map((fact, index) => (
				<div key={fact._key ?? index}>
					<p>{fact.label}</p>
					<p className="emphasize-text">{fact.value}</p>
				</div>
			))}
		</div>
	);
};
