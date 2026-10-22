/**
 * Prefills estateProject.subpage.factCard.facts with the rows the fact card
 * currently shows (from year, movingInYear, apartmentAmount, roomAmount), and
 * removes the legacy, never rendered subpage.intro.infobox.
 *
 * Dry run (default, changes nothing):  node scripts/migrate-fact-card.mjs
 * Apply changes:                       node scripts/migrate-fact-card.mjs --write
 *
 * Requires SANITY_API_TOKEN with write access in .env.local
 */

import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";

function loadEnv() {
    try {
        const raw = readFileSync(".env.local", "utf-8");
        for (const line of raw.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const idx = trimmed.indexOf("=");
            if (idx === -1) continue;
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
            process.env[key] = process.env[key] ?? val;
        }
    } catch {
        // .env.local not found, rely on actual env vars
    }
}

loadEnv();

const write = process.argv.includes("--write");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET");
    process.exit(1);
}
if (!token) {
    console.error("Missing SANITY_API_TOKEN — add it to .env.local (needs write access)");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    token,
    useCdn: false,
});

function key() {
    return randomBytes(4).toString("hex");
}

// Same rows and labels as the fallback in components/ui/infoCard/InfoCard.tsx.
const DEFAULT_ROWS = [
    { field: "year", label: "Byggstart" },
    { field: "movingInYear", label: "Inflyttning" },
    { field: "apartmentAmount", label: "Antal lägenheter" },
    { field: "roomAmount", label: "Antal rum" },
];

async function migrate() {
    // Includes drafts (drafts.*) since the token can read them.
    const projects = await client.fetch(
        `*[_type == "estateProject" && defined(subpage)]{
            _id, title, year, movingInYear, apartmentAmount, roomAmount,
            "facts": subpage.factCard.facts,
            "hasInfobox": defined(subpage.intro.infobox)
        }`
    );

    console.log(`${write ? "WRITE" : "DRY RUN"} — found ${projects.length} estateProject document(s) with a subpage\n`);

    let prefilled = 0;
    let cleaned = 0;

    for (const project of projects) {
        const patch = client.patch(project._id);
        let changed = false;
        console.log(`  ${project._id} / "${project.title?.trim() ?? "Namnlöst projekt"}"`);

        if (project.facts?.length) {
            console.log(`    SKIP     fact card already has ${project.facts.length} row(s)`);
        } else {
            const facts = DEFAULT_ROWS
                .filter(({ field }) => project[field])
                .map(({ field, label }) => ({ _key: key(), label, value: project[field] }));

            if (facts.length) {
                patch.setIfMissing({ "subpage.factCard": {} }).set({ "subpage.factCard.facts": facts });
                changed = true;
                prefilled++;
                for (const fact of facts) console.log(`    PREFILL  ${fact.label}: ${fact.value}`);
            } else {
                console.log(`    SKIP     no base fields to prefill from`);
            }
        }

        if (project.hasInfobox) {
            patch.unset(["subpage.intro.infobox"]);
            changed = true;
            cleaned++;
            console.log(`    REMOVE   legacy infobox`);
        }

        if (changed && write) await patch.commit();
    }

    console.log(`\n${write ? "Done" : "Would change"}: ${prefilled} fact card(s) prefilled, ${cleaned} infobox(es) removed`);
    if (!write && (prefilled || cleaned)) console.log("Run again with --write to apply.");
}

migrate().catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
});
