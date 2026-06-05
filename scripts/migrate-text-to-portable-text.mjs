/**
 * Migrates estateProject.text from plain string to portable text blocks.
 * Run once: node scripts/migrate-text-to-portable-text.mjs
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
    return text.split("\n\n").filter(Boolean).map((paragraph) => ({
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: paragraph.trim(), marks: [] }],
    }));
}

async function migrate() {
    const projects = await client.fetch(
        `*[_type == "estateProject"]{ _id, text }`
    );

    console.log(`Found ${projects.length} estateProject documents`);

    let migrated = 0;
    let skipped = 0;

    for (const project of projects) {
        if (typeof project.text !== "string") {
            console.log(`  SKIP  ${project._id} (already portable text or null)`);
            skipped++;
            continue;
        }

        const blocks = stringToBlocks(project.text);
        await client.patch(project._id).set({ text: blocks }).commit();
        console.log(`  DONE  ${project._id} → ${blocks.length} block(s)`);
        migrated++;
    }

    console.log(`\nMigration complete: ${migrated} migrated, ${skipped} skipped`);
}

migrate().catch((err) => {
    console.error("Migration failed:", err.message);
    process.exit(1);
});
