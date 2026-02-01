//import Header from "@/components/ui/headers/Header";
import Header from "@/components/ui/headers/newHeader/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
			{children}
        </>
    );
}