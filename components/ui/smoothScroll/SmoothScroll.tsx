"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export default function SmoothScroll() {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) return;
		lenis.stop();
		return lenis.start();
	}, [lenis]);

	return <ReactLenis root options={{ lerp: 0.5, duration: 1 }} />
};