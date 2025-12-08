import InfoCard from "./InfoCard";

type Card = {
    image: { asset: { _ref: string } | { url: string }; alt?: string };
    title: string;
    text: string;
};

type SustainabilityProps = {
    cards: Card[];
};

export default function Sustainability({ cards }: SustainabilityProps) {
    return (
        <>
            <section className="w-full min-h-[calc(100vh+100px)] body-x-padding bg-[var(--background-beige)] flex flex-col items-vertical-gap md:justify-between pb-24 md:pb-0">
                <h2 className="heading pt-12 md:py-0 md:mb-24 md:mt-12 text-center md:text-start">
                    Hållbarhet i fokus
                </h2>
                <div className="flex flex-col md:flex-row gap-22 md:gap-8 sm:gap-6 md:items-horizontal-gap">
                    {cards.map((card, index) => (
                        <InfoCard
                            key={index}
                            image={card.image}
                            title={card.title}
                            text={card.text}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}