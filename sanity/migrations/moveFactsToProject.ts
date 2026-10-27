/**
 * Moves estateProject facts to the top-level `facts` field, shared by the
 * project list and the subpage fact card:
 *   - projects with subpage.factCard.facts keep those rows
 *   - other projects get rows built from year, movingInYear, apartmentAmount
 *     and roomAmount
 * Then removes those legacy fields. Drafts are migrated on their own.
 *
 * Dry run (default, changes nothing):
 *   npx sanity exec sanity/migrations/moveFactsToProject.ts --with-user-token
 * Apply changes:
 *   npx sanity exec sanity/migrations/moveFactsToProject.ts --with-user-token -- --write
 *
 * The dataset comes from NEXT_PUBLIC_SANITY_DATASET (see sanity.cli.ts).
 */
import {getCliClient} from 'sanity/cli'
import {randomBytes} from 'crypto'

const client = getCliClient({apiVersion: '2025-10-17'})
const write = process.argv.includes('--write')

// Same labels the project list and fact card used before facts were configurable.
const LEGACY_ROWS = [
    {field: 'year', label: 'Byggstart'},
    {field: 'movingInYear', label: 'Inflyttning'},
    {field: 'apartmentAmount', label: 'Antal lägenheter'},
    {field: 'roomAmount', label: 'Antal rum'},
] as const

const LEGACY_FIELDS = [...LEGACY_ROWS.map(({field}) => field), 'subpage.factCard.facts']

type Fact = {_key: string; label?: string; value?: string}

type RawDoc = {
    _id: string
    title?: string
    facts?: Fact[]
    subpageFacts?: Fact[]
    year?: string
    movingInYear?: string
    apartmentAmount?: string
    roomAmount?: string
    hasLegacyFields: boolean
}

async function run() {
    const docs: RawDoc[] = await client.fetch(
        `*[_type == "estateProject"]{
            _id, title, facts, year, movingInYear, apartmentAmount, roomAmount,
            "subpageFacts": subpage.factCard.facts,
            "hasLegacyFields": defined(year) || defined(movingInYear) || defined(apartmentAmount)
                || defined(roomAmount) || defined(subpage.factCard.facts)
        }`
    )

    console.log(`${write ? 'WRITE' : 'DRY RUN'} on dataset "${client.config().dataset}" — ${docs.length} estateProject document(s)\n`)

    let changed = 0

    for (const doc of docs) {
        console.log(`  ${doc._id} / "${doc.title?.trim() ?? 'Namnlöst projekt'}"`)

        if (!doc.hasLegacyFields) {
            console.log('    SKIP     already migrated')
            continue
        }

        const patch = client.patch(doc._id)

        if (doc.facts?.length) {
            console.log(`    KEEP     ${doc.facts.length} existing fact(s)`)
        } else {
            const facts: Fact[] = doc.subpageFacts?.length
                ? doc.subpageFacts
                : LEGACY_ROWS
                    .filter(({field}) => doc[field]?.trim())
                    .map(({field, label}) => ({_key: randomBytes(4).toString('hex'), label, value: doc[field]!.trim()}))

            const source = doc.subpageFacts?.length ? 'subpage' : 'base fields'
            for (const fact of facts) console.log(`    SET      ${fact.label}: ${fact.value}  (from ${source})`)
            if (facts.length) patch.set({facts})
        }

        console.log(`    REMOVE   legacy fields`)
        patch.unset(LEGACY_FIELDS)
        changed++

        if (write) await patch.commit()
    }

    console.log(`\n${write ? 'Done' : 'Would change'}: ${changed} document(s)`)
    if (!write && changed) console.log('Run again with -- --write to apply.')
}

run().catch((err) => {
    console.error('Migration failed:', err.message)
    process.exit(1)
})
