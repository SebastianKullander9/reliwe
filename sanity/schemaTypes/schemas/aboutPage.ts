import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
    name: "aboutPage",
    title: "Om oss",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel (intern)",
            type: "string",
            initialValue: "Om oss",
            readOnly: true,
        }),

        defineField({
            name: "introBanner",
            title: "Intro Banner",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Titel", type: "string" }),
                defineField({
                    name: "texts",
                    title: "Texter",
                    type: "array",
                    of: [{ type: "text" }],
                    validation: (Rule) => Rule.min(1).required(),
                }),
                defineField({
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: { hotspot: true },
                    fields: [{ name: "alt", title: "Alt-text", type: "string" }],
                }),
            ],
        }),

        defineField({
            name: "intro",
            title: "Sektion 1",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Titel", type: "string" }),
                defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
                defineField({
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: { hotspot: true },
                    fields: [{ name: "alt", title: "Alt-text", type: "string" }],
                }),
            ],
        }),

        defineField({
            name: "scrollSections",
            title: "Rullande sektioner (4 st)",
            description: "De fyra sektionerna som visas i den fästa rull-animationen under intro-sektionen.",
            type: "array",
            of: [
                defineField({
                    name: "scrollSection",
                    title: "Sektion",
                    type: "object",
                    fields: [
                        defineField({ name: "title", title: "Titel", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "text", title: "Text", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
                    ],
                    preview: {
                        select: { title: "title", subtitle: "text" },
                    },
                }),
            ],
            validation: (Rule) => Rule.length(4).required(),
        }),

        defineField({
            name: "backgroundSections",
            title: "Bakgrundssektioner",
            description: "Sektionerna längst ner på sidan. Lägg till, ta bort eller ändra ordning på dem här.",
            type: "array",
            of: [
                defineField({
                    name: "backgroundSection",
                    title: "Sektion",
                    type: "object",
                    fields: [
                        defineField({ name: "title", title: "Titel", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({
                            name: "texts",
                            title: "Texter (ett stycke per rad)",
                            type: "array",
                            of: [{ type: "text" }],
                            validation: (Rule) => Rule.min(1).required(),
                        }),
                        defineField({
                            name: "image",
                            title: "Bild (valfri)",
                            description: "Utan bild visas sektionen som centrerad text.",
                            type: "image",
                            options: { hotspot: true },
                            fields: [{ name: "alt", title: "Alt-text", type: "string" }],
                        }),
                        defineField({
                            name: "imagePosition",
                            title: "Bildens placering",
                            description: "Gäller på surfplatta och dator. På mobil visas bilden alltid ovanför texten.",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Bild till vänster", value: "left" },
                                    { title: "Bild till höger", value: "right" },
                                ],
                                layout: "radio",
                                direction: "horizontal",
                            },
                            initialValue: "left",
                            hidden: ({ parent }) => !parent?.image,
                        }),
                        defineField({
                            name: "button",
                            title: "Knapp (valfri)",
                            type: "object",
                            options: { collapsible: true, collapsed: true },
                            fields: [
                                defineField({ name: "label", title: "Text", type: "string" }),
                                defineField({
                                    name: "link",
                                    title: "Länk",
                                    description: "Intern sida, t.ex. /projekt, eller fullständig adress, t.ex. https://exempel.se",
                                    type: "string",
                                    validation: (Rule) =>
                                        Rule.custom((value) => {
                                            if (!value) return true;
                                            return /^(\/|https?:\/\/|mailto:|tel:)/.test(value)
                                                ? true
                                                : "Länken måste börja med /, https://, mailto: eller tel:";
                                        }),
                                }),
                            ],
                            validation: (Rule) =>
                                Rule.custom((value?: { label?: string; link?: string }) => {
                                    if (!value || (!value.label && !value.link)) return true;
                                    if (!value.label) return "Knappen behöver en text";
                                    if (!value.link) return "Knappen behöver en länk";
                                    return true;
                                }),
                        }),
                    ],
                    preview: {
                        select: { title: "title", subtitle: "texts.0", media: "image" },
                    },
                }),
            ],
            validation: (Rule) => Rule.min(1).required(),
        }),
    ],
});