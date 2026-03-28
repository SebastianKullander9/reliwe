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
					name: "title",
					title: "Undersidans titel",
					type: "string",
					description: "Om tom används projekttitel"
				},
				{
					name: "textBlocks",
					title: "Text block",
					type: "array",
					of: [{ type: "text" }],
					validation: Rule => Rule.max(3)
				}
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