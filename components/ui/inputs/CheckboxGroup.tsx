interface CheckboxGroupProps {
    options: { label: string; value: string }[];
    name: string;
}

export default function CheckboxGroup({options, name }: CheckboxGroupProps) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row flex-wrap gap-4">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center gap-2 px-4 py-[10px] rounded-full cursor-pointer bg-[var(--reliwe-green-accent)] hover:bg-[var(--reliwe-green-accent2)] has-checked:bg-[var(--reliwe-green)] has-checked:text-[var(--reliwe-offwhite)]"
                    >
                        <input
                            type="checkbox"
                            name={name}
                            value={option.value}
                            className="hidden"
                        />
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}