/**
 * One-off migration: assigns an `orderRank` to every existing estateProject
 * document, preserving the display order the site currently uses (status
 * group, then the old `sortOrder` number, then newest first) so switching to
 * the drag-and-drop orderable list in Studio doesn't reshuffle anything.
 *
 * Run once with:
 *   npx sanity exec sanity/migrations/backfillEstateProjectOrder.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {LexoRank} from 'lexorank'

const client = getCliClient({apiVersion: '2025-10-17'})

const STATUS_RANK: Record<string, number> = {planned: 0, ongoing: 1, done: 2}

type RawDoc = {
    _id: string
    _createdAt: string
    status?: string
    sortOrder?: number
}

async function run() {
    const docs: RawDoc[] = await client.fetch(
        `*[_type == "estateProject"]{_id, _createdAt, status, sortOrder}`
    )

    const byPublishedId = new Map<string, RawDoc[]>()
    for (const doc of docs) {
        const publishedId = doc._id.replace(/^drafts\./, '')
        const versions = byPublishedId.get(publishedId) ?? []
        versions.push(doc)
        byPublishedId.set(publishedId, versions)
    }

    const projects = Array.from(byPublishedId.entries()).map(([publishedId, versions]) => {
        const draft = versions.find((v) => v._id.startsWith('drafts.'))
        const source = draft ?? versions[0]
        return {publishedId, versions, ...source}
    })

    projects.sort((a, b) => {
        const statusDiff = (STATUS_RANK[a.status ?? ''] ?? 99) - (STATUS_RANK[b.status ?? ''] ?? 99)
        if (statusDiff !== 0) return statusDiff

        const sortDiff = (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity)
        if (sortDiff !== 0) return sortDiff

        return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    })

    let rank = LexoRank.min()
    const tx = client.transaction()

    for (const project of projects) {
        rank = rank.genNext()
        const orderRank = rank.toString()
        for (const version of project.versions) {
            tx.patch(version._id, (p) => p.set({orderRank}).unset(['sortOrder']))
        }
    }

    await tx.commit()
    console.log(`Assigned orderRank to ${projects.length} estateProject document(s).`)
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
