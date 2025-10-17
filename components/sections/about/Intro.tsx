import Image from "next/image";

export default function Intro() {
    return (
        <>
            <section 
                className="w-full min-h-screen body-x-padding section-y-padding bg-[var(--reliwe-offwhite)] flex flex-col md:flex-row justify-center items-vertical-gap md:gap-0"
            >
                <div className="w-full md:w-1/2 flex flex-col md:justify-between items-vertical-gap md:gap-0">
                    <h2 className="text-4xl lg:text-7xl text-center lg:text-start">Vi bygger hem för livet</h2>
                    <p className="max-w-prose">
                        Reliwe är en bostadsutvecklare som skapar
                        både bostadsrätter och hyresrätter - för en
                        blandad och levande stadsmiljö. Som
                        hyresvärd är vi långsiktiga och närvarande,
                        med ambitionen att skapa trygga och
                        välskötta hem där människor kan bo länge
                        och trivas.
                    </p>
                </div>
                <div className="w-full aspect-[4/5] md:aspect-auto md:w-1/2 relative">
                    <Image 
                        src="/site-images/om-oss2.jpg"
                        fill
                        className="object-cover xl:object-contain xl:object-right"
                        alt="Image of two kids playing on stilts, looking happy"
                    />
                </div>
            </section>
            <div className="w-full h-24 bg-[var(--reliwe-offwhite)]" />
        </>
    )
}