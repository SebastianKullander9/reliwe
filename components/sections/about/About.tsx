import Image from "next/image"
import PageIntro from "@/ui/pageIntro"

export default function About() {
    return (
        <div>
            <PageIntro
                title="Ett hem för livet" 
                texts={["Vi skapar bostäder som människor kan trivas i - oavsett om det är bostadsrätter eller hyresrätter. Med fokus på kvalitet, hållbarhet och långsiktighet vill vi göra livet enklare och tryggare för våra boende."]}
                imgUrl="/img/om-oss.jpg"
            />

            <div className="w-full flex flex-col md:flex-row site-x-padding py-12 md:py-48 items-center container mx-auto text-center">
                <div className="w-full md:w-1/2 flex flex-col">
                    <h1 className="normal-heading md:pb-12">Om oss</h1>
                    <p className="max-w-prose site-text-size text-gray-600 pb-12 mb:pb-0">
                        Reliwe är en bostadsutvecklare som skapar
                        både bostadsrätter och hyresrätter - för en
                        blandad och levande stadsmiljö. Som
                        hyresvärd är vi långsiktiga och närvarande,
                        med ambitionen att skapa trygga och
                        välskötta hem där människor kan bo länge
                        och trivas.
                    </p>
                </div>
                <div className="relative w-full md:w-1/2 aspect-auto flex justify-center">
                    <Image src="/img/om-oss2.jpg" height={600} width={400} className="object-cover" alt="Image of kids playing on a swing" />
                </div>
            </div>

            <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-[var(--reliwe-green-accent)] px-12 py-48 text-center">
                <h1 className="normal-heading pb-4 md:pb-12">Vår vision</h1>
                <p className="max-w-prose site-text-size text-[var(--reliwe-green-text)]">
                    Vi vill bidra till en bostadsmarknad med mångfald och valfrihet. Det gör vi genom
                    att utveckla nya bostäder som både säljs och hyrs ut – men också genom att steg
                    för steg bygga upp ett växande bestånd av hyresrätter som vi själva förvaltar. Vår
                    målbild är att Reliwe i allt högre grad ska vara en aktiv och pålitlig hyresvärd.
                </p>
            </div>

            <div className="md:h-[100vh] w-full">
                <h1 className="normal-heading text-center pt-14 md:pt-24">Hållbarhet i fokus</h1>

                <div className="mt-12 mb-48 bg-[var(--reliwe-green-accent)] site-x-padding py-4 container mx-auto">
                    <div className="flex flex-col md:flex-row gap-12">

                        <div className="w-full md:w-1/3 flex flex-col gap-12">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card1.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a group of friends drinking coffee together"
                                />
                            </div>
                            <div>
                                <h1 className="normal-heading text-2xl pb-8 text-center">Social hållbarhet</h1>
                                <p className="site-text-size text-[var(--reliwe-green-text)] text-center">
                                    Vi vill skapa miljöer där människor
                                    kan mötas, trivas och växa. Genom
                                    att blanda upplåtelseformer och
                                    komplettera bostäderna med
                                    service, trygghet och mötesplatser
                                    bygger vi levande stadsdelar som
                                    håller över tid.
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 flex flex-col gap-12">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card2.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a kid holding fresh carrots"
                                />
                            </div>
                            <div>
                                <h1 className="normal-heading text-2xl pb-8 text-center">Vår miljö</h1>
                                <p className="site-text-size text-[var(--reliwe-green-text)] text-center">
                                    Alla våra projekt uppfyller minst
                                    energiklass B och byggs med
                                    långsiktigt hållbara material. Med
                                    solceller, bergvärme och smarta
                                    energisystem minimerar vi
                                    klimatpåverkan och skapar
                                    energieffektiva fastigheter för
                                    framtiden.
                                </p>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 flex flex-col gap-12">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card3.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a man building the base for a house"
                                />
                            </div>
                            <div>
                                <h1 className="normal-heading text-2xl pb-8 text-center">Ekonomisk hållbarhet</h1>
                                <p className="site-text-size text-[var(--reliwe-green-text)] text-center">
                                    Vi bygger för långsiktighet. Genom
                                    att kombinera kvalitet, låga
                                    driftskostnader och stabila finanser
                                    skapar vi fastigheter som är
                                    lönsamma över tid – för både oss,
                                    våra investerare och de som bor i
                                    dem.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="h-[100vh] bg-[var(--reliwe-green-accent)] site-x-padding py-48 flex flex-col items-center text-center justify-center">
                <h1 className="normal-heading pb-12">Vår roll i samhället</h1>
                <p className="max-w-prose site-text-size text-[var(--reliwe-green-text)]">
                    Vi ser oss som mer än bostadsutvecklare. Genom att kombinera nya bostadsprojekt
                    med en växande egen hyresportfölj skapar vi trygghet både för individen och för
                    stadsdelen i stort. Vi bygger för dagens behov – och för framtidens hållbara boende.
                </p>
            </div>
        </div>
    )
}