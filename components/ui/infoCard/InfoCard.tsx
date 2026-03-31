import { Project } from "@/app/types/types";
import InfoRow from "./InfoRow";
import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonWhiteBackground from "../buttons/newButtons/ButtonWhiteBackground";
import { 
	CircleArrowDown
} from "lucide-react";

interface InfoCardProps {
	project: Project;	
}

export default function InfoCard({ project }: InfoCardProps) {

	return (
		<div className="bg-[var(--reliwe-green)] p-8 rounded-xl flex flex-col gap-4">
			<p className="text-[var(--reliwe-green-accent3)] uppercase tracking-widest text-xs">
				Barkabyporten
			</p>
			<h2 className="heading-poppins font-extrabold text-4xl pb-4 text-[var(--reliwe-offwhite)] tracking-wider">
				Fakta om projektet
			</h2>
			<div className="flex flex-col">
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
			</div>
			<p className="max-w-100 text-[var(--reliwe-green-accent3)]">
				Vill du veta mer eller komma tidigt i kön? Anmäl ditt intresse nedan.
			</p>
			<div className="w-full">
				<ButtonAnimationWrapper hasMaxWidth={false}>
					<ButtonWhiteBackground 
						label="Gå till intresseanmälan" 
						Icon={CircleArrowDown}
					/>
				</ButtonAnimationWrapper>
			</div>
		</div>
	);
};

/*

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

	</div>
</div>
*/