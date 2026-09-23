import About from "@/components/sections/about/About";
import Footer from "@/components/ui/footer/Footer";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Om oss - Reliwe",
	description: "Lär känna Reliwe – vi utvecklar miljömärkta fastigheter med fokus på innovation, hållbarhet och energieffektiva lösningar."
};

export default async function OmOss() {
    const aboutData = await client.fetch(`*[_type == "aboutPage"][0]{
        introBanner{
            title,
            texts,
            image{
                asset->{
                    url
                },
                alt
            }
        },
        intro{
            title,
            text,
            image{
                asset->{
                    url
                },
                alt
            }
        },
        scrollSections[]{
            title,
            text
        },
        backgroundSections[]{
            title,
            texts
        },
        background{
            title,
            texts
        }
    }`, {}, { next: { revalidate: 0 } });

    return (
        <>
            <div className="relative z-2">
                <About content={aboutData}  />
            </div>
            <Footer />
        </>
    );
}