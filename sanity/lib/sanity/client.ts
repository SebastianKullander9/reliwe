import { createClient } from "next-sanity";

export const client = createClient({
    projectId: 'n9oevgvc', // find this in sanity.config.ts or sanity.cli.ts
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true, // set to true for faster, cached responses in production
});