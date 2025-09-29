interface ProjectCardProps {
    orientation: "left" | "right";
    title: string;
    text: string;
    year: string;
    apartmentAmount: string;
    movingInYear: string;
    roomAmount: string;
}

export default function ProjectCard({
    orientation,
    title,
    text,
    year,
    apartmentAmount,
    movingInYear,
    roomAmount,
}: ProjectCardProps) {
    return (
        <div
            className={`flex ${
                orientation === "right" ? "flex-row-reverse" : "flex-row"
            }`}
        >
            <div className="w-1/2">
                <div className="bg-gray-200 h-full flex items-center justify-center">
                    BILD HÄR
                </div>
            </div>

            <div className="w-1/2 bg-[var(--reliwe-green-accent)] flex flex-col p-12 gap-12">
                <h1 className="text-5xl font-semibold text-gray-800">{title}</h1>
                <p className="max-w-prose text-lg text-[var(--reliwe-green-text)]">{text}</p>

                <div className="flex flex-row justify-between max-w-prose">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Byggstart</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">{year}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Inflyttning</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">{movingInYear}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Antal lägenheter</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">{apartmentAmount}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Antal rum</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">{roomAmount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}