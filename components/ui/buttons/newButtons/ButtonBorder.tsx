import { LucideIcon } from "lucide-react";

interface ButtonBorderProps {
	label: string;
	Icon?: LucideIcon;
}

export default function ButtonBorder({ label, Icon }: ButtonBorderProps) {
	return (
		<>
			<button className="text-lg flex flex-row items-center justify-center gap-2 px-6 min-h-12 min-w-45 border-2 rounded-full cursor-pointer leading-none text-[var(--reliwe-offwhite)] mb-[2px]">
				{label}
				{Icon && <Icon />}
			</button>
			<button className="text-lg flex flex-row items-center justify-center gap-2 border-2 border-[var(--reliwe-offwhite)] px-6 min-h-12 min-w-45 bg-[var(--reliwe-offwhite)] rounded-full cursor-pointer text-black leading-none">
				{label}
				{Icon && <Icon />}
			</button>
		</>
	);
};