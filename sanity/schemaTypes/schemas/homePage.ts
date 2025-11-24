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

		defineField({
            name: "keyNumbers",
            title: "Nyckeltal",
            type: "object",
            fields: [
                defineField({
                    name: "heading",
                    title: "Rubrik",
                    type: "string",
                    initialValue: "Våra nyckeltal",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "description",
                    title: "Beskrivning",
                    type: "text",
                    rows: 3,
                    initialValue: "Våra nyckeltal speglar en stabil och långsiktig utveckling. Med en stark projektportfölj och god finansiell ställning fortsätter vi att skapa hållbara bostäder och värde för både kunder och samhälle.",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card1Title",
                    title: "Kort 1 - Titel",
                    type: "string",
                    initialValue: "Bostäder under produktion",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card1Number",
                    title: "Kort 1 - Nummer",
                    type: "string",
                    initialValue: "2100",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card2Title",
                    title: "Kort 2 - Titel",
                    type: "string",
                    initialValue: "Planerade byggstarter",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card2Number",
                    title: "Kort 2 - Nummer",
                    type: "string",
                    initialValue: "1500",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card3Title",
                    title: "Kort 3 - Titel",
                    type: "string",
                    initialValue: "resultat 2025",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card3Number",
                    title: "Kort 3 - Nummer",
                    type: "string",
                    initialValue: "112 mkr",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card4Title",
                    title: "Kort 4 - Titel",
                    type: "string",
                    initialValue: "soliditet 2025",
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: "card4Number",
                    title: "Kort 4 - Nummer",
                    type: "string",
                    initialValue: "87%",
                    validation: (Rule) => Rule.required(),
                }),
            ],
        }),
    ],
});