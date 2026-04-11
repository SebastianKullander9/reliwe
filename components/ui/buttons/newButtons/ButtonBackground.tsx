import { LucideIcon } from "lucide-react";

interface ButtonBackgroundProps {
	label: string;
	Icon?: LucideIcon;
	onClick?: () => void;
	disabled?: boolean;
}

export default function ButtonBackground({ label, Icon, onClick, disabled = false }: ButtonBackgroundProps) {
	return (
		<>
			<button
				className="text-lg font-medium flex flex-row gap-2 items-center justify-center px-6 min-h-12 border-2 rounded-full leading-none bg-[var(--reliwe-green)] border-[var(--reliwe-green)] text-[var(--reliwe-offwhite)] mb-[2px] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
				onClick={onClick}
				disabled={disabled}
			>
				<span className="text-base">{label}</span>
				{Icon && (
					<Icon />
				)}
			</button>
			<button
				className="text-lg font-medium flex flex-row gap-2 items-center justify-center border-2 border-black px-6 min-h-12 bg-black rounded-full text-white leading-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
				onClick={onClick}
				disabled={disabled}
			>
				<span className="text-base">{label}</span>
				{Icon && (
					<Icon />
				)}
			</button>
		</>
	);
};