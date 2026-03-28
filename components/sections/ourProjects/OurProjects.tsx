import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProjectsList from "./ProjectList";
import { Suspense } from "react";
import { Project } from "@/app/types/types";

type SanityImage = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
};

type SanityProject = {
	title: string;
	text: string;
	year: string;
	movingInYear: string;
	apartmentAmount: string;
	roomAmount: string;
	images: SanityImage[];
	status: "ongoing" | "done" | "planned";
	sortOrder?: number;
	slug: { current: string };
	hasSubpage?: boolean;
	subpage?: { title?: string; textBlocks?: string[] };
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
        *[_type == "estateProject"] 
		| order(
			select(
				status == "planned" => 0,
				status == "ongoing" => 1,
				status == "done" => 2,
				99
			) asc,
			sortOrder asc,
			_createdAt desc
		)
		{
            title,
            text,
            year,
            apartmentAmount,
            movingInYear,
            roomAmount,
            images,
            status,
			sortOrder,
			slug {
				current
			},
			hasSubpage,
			subpage {
				title,
				textBlocks
			}
        }
    `, {}, { next: { revalidate: 0 }});

    const formattedProjects: Project[] = projects.map((project: SanityProject) => ({
        ...project,
		slug: project.slug?.current || "",
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
			<div className="md:pt-36 lg:pt-16 xl:pt-6">
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
			</div>
            <Suspense fallback={<div>Loading projects...</div>}>
				<ProjectsList projects={data.projects} />
			</Suspense>
        </section>
    );
}