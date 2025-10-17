import Header from "@/components/ui/headers/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header 
                startBackground="" 
                scrolledBackground="#faf7f5" 
                startTextColor="#d8e6dc"
                scrolledTextColor="black"
                colorCutoff={1}
                btnScrollChange={true}
            />
            {children}
        </>
    );
}