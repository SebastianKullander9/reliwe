interface TextAreaProps {
	label?: string;
	placeholder?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: () => void;
	error?: string;
	maxLength?: number;
}

export default function TextArea({
	label,
	placeholder = "Berätta gärna mer om dina önskemål",
	value,
	onChange,
	onBlur,
	error,
	maxLength,
}: TextAreaProps) {
	return (
		<div className="flex flex-col gap-2">
			{label && <label className="pl-4">{label}</label>}
			<textarea
				className={`
					bg-[var(--reliwe-green-accent)] rounded-3xl p-4
					focus:outline-2
					${error
						? "outline outline-2 outline-red-400 focus:outline-red-400"
						: "focus:outline-[var(--reliwe-green)]"
					}
				`}
				rows={5}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				maxLength={maxLength}
			/>
			<div className="flex justify-between pl-4 pr-1">
				{error ? (
					<p className="text-sm text-red-500">{error}</p>
				) : (
					<span />
				)}
				{maxLength && (
					<p className="text-xs text-gray-400 text-right">
						{value.length}/{maxLength}
					</p>
				)}
			</div>
		</div>
	);
}
