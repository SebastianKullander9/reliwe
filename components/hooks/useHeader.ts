"use client";

import { useEffect, useState, useRef } from "react";
import { HeaderVariantConfig } from "../ui/headers/newHeader/header.types";

export function useHeader(variant: HeaderVariantConfig) {
	const { initial, scrolled, scrollCutoff = 0 } = variant;

	const [state, setState] = useState(initial);
	const [isVisible, setIsVisible] = useState(true);
	const prevScroll = useRef(0);

	useEffect(() => {
		if (!scrolled) return;

		const onScroll = () => {
			const currentScroll = window.scrollY;

			setState(currentScroll > scrollCutoff ? scrolled : initial);

			const hideThreshold = scrollCutoff + 100;

			if (
				currentScroll > prevScroll.current &&
				currentScroll > hideThreshold
			) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			prevScroll.current = currentScroll;
		};

		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [initial, scrolled, scrollCutoff]);

	return { state, isVisible };
}