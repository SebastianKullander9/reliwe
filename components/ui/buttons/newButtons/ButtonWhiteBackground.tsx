import { LucideIcon } from "lucide-react";

interface ButtonWhiteBackgroundProps {
	label: string;
	Icon?: LucideIcon;
}

export default function ButtonWhiteBackground({ label, Icon }: ButtonWhiteBackgroundProps) {
	return (
		<>
			<button className="text-lg font-medium flex flex-row gap-2 items-center justify-center px-6 min-h-12 border-2 rounded-full cursor-pointer leading-none bg-[var(--reliwe-offwhite)] border-[var(--reliwe-green)] text-[var(--reliwe-green)] mb-[2px]">
				<span className="text-base">{label}</span>
			</button>
			<button className="text-lg font-medium flex flex-row gap-2 items-center justify-center px-6 min-h-12 bg-[var(--reliwe-offwhite)] rounded-full cursor-pointer text-[var(--reliwe-green)] leading-none">
				<span className="text-base">{label}</span>
			</button>
		</>
	);
};