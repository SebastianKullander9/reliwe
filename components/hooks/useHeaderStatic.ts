import { useEffect, useRef, useState } from "react";
import { HeaderVariantConfig } from "../ui/headers/newHeader/header.types";

export function useHeaderStatic(variant: HeaderVariantConfig) {
	const [isVisible, setIsVisible] = useState(true);
	const isProgrammaticScroll = useRef(false);

	const lastDirectionChangeY = useRef(0); 
	const lastScrollY = useRef(0);
	const scrollDirection = useRef<"up" | "down">("down");

	const { initial, scrolled, headerHeight } = variant;
	const [state, setState] = useState(initial);

	useEffect(() => {
		const onScroll = () => {
			if (isProgrammaticScroll.current) {
				return;
			}

			const currentY = window.scrollY;
			const scrollThreshold = 25;

			const shouldUseScrolledState = window.scrollY > 0;
			setState(shouldUseScrolledState ? scrolled ?? initial : initial);

			const delta = currentY - lastScrollY.current;
			const newDirection: "up" | "down" = delta > 0 ? "down" : delta < 0 ? "up" : scrollDirection.current;

			if (newDirection !== scrollDirection.current) {
				scrollDirection.current = newDirection;
				lastDirectionChangeY.current = currentY;
			}

			const distance = currentY - lastDirectionChangeY.current;

			if (newDirection === "down" && distance > scrollThreshold && isVisible) {
				setIsVisible(false);
			} else if (newDirection === "up" && distance < -scrollThreshold && !isVisible) {
				setIsVisible(true);
			}

			lastScrollY.current = currentY;
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [isVisible, scrolled, initial]);

	const disableHeaderDetection = () => {
		isProgrammaticScroll.current = true;
	};

	const enableHeaderDetection = () => {
		isProgrammaticScroll.current = false;
	};

	return { 
		state, 
		isVisible, 
		headerHeight, 
		disableHeaderDetection, 
		enableHeaderDetection 
	};
}