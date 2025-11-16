import KeyNumberCard from "./KeyNumberCard";
import crane from "../../../public/keynumbers/crane.svg";
import result from "../../../public/keynumbers/result.svg";
import solvency from "../../../public/keynumbers/solvency2.svg";
import planned from "../../../public/keynumbers/planned.svg";

export default function KeyNumbers() {
    return (
        <>
            <section className="w-full md:h-screen bg-[var(--reliwe-offwhite)] body-x-padding gap-12 flex flex-col">
				<div className="flex flex-col md:flex-row items-horizontal-gap md:!gap-12 items-center">
					<div className="w-full md:w-1/2">
						<h2 className="heading md:pb-0 md:text-start text-center">Våra nyckeltal</h2>
					</div>
					<div className="w-full md:w-1/2">
						<p className="max-w-prose flex justify-end">
							Våra nyckeltal speglar en stabil och långsiktig utveckling. Med en stark projektportfölj och god finansiell ställning fortsätter vi att skapa hållbara bostäder och värde för både kunder och samhälle.
						</p>
					</div>
				</div>


                <div className="h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
                        <KeyNumberCard 
                            title="Bostäder under produktion" 
                            number="2100"
                            imgUrl={crane}
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