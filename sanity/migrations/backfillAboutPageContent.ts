/**
 * One-off migration: seeds the new `scrollSections` and `background` fields
 * on the aboutPage singleton with the content that was previously hardcoded
 * in the frontend (components/sections/about/scrollSection/content.ts and
 * Background.tsx), so making those fields editable in Studio doesn't blank
 * out the live "Om oss" page.
 *
 * Run once with:
 *   npx sanity exec sanity/migrations/backfillAboutPageContent.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-10-17'})

const scrollSections = [
    {
        title: 'Vår riktning',
        text: 'Vi vill bidra till en bostadsmarknad med mångfald och valfrihet. Det gör vi genom att både sälja och hyra ut bostäder, samtidigt som vi gradvis bygger upp ett eget, växande bestånd av hyresrätter som vi själva förvaltar. Vår målbild är att Reliwe ska vara en aktiv och pålitlig partner på bostadsmarknaden.',
    },
    {
        title: 'Vårt ansvar',
        text: 'Vi är mer än en bostadsutvecklare. Genom nya projekt och en växande egen hyresportfölj skapar vi långsiktigt värde och trygghet för både boende och stadsdelar. Våra bostäder byggs och förvaltas med omtanke, kvalitet och ansvar för helheten.',
    },
    {
        title: 'Vår hållbarhet',
        text: 'Vi utvecklar hållbara och levande stadsdelar där människor kan mötas, trivas och känna trygghet. Med energieffektiva byggnader i energiklass B eller bättre, hållbara materialval och smarta energilösningar minimerar vi klimatpåverkan och bygger fastigheter som är hållbara över tid.',
    },
    {
        title: 'Vår trygghet',
        text: 'När du bor eller köper av oss ska du känna dig trygg – idag och i framtiden. Vi finns med genom hela resan, från de första funderingarna till långt efter inflyttning, med personlig service, tydlig kommunikation och ett genuint engagemang.',
    },
]

const background = {
    title: 'Bakgrund',
    texts: [
        'Reliwe AB grundades 2021 med ambitionen att utveckla hållbara, väl genomtänkta bostäder där människor kan trivas över tid. Bolaget består av personer med lång och gedigen erfarenhet inom fastighetsutveckling och bostadsproduktion, med en samlad kompetens som omfattar hela processen – från tidiga skeden och projektutveckling till färdigställda bostäder.',
        'För att säkerställa hög kvalitet i såväl gestaltning som funktion samarbetar Reliwe med väletablerade arkitektbyråer och andra erfarna aktörer. Genom ett helhetsperspektiv på arkitektur, kvalitet och hållbarhet utvecklar Reliwe bostäder och livsmiljöer som är långsiktigt värdeskapande, både för de boende och för samhället i stort.',
    ],
}

async function run() {
    const docs: {_id: string}[] = await client.fetch(`*[_type=="aboutPage"]{_id}`)

    if (docs.length === 0) {
        console.log('No aboutPage document found, nothing to seed.')
        return
    }

    const tx = client.transaction()

    for (const doc of docs) {
        tx.patch(doc._id, (p) =>
            p.setIfMissing({scrollSections, background}).unset(['ourVision', 'ourRole', 'sustainability'])
        )
    }

    await tx.commit()
    console.log(`Seeded scrollSections/background on ${docs.length} aboutPage document(s).`)
}

run().catch((err) => {
    console.error(err)
    process.exit(1)
})
