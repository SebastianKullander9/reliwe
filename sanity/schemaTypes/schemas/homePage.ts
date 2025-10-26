import { defineType, defineField } from "sanity";

export const homePage = defineType({
    name: "homePage",
    title: "Startsida",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel (intern)",
            type: "string",
            description: "Används bara internt för att identifiera dokumentet",
            initialValue: "Startsida",
            readOnly: true,
        }),

        defineField({
            name: "callToAbout",
            title: "Startsida 'Om oss'",
            type: "object",
            fields: [
                defineField({
                    name: "heading",
                    title: "Rubrik",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Text",
                    type: "text",
                    rows: 3,
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: "alt",
                            title: "Alt-text",
                            type: "string",
                        }),
                    ],
                }),
            ],
        }),

        defineField({
            name: "callToProjects",
            title: "Startsida 'Våra projekt'",
            type: "object",
            fields: [
                defineField({
                    name: "heading",
                    title: "Rubrik",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "text",
                    title: "Text",
                    type: "text",
                    rows: 3,
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "featuredProjects",
                    title: "Utvalda projekt",
                    type: "array",
                    of: [
                        {
                            type: "reference",
                            to: [{ type: "estateProject" }],
                        },
                    ],
                }),
            ],
        }),
    ],
});