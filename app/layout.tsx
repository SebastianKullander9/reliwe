import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieBanner from "@/components/ui/cookies/CookieBanner";
import SmoothScroll from "@/components/ui/smoothScroll/SmoothScroll";
import { ProjectFilterProvider } from "@/components/context/ProjectFilterContext";

export const metadata: Metadata = {
    title: "Reliwe",
    description:
        "Vi utvecklar miljömärkta fastigheter med fokus på innovation och hållbarhet. Samtliga projekt uppfyller energiklass B för hög energieffektivitet...",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-visual',
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;

    return (
        <html lang="sv">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<ProjectFilterProvider>
				<body className="antialiased">
					<SmoothScroll />
					{children}
					<CookieBanner gaId={GA_ID} />
				</body>
			</ProjectFilterProvider>
        </html>
    );
}