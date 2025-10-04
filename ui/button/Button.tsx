interface ButtonProps {
    label: string;
    alternativeColors?: boolean;
}

export default function Button({ label, alternativeColors = false }: ButtonProps) {
    return (
        <button className={`px-5 py-3 text-lg w-40 ${alternativeColors ? "rounded-full bg-white text-[var(--reliwe-green)]" : "rounded-full bg-[var(--reliwe-green)] text-white"}`}>
            {label}
        </button>
    )
}