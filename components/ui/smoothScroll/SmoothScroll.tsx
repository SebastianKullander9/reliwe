"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
	const pathname = usePathname();
	const [key, setKey] = useState(0);
	// Sanity Studio scrolls its own panes; a root Lenis instance would swallow their wheel events.
	const isStudio = pathname.startsWith("/studio");

	useEffect(() => {
		if (isStudio) return;

		// Force remount of ReactLenis component on route change
		setKey(prev => prev + 1);
		
		// Also reset native scroll, unless the URL targets a section (handled by ScrollToHash)
		if (!window.location.hash) {
			window.scrollTo(0, 0);
		}
	}, [pathname, isStudio]);

	if (isStudio) return null;

	return (
		<ReactLenis 
			key={key}
			root 
			options={{ lerp: 0.5, duration: 1 }} 
		/>
	);
}