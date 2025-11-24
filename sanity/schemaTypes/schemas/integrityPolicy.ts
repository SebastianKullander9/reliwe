import { defineField, defineType } from "sanity"

export const integrityPage = defineType({
    name: "integrityPolicy",
    title: "Integritetspolicy",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "sections",
            title: "Sektioner",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Sektion titel",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "content",
                            title: "Innehåll",
                            type: "array",
                            of: [
                                {
                                    type: "block",
                                    styles: [
                                        { title: "Normal", value: "normal" },
                                        { title: "H2", value: "h2" },
                                        { title: "H3", value: "h3" },
                                    ],
                                    marks: {
                                        decorators: [
                                            { title: "Fet", value: "strong" },
                                            { title: "Kursiv", value: "em" },
                                        ],
                                    },
                                },
                            ],
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                        },
                        prepare({ title }) {
                            return {
                                title: title || "Sektion utan titel",
                            }
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
})