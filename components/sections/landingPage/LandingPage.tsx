import Image from "next/image";
import AnimatedButton from "@/ui/button/AnimatedButton";
import Header from "@/ui/header";

export default function LandingPage() {
    return (
        <section className="relative">
            <Header />

            <div className="fixed inset-0 -z-10">
                <Image
                    src="/img/hero.jpg"
                    alt="Hero image, woman sitting on a couch drinking coffee"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative w-full h-screen justify-center items-center flex flex-col leading-[15vw] sm:leading-[10vw] lg:leading-[6vw]">
                <h1 className="text-[var(--reliwe-green-accent)] text-[9vw] sm:text-[7vw] lg:text-[4vw] uppercase">en Plats för</h1>
                <h1 className="text-[var(--reliwe-green-accent)] text-[21.8vw] sm:text-[17vw] lg:text-[9.8vw] uppercase">livet</h1>
            </div>

            <div className="w-full h-screen relative flex flex-row items-center bg-white">
                <div className="site-x-padding flex flex-col md:flex-row md:gap-12">
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center md:items-start">
                        <h1 className="normal-heading pb-4">
                            Vi gör plats för livet
                        </h1>
                        <div className="flex flex-col gap-8 text-gray-500 items-center md:items-start pb-12 md:pb-0">
                            <p className="max-w-prose site-text-size">
                                Välkommen till en bostadsutvecklare som skapar hållbara hem och
                                levande stadsdelar där människor kan trivas och växa – idag och
                                hela livet ut.
                            </p>
                            <div className="max-w-40 min-w-40 hidden md:block">
                                <AnimatedButton label="Om oss" color="darkGreen" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col items-center">
                        <Image
                            src="/img/hero-2.jpg"
                            width={1254}
                            height={836}
                            alt="An old couple together on a sofa, looking happy and content"
                        />

                        <div className="max-w-40 min-w-40 pt-12 md:hidden">
                            <AnimatedButton label="Om oss" color="darkGreen" />
                        </div>
                    </div>

                    
                </div>
            </div>

            <div className="w-full h-screen bg-[var(--reliwe-green-accent)] site-x-padding flex justify-center items-center">
                <div className="flex flex-col text-center">
                    <h1 className="normal-heading">Våra projekt</h1>
                    <div className="flex flex-col items-center">
                        <p className="max-w-prose pb-8 site-text-size text-[var(--reliwe-green-text)]">
                            Vi utvecklar bostäder för livet – oavsett om du söker en
                            bostadsrätt eller en hyresrätt. Våra projekt finns i attraktiva
                            tillväxtområden och byggs med fokus på kvalitet, hållbarhet och
                            långsiktigt boende.
                        </p>
                        <div className="max-w-40 min-w-40">
                            <AnimatedButton label="Våra projekt" color="darkGreen" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}