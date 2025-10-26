import { defineType, defineField } from "sanity";

export const projectsPage = defineType({
    name: "projectsPage",
    title: "Våra projekt-sida text",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel (intern)",
            type: "string",
            description: "Används bara internt för att identifiera dokumentet",
            initialValue: "Våra projekt",
            readOnly: true,
        }),

        defineField({
            name: "introBanner",
            title: "Intro banner",
            type: "object",
            fields: [
                defineField({
                    name: "title",
                    title: "Titel",
                    type: "string",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "texts",
                    title: "Texter",
                    type: "array",
                    of: [{ type: "text" }],
                    validation: (Rule) => Rule.min(1).required(),
                }),
                defineField({
                    name: "image",
                    title: "Bakgrundsbild",
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
    ],
});