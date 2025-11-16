import "./style.css";

type BaseButtonBackgroundProps = {
    label: string;
    bgColor: string;
    hoverTextColor: string;
}

export default function BaseButtonBackground({ label, bgColor, hoverTextColor }: BaseButtonBackgroundProps) {
    return (
        <button 
            className={`relative overflow-hidden py-3 px-5 group rounded-full cursor-pointer min-w-47`}
            style={{ backgroundColor: bgColor}}
        >
            <div 
                className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out`}
                style={{ backgroundColor: "black" }}
            />

            <p 
                className="relative z-10 transition-colors duration-200"
                style={{
                    color: "white",
                    "--hover-color": hoverTextColor 
                } as React.CSSProperties}
            >
                {label}
            </p>
        </button>
    );
}