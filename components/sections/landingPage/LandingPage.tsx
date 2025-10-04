import Image from "next/image";
import Button from "@/ui/button";

export default function LandingPage() {
    return (
        <section className="relative">
            <div className="fixed inset-0 -z-10">
                <Image
                    src="/img/hero.jpg"
                    alt="Hero image, woman sitting on a couch drinking coffee"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative w-full h-screen justify-center items-center flex flex-col leading-[9vw]">
                <h1 className="text-[var(--reliwe-green-accent)] text-[6vw] uppercase">en Plats för</h1>
                <h1 className="text-[var(--reliwe-green-accent)] text-[14.7vw] uppercase">livet</h1>
            </div>

            <div className="w-full h-screen relative flex flex-row items-center bg-white">
                <div className="p-12 flex">
                    <div className="w-1/2 flex flex-col justify-center">
                        <h1 className="text-5xl pb-12 text-gray-800 font-semibold">
                            Vi gör plats för livet
                        </h1>
                        <div className="flex flex-col gap-8 text-gray-500">
                            <p className="max-w-prose text-lg">
                                Välkommen till en bostadsutvecklare som skapar hållbara hem och
                                levande stadsdelar där människor kan trivas och växa – idag och
                                hela livet ut.
                            </p>
                            <div className="flex">
                                <Button label="Om oss" />
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2">
                        <Image
                            src="/img/hero-2.jpg"
                            width={1254}
                            height={836}
                            alt="An old couple together on a sofa, looking happy and content"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-screen bg-[var(--reliwe-green-accent)] px-12 flex justify-center items-center">
                <div className="flex flex-col gap-12 text-center">
                    <h1 className="text-5xl text-gray-800 font-semibold">Våra projekt</h1>
                    <div>
                        <p className="max-w-prose pb-8 text-lg text-[var(--reliwe-green-text)]">
                            Vi utvecklar bostäder för livet – oavsett om du söker en
                            bostadsrätt eller en hyresrätt. Våra projekt finns i attraktiva
                            tillväxtområden och byggs med fokus på kvalitet, hållbarhet och
                            långsiktigt boende.
                        </p>
                        <Button label="Våra projekt" />
                    </div>
                </div>
            </div>
        </section>
    );
}