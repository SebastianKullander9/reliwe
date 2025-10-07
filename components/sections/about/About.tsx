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

            <div className="w-full h-screen flex flex-col md:flex-row site-x-padding site-y-padding site-gap mb-12 md:mb-0">
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <h1 className="normal-heading text-center md:text-start leading-15 pb-12 md:pt-0 pt-12 md:pb-0">Vi bygger hem för livet</h1>
                    <p className="max-w-prose site-text-size text-gray-600 pb-12 md:pb-0">
                        Reliwe är en bostadsutvecklare som skapar
                        både bostadsrätter och hyresrätter - för en
                        blandad och levande stadsmiljö. Som
                        hyresvärd är vi långsiktiga och närvarande,
                        med ambitionen att skapa trygga och
                        välskötta hem där människor kan bo länge
                        och trivas.
                    </p>
                </div>
                <div className="relative h-full w-full md:w-1/2 aspect-auto flex mb-12">
                    <Image src="/img/om-oss2.jpg" fill className="object-cover xl:object-contain xl:object-right" alt="Image of kids playing on a swing" />
                </div>
            </div>

            <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-[var(--reliwe-green-accent)] px-12 py-48 text-center">
                <h1 className="normal-heading py-12 md:py-16 lg:py-20 xl:py-28">Vår vision</h1>
                <p className="max-w-prose site-text-size text-[var(--reliwe-green-text)]">
                    Vi vill bidra till en bostadsmarknad med mångfald och valfrihet. Det gör vi genom
                    att utveckla nya bostäder som både säljs och hyrs ut – men också genom att steg
                    för steg bygga upp ett växande bestånd av hyresrätter som vi själva förvaltar. Vår
                    målbild är att Reliwe i allt högre grad ska vara en aktiv och pålitlig hyresvärd.
                </p>
            </div>

            <div className="h-screen bg-white site-x-padding py-48 flex flex-col items-center text-center justify-center site-y-padding">
                <h1 className="normal-heading py-12 md:py-16 lg:py-20 xl:py-28">Vår roll i samhället</h1>
                <p className="max-w-prose site-text-size text-[var(--reliwe-green-text)]">
                    Vi ser oss som mer än bostadsutvecklare. Genom att kombinera nya bostadsprojekt
                    med en växande egen hyresportfölj skapar vi trygghet både för individen och för
                    stadsdelen i stort. Vi bygger för dagens behov – och för framtidens hållbara boende.
                </p>
            </div>

            <div className="w-full bg-[var(--reliwe-green-accent)] flex flex-col justify-around">
                <h1 className="normal-heading text-center py-12 md:py-16 lg:py-20 xl:py-28">Hållbarhet i fokus</h1>

                <div className="site-x-padding">
                    <div className="flex flex-col md:flex-row gap-12 md:site-gap2">
                        <div className="w-full md:w-1/3 flex flex-col gap-12 md:site-gap2">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card1.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a group of friends drinking coffee together"
                                />
                            </div>
                            <div className="flex flex-col site-gap2">
                                <h2 className="secondary-heading text-2xl text-center tracking-normal">Social hållbarhet</h2>
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

                        <div className="w-full md:w-1/3 flex flex-col gap-12 md:site-gap2">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card2.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a kid holding fresh carrots"
                                />
                            </div>
                            <div className="flex flex-col site-gap2">
                                <h2 className="secondary-heading text-2xl text-center tracking-normal">Vår miljö</h2>
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

                        <div className="w-full md:w-1/3 flex flex-col gap-12 md:site-gap2">
                            <div className="relative aspect-square w-full">
                                <Image
                                    src="/img/om-oss-card3.jpg"
                                    fill
                                    className="object-cover"
                                    alt="Image of a man building the base for a house"
                                />
                            </div>
                            <div className="flex flex-col site-gap2 mb-24">
                                <h2 className="secondary-heading text-2xl text-center tracking-normal">Ekonomisk hållbarhet</h2>
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
        </div>
    )
}