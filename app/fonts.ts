import localFont from "next/font/local";

export const americana = localFont({
    src: [
        {
            path: "../public/fonts/americanabt_roman.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/americanabt_roman.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
});