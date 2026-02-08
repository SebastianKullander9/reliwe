import HeaderStatic from "@/components/ui/headers/newHeader/HeaderStatic";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<HeaderStatic />
			{children}
		</>
	);
}