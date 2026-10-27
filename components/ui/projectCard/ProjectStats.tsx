import { ProjectItem } from "./ProjectRenderer";

interface ProjectStatsProps {
	project: ProjectItem;
}

export default function ProjectStats({ project }: ProjectStatsProps) {
	const facts = project.facts?.filter(fact => fact.label && fact.value) ?? [];

	if (!facts.length) return null;

	// Two columns filled row by row: 1st and 3rd fact left, 2nd and 4th right.
	const columns = [
		facts.filter((_, index) => index % 2 === 0),
		facts.filter((_, index) => index % 2 === 1),
	];

	return (
		<div className="flex flex-row justify-between">
			{columns.map((column, columnIndex) => (
				<div key={columnIndex} className="flex flex-col items-vertical-gap">
					{column.map((fact, index) => (
						<div key={fact._key ?? index}>
							<p>{fact.label}</p>
							<p className="emphasize-text">{fact.value}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
};
