import { HeaderVariantConfig } from "./header.types";
import ButtonBorder from "../../buttons/newButtons/ButtonBorder";
import ButtonBackground from "../../buttons/newButtons/ButtonBackground";

const headerHeight = 84;
const scrollThreshold = 25;

export const headerVariants: Record<"home" | "default", HeaderVariantConfig> = {
	home: {
		initial: {
			background: "transparent",
			textColor: "#faf7f5",
			button: ButtonBorder,
			hamburgerColor: "#faf7f5",
			logoSrc: "/logo/reliwe-logo-offwhite.png"
		},
		scrolled: {
			background: "#faf7f5",
			textColor: "#000",
			button: ButtonBackground,
			hamburgerColor: "#000",
			logoSrc: "/logo/reliwe-logo-black.png"
		},
		scrollThreshold: scrollThreshold,
		headerHeight: headerHeight,
	},

	default: {
		initial: {
			background: "#faf7f5",
			textColor: "#000",
			button: ButtonBackground,
			hamburgerColor: "#000",
			logoSrc: "/logo/reliwe-logo-offwhite.png"
		},
		scrollThreshold: scrollThreshold,
		headerHeight: headerHeight,
	},
}