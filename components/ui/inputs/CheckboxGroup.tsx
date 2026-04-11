interface CheckboxGroupProps {
	options: { label: string; value: string }[];
	name: string;
	label?: string;
	value: string[];
	onChange: (value: string[]) => void;
	error?: string;
}

export default function CheckboxGroup({
	options,
	name,
	label,
	value,
	onChange,
	error,
}: CheckboxGroupProps) {
	const toggle = (optionValue: string) =>
		onChange(
			value.includes(optionValue)
				? value.filter((v) => v !== optionValue)
				: [...value, optionValue]
		);

	return (
		<div className="flex flex-col gap-2">
			{label && <label className="pl-4">{label}</label>}
			<div className="flex flex-row flex-wrap gap-4">
				{options.map((option) => (
					<button
						key={option.value}
						type="button"
						onClick={() => toggle(option.value)}
						className={`
							flex items-center gap-2 px-4 py-[10px] rounded-full cursor-pointer
							${value.includes(option.value)
								? "bg-[var(--reliwe-green)] text-[var(--reliwe-offwhite)]"
								: "bg-[var(--reliwe-green-accent)] hover:bg-[var(--reliwe-green-accent2)]"
							}
						`}
						aria-pressed={value.includes(option.value)}
						name={name}
					>
						{option.label}
					</button>
				))}
			</div>
			{error && <p className="pl-4 text-sm text-red-500">{error}</p>}
		</div>
	);
}
