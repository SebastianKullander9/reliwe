import IntroBanner from "@/components/ui/introBanner/IntroBanner";
import Intro from "./Intro";
import OurVision from "./OurVision";
import OurRole from "./OurRole";
import Sustainability from "./sustainability/Sustainability";

export default function About() {
    return (
        <section>
            <IntroBanner 
                title="Ett hem för livet"
                texts={["Vi skapar bostäder som människor kan trivas i - oavsett om det är bostadsrätter eller hyresrätter. Med fokus på kvalitet, hållbarhet och långsiktighet vill vi göra livet enklare och tryggare för våra boende."]}
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