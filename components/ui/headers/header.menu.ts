import { HeaderMenuItem } from "./header.types"

export const menuConfig: { menu: HeaderMenuItem[] } = {
	menu: [
		{
			label: "Om oss",
			href: "/om-oss",
		},
		{
			label: "Projekt",
			href: "/projekt",
			subMenu: [
				{ label: "Alla", href: "/projekt" },
				{ label: "Planerade", href: "/projekt?status=planned" },
				{ label: "Pågående", href: "/projekt?status=ongoing" },
				{ label: "Genomförda", href: "/projekt?status=done" },
			]
		},
		{
			label: "Kontakt",
			href: "/kontakt"
		}
	],
}