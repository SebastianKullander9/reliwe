import localFont from "next/font/local";

export const pangaia = localFont({
    src: [
        {
            path: "../public/fonts/PPPAngaia-medium.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/PPPAngaia-medium.otf",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
});