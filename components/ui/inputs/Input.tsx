interface InputProps {
	label: string;
	placeholder: string;
}

export default function Input({ label, placeholder }: InputProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label className="pl-4">
				{label}
			</label>
			<input 
				className="
					bg-[var(--reliwe-green-accent)] p-4 rounded-full w-full shadow-xs border border-[var(--reliwe-green-accent)] 
					focus:border-[var(--reliwe-green-accent2)] focus:outline-none focus:bg-[var(--reliwe-offwhite)]
				"
				type="text"
				placeholder={placeholder}
				required
			/>
		</div>
	);
};