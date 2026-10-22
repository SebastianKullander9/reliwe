import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/react";

type SanityImage = {
    asset: SanityImageSource;
    alt?: string;
};

export type Project = {
    title: string;
    text: any[];
    year: string;
    movingInYear: string;
    apartmentAmount: string;
    roomAmount: string;
    imgUrls: string[];
    images?: SanityImage[];
    status: "ongoing" | "done" | "planned";
    slug: string;
    hasSubpage?: boolean;
};

type InfoBox = {
    subtitle?: string;
    ownershipType?: string;
    constructionStart?: string;
    movingIn?: string;
    apartmentAmount?: string;
    roomAmount?: string;
};

type IntroSection = {
    title?: string;
    image?: SanityImage;
    text?: string;
    infobox?: InfoBox;
};

type Section = {
    title?: string;
    /** Rich text content. Takes precedence over the legacy `text` field. */
    content?: PortableTextBlock[];
    /** Legacy plain text, rendered only when `content` is empty. */
    text?: string;
    image?: SanityImage;
    imagePosition: "left" | "right";
};

export type ProjectWithSubpage = Project & {
    hasSubpage: true;
    subpage: {
        title?: string;
        heroImage?: SanityImage;
        availableRooms?: number[];
        availableHousingTypes?: string[];
        intro?: IntroSection;
        sections?: Section[];
		gallery?: SanityImage[];
    };
};