import IntegrityPolicy from "@/components/sections/integrityPolicy/IntegrityPolicy";
import Footer from "@/components/ui/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Integritetspolicy - Reliwe",
	description: "Läs Reliwes integritetspolicy för information om hur vi hanterar personuppgifter och säkerställer dataskydd för våra kunder och besökare."
};

export default function IntegritetsPolicy() {
    return (
        <>
			<div className="relative z-2">
				<IntegrityPolicy />
			</div>
			<Footer />
        </>
    )
};