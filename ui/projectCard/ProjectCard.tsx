import Image from "next/image";

interface ProjectCardProps {
    orientation: "left" | "right";
    title: string;
    text: string;
    year: string;
    apartmentAmount: string;
    movingInYear: string;
    roomAmount: string;
    imgUrl: string;
}

export default function ProjectCard({
    orientation,
    title,
    text,
    year,
    apartmentAmount,
    movingInYear,
    roomAmount,
    imgUrl,
}: ProjectCardProps) {
    return (
        <div
            className={`flex flex-col ${
                orientation === "right" ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
        >
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
                <div className="relative bg-gray-200 aspect-[4/3] lg:h-full w-full">
                    <Image
                        fill
                        className="object-cover"
                        src={imgUrl}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>

            {/* Text Section */}
            <div className="w-full lg:w-1/2 bg-[var(--reliwe-green-accent)] flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 gap-12 justify-between">
                <div>
                    <h1 className="card-heading">{title}</h1>
                    <p className="max-w-prose text-lg text-[var(--reliwe-green-text)]">
                        {text}
                    </p>
                </div>

                <div className="flex flex-row justify-between max-w-prose flex-wrap gap-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Byggstart</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">{year}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">
                                Inflyttning
                            </h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">
                                {movingInYear}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">
                                Antal lägenheter
                            </h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">
                                {apartmentAmount}
                            </p>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-lg">Antal rum</h2>
                            <p className="text-lg text-[var(--reliwe-green-text)]">
                                {roomAmount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}