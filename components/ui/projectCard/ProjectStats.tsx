import { ProjectItem } from "./ProjectRenderer";

interface ProjectStatsProps {
	project: ProjectItem;
}

export default function ProjectStats({ project }: ProjectStatsProps) {
	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col items-vertical-gap">
				<div>
					<p>Byggstart</p>
					<p  className="emphasize-text">{project.year}</p>
				</div>
				<div>
					<p>Antal lägenheter</p>
					<p className="emphasize-text">{project.apartmentAmount}</p>
				</div>
				
			</div>
			<div className="flex flex-col items-vertical-gap">
				<div>
					<p>Inflyttning</p>
					<p className="emphasize-text">{project.movingInYear}</p>
				</div>
				
				<div>
					<p>Antal rum</p>
					<p className="emphasize-text">{project.roomAmount}</p>
				</div>
			</div>
		</div>
	);
};