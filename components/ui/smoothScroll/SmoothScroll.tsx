"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
	const pathname = usePathname();
	const [key, setKey] = useState(0);

	useEffect(() => {
		// Force remount of ReactLenis component on route change
		setKey(prev => prev + 1);
		
		// Also reset native scroll
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<ReactLenis 
			key={key}
			root 
			options={{ lerp: 0.5, duration: 1 }} 
		/>
	);
}