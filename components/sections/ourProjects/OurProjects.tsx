import PageIntro from "@/ui/pageIntro";
import ProjectCard from "@/ui/projectCard";
import { data } from "./projectsData";

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

            <div className="site-x-padding lg:container mx-auto flex flex-col gap-24 md:gap-24 pb-12">
                <h1 className="normal-heading text-center pt-30">Pågående projekt</h1>

                {data.map((project, index) => (
                    <ProjectCard
                        key={index}
                        orientation={index % 2 === 0 ? "left" : "right"}
                        title={project.title}
                        text={project.text}
                        year={project.year}
                        apartmentAmount={project.apartmentAmount}
                        movingInYear={project.movingInYear}
                        roomAmount={project.roomAmount}
                        imgUrl={project.imgUrl}
                    />
                ))}
            </div>
        </div>
    );
}