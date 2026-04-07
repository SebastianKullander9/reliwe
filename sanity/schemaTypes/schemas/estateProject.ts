import { defineType, defineField } from "sanity";

export const estateProject = defineType({
    name: "estateProject",
    title: "Fastighetsprojekt",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Projekttitel",
            type: "string",
            validation: Rule => Rule.required().error("Projekttitel krävs"),
            description: "t.ex. 'Ekängen, Lidköping'"
        }),
        defineField({
            name: "text",
            title: "Beskrivning",
            type: "text",
            rows: 4,
            validation: Rule => Rule.required().error("Beskrivning krävs")
        }),
        defineField({
            name: "year",
            title: "År",
            type: "string",
            description: "Projektår"
        }),
        defineField({
            name: "apartmentAmount",
            title: "Antal lägenheter",
            type: "string",
            description: "Totalt antal lägenheter"
        }),
        defineField({
            name: "movingInYear",
            title: "Inflyttningsår",
            type: "string",
            description: "Förväntat inflyttningsår"
        }),
        defineField({
            name: "roomAmount",
            title: "Antal rum",
            type: "string",
            description: "t.ex. '1-4' för 1 till 4 rum"
        }),
        defineField({
            name: "images",
            title: "Projektbilder",
            type: "array",
            of: [{ 
                type: "image",
                options: {
                    hotspot: true
                },
                fields: [
                    {
                        name: "alt",
                        type: "string",
                        title: "Alternativ text",
                        description: "Beskrivning av bilden för sökmotorer och tillgänglighet"
                    }
                ]
            }],
            validation: Rule => Rule.required().error("Minst en bild krävs")
        }),
        defineField({
            name: "status",
            title: "Projekt Status",
            type: "string",
            options: {
                list: [
                    { title: "Planerade", value: "planned" },
                    { title: "Pågående", value: "ongoing" },
                    { title: "Genomförda", value: "done" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required().error("Projektstatus krävs.")
        }),
        defineField({
            name: "sortOrder",
            title: "Sorteringsordning",
            type: "number",
            description: "Lägre nummer visas först. Används för manuell sortering.",
            validation: Rule => Rule.min(0)
        }),
        defineField({
            name: "hasSubpage",
            title: "Har undersida?",
            type: "boolean",
            initialValue: false
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { 
                source: "title",
                slugify: (input) =>
                    input
                        .toLowerCase()
                        .replace(/å/g, "a")
                        .replace(/ä/g, "a")
                        .replace(/ö/g, "o")
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)+/g, "")
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "subpage",
            title: "Undersida",
            type: "object",
            description: "Valfri undersida med extra information",
            hidden: ({ document }) => !document?.hasSubpage,
            fields: [
                {
                    name: "heroImage",
                    title: "Hero-bild",
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Alternativ text",
                            type: "string"
                        }
                    ]
                },
				{
					name: "intro",
					title: "Introduktionssektion",
					type: "object",
					fields: [
						{
							name: "title",
							title: "Undersidans titel",
							type: "string",
							description: "Om tom används projekttitel"
						},
						{
							name: "image",
							title: "Bild",
							type: "image",
							options: { hotspot: true },
							fields: [
								{
									name: "alt",
									title: "Alternativ text",
									type: "string"
								}
							]
						},
						{
							name: "text",
							title: "Textblock",
							type: "text",
							rows: 4
						},
						{
							name: "infobox",
							title: "Infobox",
							type: "object",
							fields: [
								{
									name: "subtitle",
									title: "Undertitel",
									type: "string",
									description: "Visas som: Undertitel: <värde>"
								},
								{
									name: "constructionStart",
									title: "Byggstart",
									type: "string",
									description: "Visas som: Byggstart: <värde>"
								},
								{
									name: "movingIn",
									title: "Inflyttning",
									type: "string",
									description: "Visas som: Inflyttning: <värde>"
								},
								{
									name: "apartmentAmount",
									title: "Antal lägenheter",
									type: "string",
									description: "Visas som: Antal lägenheter: <värde>"
								},
								{
									name: "roomAmount",
									title: "Antal rum",
									type: "string",
									description: "Visas som: Antal rum: <värde>"
								},
							]
						}
					]
				},
                {
                    name: "sections",
                    title: "Sektioner",
                    type: "array",
                    of: [
                        {
                            type: "object",
                            title: "Sektion",
                            fields: [
                                {
                                    name: "title",
                                    title: "Rubrik",
                                    type: "string"
                                },
                                {
                                    name: "text",
                                    title: "Textblock",
                                    type: "text",
                                    rows: 4,
                                    validation: Rule => Rule.required().error("Text krävs")
                                },
                                {
                                    name: "image",
                                    title: "Bild",
                                    type: "image",
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: "alt",
                                            title: "Alternativ text",
                                            type: "string"
                                        }
                                    ]
                                },
								{
									name: "imagePosition",
									title: "Bildposition",
									type: "string",
									options: {
										list: [
											{ title: "Vänster", value: "left" },
											{ title: "Höger", value: "right" },
										],
										layout: "radio"
									},
									initialValue: "right"
								}
                            ],
                            preview: {
                                select: { title: "title", text: "text" },
                                prepare({ title, text }) {
                                    return {
                                        title: title || "Namnlös sektion",
                                        subtitle: text?.slice(0, 60) + (text?.length > 60 ? "…" : "")
                                    }
                                }
                            }
                        }
                    ]
                },
				{
					name: "availableRooms",
					title: "Tillgängliga rumsalternativ",
					type: "array",
					of: [{ type: "number" }],
					options: {
						list: [
							{ title: "1 rok", value: 1 },
							{ title: "2 rok", value: 2 },
							{ title: "3 rok", value: 3 },
							{ title: "4 rok", value: 4 },
							{ title: "5 rok", value: 5 },
							{ title: "6 rok", value: 6 },
							{ title: "7 rok", value: 7 },
							{ title: "8 rok", value: 8 },
							{ title: "9 rok", value: 9 },
							{ title: "10 rok", value: 10 },
						],
						layout: "grid"
					},
					description: "Välj vilka rumsalternativ som ska visas som valbara knappar i intresseanmälningsformuläret",
					validation: Rule => Rule.required().min(1).error("Minst ett rumsalternativ krävs")
				},
            ]
        }),
    ],
    preview: {
        select: {
            title: "title",
            year: "year",
            media: "images.0"
        },
        prepare(selection) {
            const { title, year, media } = selection
            return {
                title: title,
                subtitle: year ? `År: ${year}` : "Inget år angivet",
                media: media
            }
        }
    }
})