import Image from "next/image";
import PageIntro from "@/ui/pageIntro";

export default function Contact() {
    return (
        <div className="h-[calc(100vh] flex flex-col">
            <PageIntro
                title="Hur kan vi hjälpa till?" 
                texts={["Varmt välkommen att kontakta oss om du har frågor om företaget eller våra projekt."]}
            />

            <div className="w-full h-[50vh] flex flex-row">
                <div className="relative w-1/2 h-full hidden md:block">
                    <Image fill className="object-contain" src="/img/tree.jpg" alt=""/>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center gap-12">
                    <div className="flex flex-col">
                        <h1 className="normal-heading">E-POST</h1>
                        <p className="site-text-size text-gray-600">info@reliwe.se</p>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="normal-heading">BESÖKSADRESS</h1>
                        <div className="site-text-size text-gray-600">
                            <p>Ingmar Bergmans Gata 2</p>
                            <p>114 34 Stockholm, Sweden</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}