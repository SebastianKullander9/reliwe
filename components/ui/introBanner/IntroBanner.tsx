import Image from "next/image"

type IntroBannerProps = {
    title: string;
    texts: string[];
    imgUrl: string;
    imgAlt: string;
    screenReaderH1: string;
    showImage?: boolean;
}

export default function IntroBanner({ title, texts, imgUrl, imgAlt, screenReaderH1, showImage=true }: IntroBannerProps) {
    return (
        <section className="w-full bg-[var(--reliwe-green-accent)]">
            <h1 className="sr-only">{screenReaderH1}</h1>

            <div className="w-full h-[calc(50vh+200px)] body-x-padding flex flex-col text-center items-center justify-center items-vertical-gap">
                <h2 className="heading mb-12">{title}</h2>
                {texts.map((text, index) => (
                    <p 
                        key={index}
                        className="max-w-prose"
                    >
                        {text}
                    </p>
                ))}
            </div>
            {showImage ? (
                <div className="w-full h-[50vh] relative">
                    <Image src={imgUrl} alt={imgAlt} fill priority unoptimized className="object-cover" />
                </div>
            ): (
                <></>
            )}
        </section>
    )
}