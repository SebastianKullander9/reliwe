import About from "@/components/sections/about/About";
import Footer from "@/components/ui/footer/Footer";
import { client } from "@/sanity/lib/client";

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
        ourVision,
        ourRole,
        sustainability[]{
            image{
                asset->{
                    url
                },
                alt
            },
            title,
            text
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