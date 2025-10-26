import CallToAbout from "@/components/sections/Home/CallToAbout";
import CallToProjects from "@/components/sections/Home/CallToProjects";
import Hero from "@/components/sections/Home/Hero";
import FooterWithClient from "@/components/ui/footer/FooterWithClient";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/sanity/image";

type SanityImage = {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    alt?: string;
};

type FeaturedProject = {
    title: string;
    images?: SanityImage;
    year?: string;
    imageUrl?: string;
};

type CallToAboutData = {
    heading: string;
    text: string;
    image?: SanityImage;
};

type CallToProjectsData = {
    heading: string;
    text: string;
    featuredProjects: FeaturedProject[];
};

type HomePageData = {
    callToAbout: CallToAboutData;
    callToProjects: CallToProjectsData;
};

async function getHomePage(): Promise<HomePageData> {
    const data = await client.fetch(`
        *[_type == "homePage"][0]{
            callToAbout {
                heading,
                text,
                image
            },
            callToProjects {
                heading,
                text,
                featuredProjects[]->{
                    title,
                    images[0],
                    year
                }
            }
        }
    `);

    if (!data) {
        return {
            callToAbout: { heading: "", text: "" },
            callToProjects: { heading: "", text: "", featuredProjects: [] },
        };
    }

    const formattedProjects: FeaturedProject[] =
        data.callToProjects?.featuredProjects?.map((project: FeaturedProject) => ({
            ...project,
            imageUrl: project.images ? urlFor(project.images).width(1000).url() : undefined,
        })) ?? [];

    return {
        callToAbout: data.callToAbout,
        callToProjects: {
            ...data.callToProjects,
            featuredProjects: formattedProjects,
        },
    };
}

export default async function Home() {
    const data = await getHomePage();

    return (
        <>
            <Hero />
            <div className="relative z-[9999]">
                <CallToAbout data={data.callToAbout} />
                <CallToProjects data={data.callToProjects} />
            </div>
            <FooterWithClient />
        </>
    );
}