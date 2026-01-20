import Header from "@/components/ui/headers/Header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header 
                startBackground="" 
                scrolledBackground="#1f5d37" 
                startTextColor="#faf7f5"
                scrolledTextColor="#faf7f5"
                colorCutoff={1}
                btnScrollChange={true}
            />
			{children}
        </>
    );
}