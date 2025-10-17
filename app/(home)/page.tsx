import CallToAbout from "@/components/sections/Home/CallToAbout";
import CallToProjects from "@/components/sections/Home/CallToProjects";
import Hero from "@/components/sections/Home/Hero";
import FooterWithClient from "@/components/ui/footer/FooterWithClient";

export default function Home() {
    return (
        <>
            <Hero />
            <CallToAbout />
            <CallToProjects />
            <FooterWithClient />
        </>
    );
}
