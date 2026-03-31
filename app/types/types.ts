import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Project = {
	title: string;
	text: string;
	year: string;
	movingInYear: string;
	apartmentAmount: string;
	roomAmount: string;
	imgUrls: string[];
    images?: SanityImageSource[];
	status: "ongoing" | "done" | "planned";
	slug: string;
	hasSubpage?: boolean;
	subpage?: {
		title?: string;
		textBlocks?: string[];
	};
};