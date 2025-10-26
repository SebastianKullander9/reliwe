import Contact from "@/components/sections/contact/Contact";
import { client } from "@/sanity/lib/client";

export default async function Kontakt() {
    const contactData = await client.fetch(`*[_type == "contactPage"][0]{
        introBanner{
            title,
            texts
        },
        contactInfo{
            email,
            address{
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
    }`);

    return (
        <>
            <Contact content={contactData} />
        </>
    );
}