import "./style.css";

type BaseButtonProps = {
    label: string;
    bgColor: string;
    hoverTextColor: string;
}

export default function BaseButton({ label, bgColor, hoverTextColor }: BaseButtonProps) {
    return (
        <button 
            className={`relative overflow-hidden py-3 px-5 group border-1 rounded-full cursor-pointer min-w-47`}
            style={{ borderColor: bgColor}}
        >
            <div 
                className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out`}
                style={{ backgroundColor: bgColor }}
            />

            <p 
                className="relative z-10 transition-colors duration-200"
                style={{
                    color: bgColor,
                    "--hover-color": hoverTextColor 
                } as React.CSSProperties}
            >
                {label}
            </p>
        </button>
    );
}