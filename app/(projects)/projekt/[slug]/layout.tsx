import Header from "@/components/ui/headers/Header";

export default function SlugLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header variant="default"/>
			{children}
		</>
	);
}