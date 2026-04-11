interface InputProps {
	label: string;
	placeholder: string;
	required?: boolean;
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
	error?: string;
	autoComplete?: string;
}

export default function Input({
	label,
	placeholder,
	required = false,
	type = "text",
	value,
	onChange,
	onBlur,
	error,
	autoComplete,
}: InputProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label className="pl-4">
				{label}
				{required && (
					<span className="text-[var(--reliwe-green)] text-lg"> *</span>
				)}
			</label>
			<input
				className={`
					bg-[var(--reliwe-green-accent)] px-4 py-3 rounded-full w-full
					focus:border-[var(--reliwe-green-accent2)] focus:outline-2
					${error
						? "outline outline-2 outline-red-400 focus:outline-red-400"
						: "focus:outline-[var(--reliwe-green)]"
					}
				`}
				type={type}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				autoComplete={autoComplete}
			/>
			{error && (
				<p className="pl-4 text-sm text-red-500">{error}</p>
			)}
		</div>
	);
}
