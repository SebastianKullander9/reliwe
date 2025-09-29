import PageIntro from "@/ui/pageIntro";
import ProjectCard from "@/ui/projectCard";

export default function OurProjects() {
    return (
        <div>
            <PageIntro
                title="Välkommen hem"
                texts={[
                    "Hos oss hittar du hem att trivas i - oavsett om du vill köpa eller hyra. Vi bygger för människor, med omtanke om både vardag och framtid.",
                    "Anmäl ditt intresse och bli först med att höra de senaste nyheterna om våra hem."
                ]}
                imgUrl="/img/vara-projekt.jpg"
            />

            <div className="px-12 py-24 container mx-auto flex flex-col gap-24">
                <h1 className="text-6xl font-semibold text-gray-800">Pågående projekt</h1>

                <ProjectCard 
                    orientation="left"
                    title="Haningeterassen, Haninge"
                    text="Med närhet till både naturen, levande centrum med butiker och restauranger, samt goda kommunikationer bygger vi attraktiva hyresrätter."
                    year="2024"
                    apartmentAmount="382"
                    movingInYear="2027"
                    roomAmount="1-4"
                />

                <ProjectCard 
                    orientation="right"
                    title="Umami Park, Sundbyberg"
                    text="Med närhet till både naturen, levande centrum med butiker och restauranger, samt goda kommunikationer bygger vi attraktiva hyresrätter."
                    year="2024"
                    apartmentAmount="311"
                    movingInYear="2026"
                    roomAmount="1-4"
                />
            </div>
        </div>
    );
}