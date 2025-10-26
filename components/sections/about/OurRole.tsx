type OurRoleProps = {
    title: string;
    text: string;
};

export default function OurRole({ title, text }: OurRoleProps) {
    return (
        <section className="w-full h-screen bg-[var(--reliwe-beige)] body-x-padding flex flex-col items-vertical-gap items-center justify-center">
            <h2 className="text-4xl lg:text-7xl text-center lg:text-start">
                {title}
            </h2>
            <p className="max-w-prose">
                {text}
            </p>
        </section>
    );
}