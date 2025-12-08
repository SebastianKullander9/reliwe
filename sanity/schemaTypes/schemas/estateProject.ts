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