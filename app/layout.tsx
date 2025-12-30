import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/ui/cookies/CookieBanner";

export const metadata: Metadata = {
    title: "Reliwe",
    description:
        "Vi utvecklar miljömärkta fastigheter med fokus på innovation och hållbarhet. Samtliga projekt uppfyller energiklass B för hög energieffektivitet...",
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;

    return (
        <html lang="sv">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
            <body className="antialiased">
                {children}
                <CookieBanner gaId={GA_ID} />
            </body>
        </html>
    );
}