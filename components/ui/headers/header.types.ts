import { ComponentType } from "react";

export type HeaderMenuItem = {
	label: string;
	href: string;
	subMenu?: HeaderMenuItem[];
}

export type HeaderVariantConfig = {
	initial: {
		background: string;
		textColor: string;
		hamburgerColor: string;
		logoSrc: string;
	};
	scrolled?: {
		background: string;
		textColor: string;
		hamburgerColor: string;
		logoSrc: string;
	};
	scrollThreshold: number;
	headerHeight: number;
}
