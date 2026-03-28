import { LucideIcon } from "lucide-react";

interface ButtonBackgroundProps {
	label: string;
	Icon?: LucideIcon;
}

export default function ButtonBackground({ label, Icon }: ButtonBackgroundProps) {
	return (
		<>
			<button className="text-lg font-medium flex flex-row gap-2 items-center justify-center px-6 min-h-12 border-2 rounded-full cursor-pointer leading-none bg-[var(--reliwe-green)] border-[var(--reliwe-green)] text-[var(--reliwe-offwhite)] mb-[2px]">
				<span className="text-base">{label}</span>
				{Icon && (
					<Icon />
				)}
			</button>
			<button className="text-lg font-medium flex flex-row gap-2 items-center justify-center border-2 border-black px-6 min-h-12 bg-black rounded-full cursor-pointer text-white leading-none">
				<span className="text-base">{label}</span>
				{Icon && (
					<Icon />
				)}
			</button>
		</>
	);
};