import OurProjects from "@/components/sections/ourProjects/OurProjects";
import HeaderStatic from "@/components/ui/headers/HeaderStatic";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Våra projekt - Reliwe",
	description: "Utforska Reliwes pågående och avslutade projekt. Hållbara fastigheter med fokus på energiklass B och moderna lösningar."
};

export default function VaraProjekt() {
    return (
        <>
			<HeaderStatic />
            <div className="relative z-2">
                <OurProjects />
            </div>
        </>
    );
}