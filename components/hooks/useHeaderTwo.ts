import { useEffect, useRef, useState } from "react";
import { HeaderVariantConfig } from "../ui/headers/newHeader/header.types";
import type { MouseEvent } from "react";

export function useHeaderTwo(variant: HeaderVariantConfig) {
	//const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	const lastDirectionChangeY = useRef(0); 
	const lastScrollY = useRef(0);
	const scrollDirection = useRef<"up" | "down">("down");
	const windowHeightRef = useRef<number>(0);

	const { initial, scrolled, scrollThreshold, headerHeight } = variant;
	const [state, setState] = useState(initial);

	const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
	const isDropdownOpen = openSubMenu !== null;

	const toggleSubMenu = (id: string, e?: MouseEvent<HTMLAnchorElement>) => {
		e?.preventDefault();

		setOpenSubMenu((prev) => (prev === id ? null : id));
	};

	const closeSubMenu = () => setOpenSubMenu(null);

	useEffect(() => {
		const updateHeight = () => (windowHeightRef.current = window.innerHeight);
		updateHeight();
		window.addEventListener("resize", updateHeight);
		return () => window.removeEventListener("resize", updateHeight);
	}, []);

	useEffect(() => {
		if (!scrolled) return;

		if (isDropdownOpen) {
			setState(scrolled);
		} else if (window.scrollY === 0) {
			setState(initial);
		}
	}, [isDropdownOpen, scrolled, initial]);

	useEffect(() => {
		if (isDropdownOpen) return;

		const onScroll = () => {
			if (isDropdownOpen) return;

			const currentY = window.scrollY;
			const viewportHeight = windowHeightRef.current || window.innerHeight;
			const headerHeight = 94;

			const shouldUseScrolledState = isDropdownOpen || window.scrollY > 0;
			setState(shouldUseScrolledState ? scrolled ?? initial : initial);

			if (currentY < viewportHeight - headerHeight) {
				setIsVisible(true);
				lastDirectionChangeY.current = currentY;
				lastScrollY.current = currentY;
				return;
			}

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
	}, [isDropdownOpen, isVisible]);

	return { state, isVisible, isDropdownOpen, openSubMenu, toggleSubMenu, closeSubMenu, headerHeight };
}