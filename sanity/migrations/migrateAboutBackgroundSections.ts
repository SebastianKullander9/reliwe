/**
 * One-off migration: moves the single `background` object on the aboutPage
 * singleton into the new repeatable `backgroundSections` array, so the client
 * can add more sections of the same kind at the bottom of "Om oss".
 *
 * Run once with:
 *   npx sanity exec sanity/migrations/migrateAboutBackgroundSections.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-10-17'})

type BackgroundSection = {
    title?: string
    texts?: string[]
}

async function run() {
    const docs: {_id: string; background?: BackgroundSection; backgroundSections?: BackgroundSection[]}[] =
        await client.fetch(`*[_type=="aboutPage"]{_id, background, backgroundSections}`)

    if (docs.length === 0) {
        console.log('No aboutPage document found, nothing to migrate.')
        return
    }

    const tx = client.transaction()
    let migrated = 0

    for (const doc of docs) {
        if (doc.backgroundSections?.length) {
            console.log(`${doc._id} already has backgroundSections, skipping.`)
            continue
        }

        if (!doc.background) {
            console.log(`${doc._id} has no background to migrate, skipping.`)
            continue
        }

        tx.patch(doc._id, (p) =>
            p
                .set({
                    backgroundSections: [
                        {
                            _type: 'backgroundSection',
                            _key: 'background',
                            title: doc.background?.title ?? 'Bakgrund',
                            texts: doc.background?.texts ?? [],
                        },
                    ],
                })
                .unset(['background'])
        )
        migrated++
    }

    if (migrated === 0) {
        console.log('Nothing to do.')
        return
    }

    await tx.commit()
    console.log(`Migrated background -> backgroundSections on ${migrated} aboutPage document(s).`)
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
