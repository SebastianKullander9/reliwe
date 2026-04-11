"use client";

interface PillSelectProps {
	label?: string;
	options?: string[];
	value: string[];
	onChange: (value: string[]) => void;
	error?: string;
	required?: boolean;
}

const DEFAULT_ROOMS = ["1 rok", "2 rok", "3 rok", "4 rok"];

export default function PillSelect({
	label = "Önskat antal rum",
	options = DEFAULT_ROOMS,
	value,
	onChange,
	error,
	required = false,
}: PillSelectProps) {
	const toggle = (option: string) =>
		onChange(
			value.includes(option)
				? value.filter((r) => r !== option)
				: [...value, option]
		);

	return (
		<div className="flex flex-col gap-2">
			<label className="pl-4">
				{label}
				{required && (
					<span className="text-[var(--reliwe-green)] text-lg"> *</span>
				)}
			</label>
			<div className="flex flex-row flex-wrap gap-4">
				{options.map((option, index) => (
					<button
						onClick={() => toggle(option)}
						className={`
							px-4 py-[10px] rounded-full cursor-pointer
							${value.includes(option)
								? "bg-[var(--reliwe-green)] text-[var(--reliwe-offwhite)]"
								: "hover:bg-[var(--reliwe-green-accent2)] bg-[var(--reliwe-green-accent)]"
							}
						`}
						key={option + index}
						type="button"
					>
						{option}
					</button>
				))}
			</div>
			{error && <p className="pl-4 text-sm text-red-500">{error}</p>}
		</div>
	);
}
