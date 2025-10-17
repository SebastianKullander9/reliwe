import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Intro from "./Intro";
import OurVision from "./OurVision";
import OurRole from "./OurRole";
import Sustainability from "./sustainability/Sustainability";

export default function About() {
    return (
        <section>
            <IntroBanner 
                title="Hem att trivas i"
                texts={[
                    `Vi skapar bostäder där människor kan trivas - oavsett om det är
                    bostadsrätt eller hyresrätt. Våra projekt planeras med omtanke, kvalitet i varje
                    detalj och långsiktigt värde, för att göra vardagen enklare och tryggare för våra
                    boende.`
                ]}
                imgUrl="/site-images/om-oss.jpg"
                imgAlt="Image of a couple drinking coffé and looking happy togheter"
                screenReaderH1="About us"
            />
            <Intro />
            <OurVision />
            <OurRole />
            <Sustainability />
        </section>
    )
}