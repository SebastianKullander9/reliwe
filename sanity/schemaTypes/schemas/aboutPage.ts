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
            name: "ourVision",
            title: "Sektion 2",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Titel", type: "string" }),
                defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            ],
        }),

        defineField({
            name: "ourRole",
            title: "Sektion 3",
            type: "object",
            fields: [
                defineField({ name: "title", title: "Titel", type: "string" }),
                defineField({ name: "text", title: "Text", type: "text", rows: 5 }),
            ],
        }),

        defineField({
            name: "sustainability",
            title: "Hållbarhet (3 kort)",
            type: "array",
            of: [
                defineField({
                    name: "card",
                    type: "object",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Bild",
                            type: "image",
                            options: { hotspot: true },
                            fields: [{ name: "alt", title: "Alt-text", type: "string" }],
                        }),
                        defineField({ name: "title", title: "Titel", type: "string" }),
                        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
                    ],
                }),
            ],
            validation: (Rule) => Rule.length(3).required(),
        }),
    ],
});