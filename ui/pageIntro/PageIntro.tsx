import Image from "next/image";

interface PageIntroProps {
    title: string;
    texts: string[];
    imgUrl?: string;
}

export default function PageIntro({ title, texts, imgUrl }: PageIntroProps) {
    return (
        <div className={`h-[${imgUrl ? "100vh" : "50vh"}] flex flex-col`}>
            <div className="w-full h-[calc(50vh+85px)] bg-[var(--reliwe-green-accent)] text-[var(--reliwe-green)] flex flex-col items-center justify-center site-x-padding">
                <h1 className="normal-heading text-center pb-12">{title}</h1>
                <div>
                    {texts.map((text: string, index: number) => (
                        <p key={index} className="max-w-prose pb-4 text-center site-text-size text-green">{text}</p>
                    ))}
                </div>
            </div>
            { imgUrl ? (
                <div className="flex-1 relative w-full h-[50vh]">
                    <Image src={imgUrl} className="object-cover" fill alt="Image consisting of two happy kids" />
                </div>
            ) : ""}
        </div>
    );
}