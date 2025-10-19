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
        `,
        {}, 
        { next: { revalidate: 60 } }
    );
    return projects;
}

export default async function OurProjects() {
    const projects = await getProjects();

    return (
        <section>
            <IntroBanner 
                title="Välkommen hem"
                texts={[
                    `Hos oss hittar du hem att trivas i – oavsett om du vill köpa eller hyra. Vi
                    utvecklar, bygger och förvaltar bostäder med omtanke och kvalitet, för
                    vardagens små stunder och framtidens stora ögonblick.`,
                    "Anmäl ditt intresse och bli först med att ta del av våra nya projekt och lediga hem."
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