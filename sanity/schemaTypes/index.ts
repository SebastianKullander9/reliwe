import { type SchemaTypeDefinition } from "sanity";
import { estateProject } from "./schemas/estateProject";
import { homePage } from "./schemas/homePage";
import { projectsPage } from "./schemas/projectsPage";
import { aboutPage } from "./schemas/aboutPage";
import { contactPage } from "./schemas/contactPage";
import { integrityPage } from "./schemas/integrityPolicy";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        estateProject, 
        homePage,
        projectsPage,
		aboutPage,
        contactPage,
		integrityPage,
    ]
}
