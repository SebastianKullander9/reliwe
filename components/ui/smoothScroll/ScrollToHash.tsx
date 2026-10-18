"use client";

import { useEffect } from "react";
import { afterLayout, scrollToAnchor } from "./scrollToAnchor";

/** Jumps to the section in the URL hash (e.g. /om-oss#lewa-bostad) when the page opens. */
export default function ScrollToHash() {
	useEffect(() => {
		const jump = () => {
			const id = decodeURIComponent(window.location.hash.slice(1));
			if (id) scrollToAnchor(id);
		};

		const cancel = afterLayout(jump);

		// On a full page load, images and fonts can still shift the layout; jump again once they're in.
		if (document.readyState !== "complete") {
			window.addEventListener("load", jump, { once: true });
		}
		window.addEventListener("hashchange", jump);

		return () => {
			cancel();
			window.removeEventListener("load", jump);
			window.removeEventListener("hashchange", jump);
		};
	}, []);

	return null;
}
