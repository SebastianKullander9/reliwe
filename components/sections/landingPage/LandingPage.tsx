import Image from "next/image";
import Button from "@/ui/button";

export default function LandingPage() {
    return (
        <section>
            <div className="relative w-full h-[75vh]">
                <Image src="/img/hero.jpg" className="object-cover" fill alt="Hero image, woman sitting on a couch drinking coffe" />
                <h1 className="absolute text-7xl text-white top-[70%] left-1/5 -translate-x-1/5 -translate-y-[70%]">En plats för livet</h1>
            </div>

            <div className="flex flex-row px-12 py-48 gap-12 container mx-auto">
                <div className="w-1/2 flex flex-col justify-center">
                    <h1 className="text-6xl pb-12 text-gray-800 font-semibold text-center">Vi gör plats för livet</h1>
                    <div className="flex flex-col gap-8 text-center">
                        <p className="max-w-prose text-gray-600 text-lg">Välkommen till en bostadsutvecklare som skapar hållbara hem och levande stadsdelar där människor kan trivas och växa - idag och hela livet ut.</p>
                        <div className="flex justify-center">
                            <Button label="Om oss"/>
                        </div>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image src="/img/hero-2.jpg" width={1254} height={836} alt="An old couple togheter on a sofa, looking happy and content" />
                </div>
            </div>

            <div className="w-full bg-[var(--reliwe-green-accent)] px-12 py-48 flex justify-center">
                <div className="flex flex-col gap-12 text-center">
                    <h1 className="text-6xl text-gray-800 font-semibold">Våra projekt</h1>
                    <div>
                        <p className="max-w-prose pb-8 text-lg text-[var(--reliwe-green-text)]">Vi utvecklar bostäder för livet - oavsett om du söker en bostadsrätt eller en hyresrätt. Våra projekt finns i attraktiva tillväxtområden och byggs med fokus på kvalitet, hållbarhet och långsiktigt boende.</p>
                        <Button label="Våra projekt" />
                    </div>
                </div>
            </div>
        </section>
    );
}
