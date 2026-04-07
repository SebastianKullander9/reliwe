import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type SanityImage = {
    asset: SanityImageSource;
    alt?: string;
};

export type Project = {
    title: string;
    text: string;
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
    text: string;
    image?: SanityImage;
    imagePosition: "left" | "right";
};

export type ProjectWithSubpage = Project & {
    hasSubpage: true;
    subpage: {
        title?: string;
        heroImage?: SanityImage;
        availableRooms?: number[];
        intro?: IntroSection;
        sections?: Section[];
    };
};