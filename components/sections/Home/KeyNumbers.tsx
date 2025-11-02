import KeyNumberCard from "./KeyNumberCard";
import estate from "../../../public/keynumbers/estate.svg";
import result from "../../../public/keynumbers/result.svg";
import solvency from "../../../public/keynumbers/solvency.svg";
import planned from "../../../public/keynumbers/planned.svg";

export default function KeyNumbers() {
    return (
        <>
            <section className="w-full md:h-screen bg-[var(--reliwe-offwhite)] body-x-padding">
                <h2 className="text-4xl lg:text-7xl pb-24 text-center md:pb-0 md:text-start">Våra nyckeltal</h2>

                <div className="h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                        <KeyNumberCard 
                            title="Bostäder under produktion" 
                            number="2100"
                            imgUrl={estate}
                        />
                        <KeyNumberCard 
                            title="Planerade byggstarter" 
                            number="1500"
                            imgUrl={planned}
                        />
                        <KeyNumberCard 
                            title="resultat 2025" 
                            number="112 mkr"
                            imgUrl={result}
                        />
                        <KeyNumberCard 
                            title="soliditet 2025" 
                            number="87%"
                            imgUrl={solvency}
                        />
                    </div>
                </div>
            </section>

            <div className="h-48 w-full bg-[var(--reliwe-offwhite)]" />
        </>
        
    );
}