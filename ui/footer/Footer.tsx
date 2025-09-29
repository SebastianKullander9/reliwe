import Image from "next/image";
import Button from "../button";

export default function Footer() {
    return (
        <footer>
            <div className="relative w-full flex flex-row">
                <div className="w-1/2">
                    <div className="flex justify-center">
                        <Image src="/img/tree.jpg" alt="Illustration of a tree" width={600} height={600} />
                    </div>
                </div>
                <div className="w-1/2 bg-[var(--reliwe-green)] text-white flex flex-col gap-12 justify-center items-center">
                    <h1 className="text-6xl font-semibold">Du hittar oss här</h1>
                    <div className="flex flex-col items-center">
                        <p className="pb-8 text-lg text-gray-200">Har du frågor om våra projekt eller vill komma i kontakt med oss?</p>
                        <Button label="Kontakta oss" alternativeColors={true} />
                    </div>
                </div>
            </div>
            <div className="w-full bg-[var(--reliwe-green-accent)] flex flex-row justify-between px-12 py-12">
                <div className="relative">
                    <p className="absolute whitespace-nowrap bottom-0">© 2024 Reliwe Sverige AB | info@reliwe.se</p>
                </div>
                <div>
                    Follow us: Linkedin
                </div>
                <div className="flex flex-row gap-4">
                    <p>Hem</p>
                    <p>Våra projekt</p>
                    <p>Om oss</p>
                    <p>Kontakt</p>
                </div>
            </div>
        </footer>
    );
}