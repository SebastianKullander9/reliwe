"use client";

import { useEffect } from "react";

/**
 * Overrides the <body> background color while this page is mounted.
 *
 * The contact page has no Footer, so its last section's background is the
 * true bottom of the document. On iOS, the newer translucent bottom bar can
 * reveal a sliver of whatever the <body> background is behind it, no matter
 * how tall we make the section. Matching <body> to the section color makes
 * that sliver invisible instead of chasing the exact viewport math.
 */
export default function BodyBackground({ color }: { color: string }) {
	useEffect(() => {
		const previous = document.body.style.backgroundColor;
		document.body.style.backgroundColor = color;

		return () => {
			document.body.style.backgroundColor = previous;
		};
	}, [color]);

	return null;
}
