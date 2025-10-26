type OurVisionProps = {
    title: string;
    text: string;
};

export default function OurVision({ title, text }: OurVisionProps) {
    return (
        <section className="w-full min-h-screen bg-[var(--reliwe-green-accent)] body-x-padding flex flex-col items-vertical-gap items-center justify-center">
            <h2 className="text-4xl lg:text-7xl text-center lg:text-start">
                {title}
            </h2>
            <p className="max-w-prose">{text}</p>
        </section>
    );
}