type OurRoleProps = {
    title: string;
    text: string;
};

export default function OurRole({ title, text }: OurRoleProps) {
    return (
        <section className="w-full h-screen bg-[var(--reliwe-beige)] body-x-padding flex flex-col items-vertical-gap !gap-16 items-center justify-center">
            <h2 className="heading text-center lg:text-start">
                {title}
            </h2>
            <p className="max-w-prose">
                {text}
            </p>
        </section>
    );
}