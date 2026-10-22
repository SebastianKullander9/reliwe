/**
 * Migrates estateProject.subpage.sections[].text (plain string) into
 * sections[].content (portable text) and removes the old text field.
 *
 * Dry run (default, changes nothing):  node scripts/migrate-section-text-to-content.mjs
 * Apply changes:                       node scripts/migrate-section-text-to-content.mjs --write
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

function stringToBlocks(text) {
    return text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean).map((paragraph) => ({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: paragraph, marks: [] }],
    }));
}

function blocksText(blocks) {
    return blocks.map((block) => (block.children ?? []).map((child) => child.text ?? "").join("")).join("\n\n");
}

async function migrate() {
    // Includes drafts (drafts.*) since the token can read them.
    const projects = await client.fetch(
        `*[_type == "estateProject" && defined(subpage.sections)]{ _id, title, "sections": subpage.sections[]{ _key, title, text, content } }`
    );

    console.log(`${write ? "WRITE" : "DRY RUN"} — found ${projects.length} estateProject document(s) with sections\n`);

    let migrated = 0;
    let conflicts = 0;

    for (const project of projects) {
        const patch = client.patch(project._id);
        // Collected and unset in one call: repeated patch.unset() calls overwrite each other.
        const unsetPaths = [];

        for (const section of project.sections ?? []) {
            if (typeof section.text !== "string") continue;

            const path = `subpage.sections[_key=="${section._key}"]`;
            const label = `${project._id} / "${section.title ?? "Namnlös sektion"}"`;

            const blocks = stringToBlocks(section.text);

            if (section.content?.length && blocksText(section.content) === blocksText(blocks)) {
                // Content already matches the old text (e.g. from an earlier run), only the old field is left.
                unsetPaths.push(`${path}.text`);
                migrated++;
                console.log(`  CLEANUP   ${label} — content already matches, removing old text`);
                continue;
            }

            if (section.content?.length) {
                // Both fields filled: don't overwrite what the editor wrote, leave for manual review.
                console.log(`  CONFLICT  ${label} — has both text and content, left untouched`);
                conflicts++;
                continue;
            }

            if (blocks.length) patch.set({ [`${path}.content`]: blocks });
            unsetPaths.push(`${path}.text`);
            migrated++;
            console.log(`  MIGRATE   ${label} → ${blocks.length} block(s)`);
        }

        if (unsetPaths.length && write) await patch.unset(unsetPaths).commit();
    }

    console.log(`\n${write ? "Done" : "Would migrate"}: ${migrated} section(s), ${conflicts} conflict(s)`);
    if (!write && migrated) console.log("Run again with --write to apply.");
}

migrate().catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
});
