import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative -z-20">
            <div className="absolute sm:fixed inset-0">
                <Image 
                    src="/site-images/hero.jpg" alt="Background image for hero section" 
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative w-full h-[100svh] flex flex-col justify-center items-center leading-[15vw] lg:leading-[7vw] gap-36">
                <div>
                    <h1 className="text-[10vw] lg:text-[5vw] text-[#d8e6dc] uppercase">En plats för</h1>
                    <h1 className="text-[24vw] lg:text-[12vw] text-[#d8e6dc] uppercase">Livet</h1>
                </div>
                <p className="text-[#d8e6dc] max-w-prose leading-normal text-center px-4">
                    Välkommen till en bostadsutvecklare och hyresvärd som skapar hållbara
                    hem och levande stadsdelar där människor kan trivas och växa - idag och
                    över tid.
                </p>
            </div>
        </section>
    );
}