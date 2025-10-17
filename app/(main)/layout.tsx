import Header from "@/components/ui/headers/Header";
import Footer from "@/components/ui/footer/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header 
                startBackground="#cddbd3" 
                scrolledBackground="#faf7f5"
                startTextColor="black"
                scrolledTextColor="black"
                colorCutoff={1} 
            />
            {children}
        </>
    );
}