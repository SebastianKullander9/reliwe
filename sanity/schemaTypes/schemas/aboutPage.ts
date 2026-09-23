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
                    ],
                    preview: {
                        select: { title: "title", subtitle: "texts.0" },
                    },
                }),
            ],
            validation: (Rule) => Rule.min(1).required(),
        }),
    ],
});