import Image from "next/image";

interface PageIntroProps {
    title: string;
    texts: string[];
    imgUrl: string;
}

export default function PageIntro({ title, texts, imgUrl }: PageIntroProps) {
    return (
        <div className="h-[calc(100vh-104px)] flex flex-col">
            <div className="w-full bg-[var(--reliwe-green-accent)] px-12 py-24 text-[var(--reliwe-green)] flex flex-col gap-12 items-center">
                <h1 className="text-6xl font-semibold text-gray-800">{title}</h1>
                <div>
                    {texts.map((text: string, index: number) => (
                        <p key={index} className="max-w-prose pb-4 text-center text-lg text-[var(--reliwe-green-text)]">{text}</p>
                    ))}
                </div>
            </div>

            <div className="flex-1 relative w-full h-full">
                <Image src={imgUrl} className="object-cover" fill alt="Image consisting of two happy kids" />
            </div>
        </div>
    );
}