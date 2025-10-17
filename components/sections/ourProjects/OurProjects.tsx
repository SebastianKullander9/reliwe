import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import ProjectCard from "@/components/ui/projectCard/ProjectCard";
//import { data } from "./projectData";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/sanity/image";

type Project = {
    title: string;
    text: string;
    year: string;
    movingInYear: string;
    apartmentAmount: string;
    roomAmount: string;
    images: string[];
}

async function getProjects() {
    const projects = await client.fetch(`
        *[_type == "estateProject"] | order(_createdAt desc) {
            title,
            text,
            year,
            apartmentAmount,
            movingInYear,
            roomAmount,
            images
        }
    `);
    return projects;
}

export default async function OurProjects() {
    const projects = await getProjects();

    return (
        <section>
            <IntroBanner 
                title="Välkommen hem"
                texts={[
                    "Hos oss hittar du hem att trivas i - oavsett om du vill köpa eller hyra. Vi bygger för människor, med omtanke om både vardag och framtid.",
                    "Anmäl ditt intresse och bli först med att höra de senaste nyheterna om våra hem."
                ]}
                imgUrl="/site-images/vara-projekt.jpg"
                imgAlt="Image of a child, her mother and dog laying down in a sofa looking happy togheter"
                screenReaderH1="Våra projekt - Reliwe bostadsprojekt"
            />
            {projects.map((project: Project, index: number) => (
                <ProjectCard
                    key={index}
                    title={project.title}
                    text={project.text}
                    year={project.year}
                    movingInYear={project.movingInYear}
                    apartmentAmount={project.apartmentAmount}
                    roomAmount={project.roomAmount}
                    imgUrls={project.images.map((img: string) => 
                        urlFor(img).width(800).url()
                    )}
                    index={index}
                />
            ))}
        </section>
    )
}