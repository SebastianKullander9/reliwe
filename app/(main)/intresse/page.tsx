import { client } from "@/sanity/lib/client";
import IntressePageForm from "@/components/ui/forms/IntressePageForm";
import Footer from "@/components/ui/footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Intresseanmälan - Reliwe",
	description: "Anmäl ditt intresse för Reliwes projekt och få mer information direkt till dig.",
};

export default async function IntressePage() {
	const projects = await client.fetch<{ _id: string; title: string; slug: string | null }[]>(
		`*[_type=="estateProject"] | order(title asc) { _id, title, "slug": slug.current }`,
		{},
		{ next: { revalidate: 3600 } }
	);

	return (
		<>
			<main className="pt-32 pb-24 body-x-padding">
				<div className="xl:container mx-auto max-w-3xl">
					<IntressePageForm projects={projects} />
				</div>
			</main>
			<Footer />
		</>
	);
}
