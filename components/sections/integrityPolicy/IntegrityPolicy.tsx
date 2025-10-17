import Accordion from "@/components/ui/accordion/Accordion";
import { data } from "./contentData";

export default function IntegrityPolicy() {
    return (
        <section className="w-full min-h-screen bg-[var(--reliwe-offwhite)] flex flex-col items-center justify-start pt-48 gap-12 body-x-padding">
            <h1 className="text-4xl lg:text-5xl text-center">Integritetspolicy</h1>
            <div className="max-w-prose w-full pb-24">
                {data.map((policy, index) => (
                    <Accordion 
                        key={index}
                        title={policy.title}
                        content={policy.content}
                        index={index}
                    />
                ))}
            </div>
        </section>
    )
}