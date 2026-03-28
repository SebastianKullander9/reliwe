import { Project } from "@/app/types/types";
import InfoRow from "./InfoRow";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonBackground from "../buttons/newButtons/ButtonBackground";
import { 
	CircleArrowDown
} from "lucide-react";

interface InfoCardProps {
	project: Project;	
}

export default function InfoCard({ project }: InfoCardProps) {

	return (
		<div className="inline-flex flex-row h-full">
			<div>
				<div className="bg-[var(--reliwe-green)] p-4">
					<h3 className="text-[var(--reliwe-offwhite)] text-center text-xl">
						Fakta om projektet
					</h3>
				</div>
				<div className="bg-[var(--reliwe-green-accent)] flex flex-col gap-4 p-4 max-w-110">
					<InfoRow 
						title="Ägandeform"
						text="Hyresrätt"
					/>
					<InfoRow 
						title="Byggstart"
						text={project.year}
					/>
					<InfoRow 
						title="Inflyttning"
						text={project.movingInYear}
					/>
					<InfoRow 
						title="Antal lägenheter"
						text={project.apartmentAmount}
					/>
					<InfoRow 
						title="Antal rum"
						text={project.roomAmount}
					/>
					<div className="w-full">
						<ButtonAnimationWrapper hasMaxWidth={false}>
							<ButtonBackground 
								label="Gå till intresseanmälan" 
								Icon={CircleArrowDown}
							/>
						</ButtonAnimationWrapper>
					</div>
					<p>
						Vill du veta mer eller komma tidigt i kön? Anmäl ditt intresse nedan.
					</p>
				</div>
			</div>
		</div>
	);
};