import Contact from "@/components/sections/contact/Contact";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Kontakt - Reliwe",
	description: "Kontakta Reliwe för frågor, samarbeten eller intresseanmälan. Vi finns i Stockholm och Norrköping och svarar gärna på dina frågor."
};

export default async function Kontakt() {
    const contactData = await client.fetch(`*[_type == "contactPage"][0]{
        introBanner{
            title,
            texts
        },
        contactInfo{
            email,
            address1{
                street,
                city
            },
			address2{
                street,
                city
            },
            image{
                asset->{
                    url
                },
                alt
            }
        }
    }`, {}, { next: { revalidate: 0 } });

    return (
        <>
            <Contact content={contactData} />
        </>
    );
}