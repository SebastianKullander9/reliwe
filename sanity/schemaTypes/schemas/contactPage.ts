import { defineType, defineField } from "sanity";

export const contactPage = defineType({
    name: "contactPage",
    title: "Kontakt",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Titel (intern)",
            type: "string",
            initialValue: "Kontakt",
            readOnly: true,
        }),

        defineField({
            name: "introBanner",
            title: "Intro Banner",
            type: "object",
            fields: [
                defineField({ 
                    name: "title", 
                    title: "Titel", 
                    type: "string",
                    initialValue: "Hur kan vi hjälpa till?"
                }),
                defineField({
                    name: "texts",
                    title: "Texter",
                    type: "array",
                    of: [{ type: "text" }],
                    validation: (Rule) => Rule.min(1).required(),
                }),
            ],
        }),

        defineField({
            name: "contactInfo",
            title: "Kontaktinformation",
            type: "object",
            fields: [
                defineField({
                    name: "email",
                    title: "E-post",
                    type: "string",
                    validation: (Rule) => Rule.required().email(),
                }),
                defineField({
					name: "address1",
					title: "Besöksadress 1",
					type: "object",
					fields: [
						defineField({
							name: "street",
							title: "Gatuadress",
							type: "string",
						}),
						defineField({
							name: "city",
							title: "Stad och postnummer",
							type: "string",
						}),
					],
				}),
				defineField({
					name: "address2",
					title: "Besöksadress 2",
					type: "object",
					fields: [
						defineField({
							name: "street",
							title: "Gatuadress",
							type: "string",
						}),
						defineField({
							name: "city",
							title: "Stad och postnummer",
							type: "string",
						}),
					],
				}),
                defineField({
                    name: "image",
                    title: "Bild",
                    type: "image",
                    options: { hotspot: true },
                    fields: [{ 
                        name: "alt", 
                        title: "Alt-text", 
                        type: "string",
                        initialValue: "Illustration of a tree with a matching color scheme for reliwe"
                    }],
                }),
            ],
        }),
    ],
});