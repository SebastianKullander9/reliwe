interface InputProps {
	label: string;
	placeholder: string;
	required?: boolean;
}

export default function Input({ label, placeholder, required=false }: InputProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<label className="pl-4">
				{label}
				<span className="text-[var(--reliwe-green)] text-lg">
					{required && "*"}
				</span>
			</label>
			<input 
				className="
					bg-[var(--reliwe-green-accent)] p-3 rounded-full w-full shadow-xs border border-[var(--reliwe-green-accent)] 
					focus:border-[var(--reliwe-green-accent2)] focus:outline-none focus:bg-[var(--reliwe-offwhite)]
				"
				type="text"
				placeholder={placeholder}
				required
			/>
		</div>
	);
};