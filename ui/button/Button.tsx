interface ButtonProps {
    label: string;
    alternativeColors?: boolean;
}

export default function Button({ label, alternativeColors = false }: ButtonProps) {
    return (
        <button className={`px-6 py-3 text-lg ${alternativeColors ? "rounded-full bg-white text-[var(--reliwe-green)]" : "rounded-full bg-[var(--reliwe-green)] text-white"}`}>
            {label}
        </button>
    )
}