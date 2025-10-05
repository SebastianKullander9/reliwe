import Image from "next/image";
import AnimatedButton from "../button/AnimatedButton";
export default function ContactSection() {
    return (
        <div className="w-full h-full md:h-[100vh]">
            <div className="relative w-full h-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
                    <div className=" bg-white ">
                        <Image src="/img/tree.jpg" alt="Illustration of a tree" width={600} height={600} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[var(--reliwe-green)] text-white flex flex-col justify-center items-center site-x-padding">
                    <h1 className="normal-heading text-white">Du hittar oss här</h1>
                    <div className="flex flex-col items-center">
                        <p className="pb-8 site-text-size text-gray-200">Har du frågor om våra projekt eller vill komma i kontakt med oss?</p>
                        <div>
                            <AnimatedButton label="Kontakta oss" color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}