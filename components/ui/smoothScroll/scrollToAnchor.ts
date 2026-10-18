import type { MouseEvent } from "react";

/** Jumps straight to the element, skipping the smooth scroll through everything in between. */
export function scrollToAnchor(id: string) {
	const element = document.getElementById(id);
	if (!element) return false;

	const top = element.getBoundingClientRect().top + window.scrollY;
	window.scrollTo({ top, behavior: "instant" });
	return true;
}

/** Runs after the next two frames, so layout (GSAP pins, Lenis, scroll locks) has settled. */
export function afterLayout(callback: () => void) {
	let frame = requestAnimationFrame(() => {
		frame = requestAnimationFrame(callback);
	});
	return () => cancelAnimationFrame(frame);
}

/**
 * Click handler for links like "/om-oss#lewa-bostad". Navigating from another page is
 * handled by ScrollToHash; on the same page Next.js only updates the URL, so jump here.
 */
export function handleAnchorLinkClick(href: string, e: MouseEvent<HTMLAnchorElement>, beforeScroll?: () => void) {
	const url = new URL(href, window.location.origin);
	if (!url.hash || url.pathname !== window.location.pathname) return;

	e.preventDefault();
	window.history.pushState(null, "", href);
	beforeScroll?.();
	afterLayout(() => scrollToAnchor(decodeURIComponent(url.hash.slice(1))));
}
