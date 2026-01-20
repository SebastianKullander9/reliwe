import Header from "@/components/ui/headers/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header 
                startBackground="#1f5d37" 
                scrolledBackground="#1f5d37" 
                startTextColor="#faf7f5"
                scrolledTextColor="#faf7f5"
                colorCutoff={1} 
            />
            {children}
        </>
    );
}