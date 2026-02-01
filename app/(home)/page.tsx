import CallToAbout from "@/components/sections/Home/CallToAbout";
import CallToProjects from "@/components/sections/Home/CallToProjects";
import Hero from "@/components/sections/Home/Hero";
//import KeyNumbers from "@/components/sections/Home/KeyNumbers";
import KeyNumbersTwo from "@/components/sections/Home/KeyNumbersTwo";
import Interest from "@/components/sections/interest/Interest";
import FooterTwo from "@/components/ui/footer/FooterTwo";
import FooterWithClient from "@/components/ui/footer/FooterWithClient";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Metadata } from "next";

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
    `, {}, { next: { revalidate: 0 } });

    if (!data) {
        return {
            callToAbout: { heading: "", text: "" },
            callToProjects: { heading: "", text: "", featuredProjects: [] },
        };
    }

    const formattedProjects: FeaturedProject[] =
        data.callToProjects?.featuredProjects?.map((project: FeaturedProject) => ({
            ...project,
            imageUrl: project.images ? urlFor(project.images).width(2000).quality(95).auto("format").url() : undefined,
        })) ?? [];

    return {
        callToAbout: data.callToAbout,
        callToProjects: {
            ...data.callToProjects,
            featuredProjects: formattedProjects,
        },
    };
}

export const metadata: Metadata = {
	title: "Hem - Reliwe",
	description:
		"Vi utvecklar miljömärkta fastigheter med fokus på innovation och hållbarhet. Samtliga projekt uppfyller energiklass B för hög energieffektivitet.",
};

export default async function Home() {
    const data = await getHomePage();

    return (
        <>
            <Hero />
            <div className="relative z-[9997] flex flex-col" id="gpu-scroll">
                <CallToProjects data={data.callToProjects} />
                <KeyNumbersTwo />
				<CallToAbout />
				<Interest />
            </div>
            {/*<FooterWithClient />*/}
			<FooterTwo />
        </>
    );
}