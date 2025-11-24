import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProjectsList from "./ProjectList";

type SanityImage = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
};

type Project = {
    title: string;
    text: string;
    year: string;
    movingInYear: string;
    apartmentAmount: string;
    roomAmount: string;
    images: SanityImage[];
    imgUrls: string[];
    status: "ongoing" | "done" | "upcoming";
};

type IntroBannerData = {
    title: string;
    texts: string[];
    image?: SanityImage;
};

type OurProjectsPageData = {
    introBanner: IntroBannerData;
    projects: Project[];
};

async function getOurProjectsPage(): Promise<OurProjectsPageData> {
    const data = await client.fetch(`
        *[_type == "projectsPage"][0]{
            introBanner {
                title,
                texts,
                image
            }
        }
    `, {}, { next: { revalidate: 0 }});

    const projects = await client.fetch(`
        *[_type == "estateProject"] | order(_createdAt desc) {
            title,
            text,
            year,
            apartmentAmount,
            movingInYear,
            roomAmount,
            images,
            status
        }
    `, {}, { next: { revalidate: 0 }});

    const formattedProjects: Project[] = projects.map((project: Project) => ({
        ...project,
        imgUrls: project.images?.map((img: SanityImage) => 
			urlFor(img)
			.width(2000)
			.quality(90)
			.auto("format")
			.url()
		) ?? [],
    }));

    const introBanner: IntroBannerData = data?.introBanner || {
        title: "",
        texts: [],
    };

    return {
        introBanner,
        projects: formattedProjects,
    };
}

export default async function OurProjects() {
    const data = await getOurProjectsPage();

    return (
        <section>
            <IntroBanner
                title={data.introBanner.title}
                texts={data.introBanner.texts}
                imgUrl={
                    data.introBanner.image
                        ? urlFor(data.introBanner.image).width(2000)
						.quality(95)
						.auto("format")
						.url()
                        : ""
                }
                imgAlt={data.introBanner.image?.alt || ""}
                screenReaderH1="Våra projekt - Reliwe bostadsprojekt"
            />
            <ProjectsList projects={data.projects} />
        </section>
    );
}