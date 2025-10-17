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
            <div className="relative w-full h-[100svh] flex flex-col justify-center items-center leading-[15vw] lg:leading-[11vw]">
                <h1 className="text-[10vw] lg:text-[7vw] text-[#d8e6dc] uppercase">En plats för</h1>
                <h1 className="text-[24vw] lg:text-[17vw] text-[#d8e6dc] uppercase">Livet</h1>
            </div>
        </section>
    );
}