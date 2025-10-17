import InfoCard from "./InfoCard";
import { data } from "./cardData";

export default function Sustainability() {
    return (
        <>
            <section className="w-full min-h-screen body-x-padding section-y-padding bg-[var(--reliwe-offwhite)] flex flex-col items-vertical-gap justify-center">
                <h2 className="text-4xl lg:text-7xl text-center py-12 md:py-0">
                    Hållbarhet i fokus
                </h2>
                <div className="flex flex-col md:flex-row gap-36 sm:gap-6 md:items-horizontal-gap">
                    {data.map((card, index) => (
                        <InfoCard
                            key={index}
                            imgUrl={card.imgUrl}
                            title={card.title}
                            text={card.text}
                        />
                    ))}
                </div>
            </section>

            <div className="w-full h-24 bg-[var(--reliwe-offwhite)]" />
        </>
       
    )
}