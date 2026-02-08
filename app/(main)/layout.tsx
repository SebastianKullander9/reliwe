import Header from "@/components/ui/headers/newHeader/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header 
				variant="default"
            />
            {children}
        </>
    );
}