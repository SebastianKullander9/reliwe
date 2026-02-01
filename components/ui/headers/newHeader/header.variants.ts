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
			background: "#1f5d37",
			textColor: "#faf7f5",
			button: ButtonBackground,
			hamburgerColor: "#000",
			logoSrc: "/logo/reliwe-logo-offwhite.png"
		},
		scrollThreshold: scrollThreshold,
		headerHeight: headerHeight,
	},

	default: {
		initial: {
			background: "#1f5d37",
			textColor: "#faf7f5",
			button: ButtonBackground,
			hamburgerColor: "#000",
			logoSrc: "/logo/reliwe-logo-offwhite.png"
		},
		scrollThreshold: scrollThreshold,
		headerHeight: headerHeight,
	},
}