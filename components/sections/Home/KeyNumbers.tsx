import KeyNumberCard from "./KeyNumberCard";
import crane from "../../../public/keynumbers/crane.svg";
import result from "../../../public/keynumbers/result.svg";
import solvency from "../../../public/keynumbers/solvency2.svg";
import building from "../../../public/keynumbers/building.svg";
import { client } from "@/sanity/lib/client";

type KeyNumbersData = {
    heading: string;
    description: string;
    card1Title: string;
    card1Number: string;
    card2Title: string;
    card2Number: string;
    card3Title: string;
    card3Number: string;
    card4Title: string;
    card4Number: string;
};

async function getKeyNumbers(): Promise<KeyNumbersData | null> {
    const query = `*[_type == "homePage"][0]{
        keyNumbers {
            heading,
            description,
            card1Title,
            card1Number,
            card2Title,
            card2Number,
            card3Title,
            card3Number,
            card4Title,
            card4Number
        }
    }`;
    
    const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
    return data?.keyNumbers || null;
}

export default async function KeyNumbers() {
    const data = await getKeyNumbers();

    if (!data) {
        return null;
    }

    return (
        <>
            <section className="w-full md:h-screen bg-[var(--reliwe-offwhite)] body-x-padding gap-12 flex flex-col">
                <div className="flex flex-col md:flex-row items-horizontal-gap md:!gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="heading md:pb-0 md:text-start text-center">{data.heading}</h2>
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="max-w-prose flex justify-end">
                            {data.description}
                        </p>
                    </div>
                </div>

                <div className="h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
                        <KeyNumberCard 
                            title={data.card1Title}
                            number={data.card1Number}
                            imgUrl={crane}
                        />
                        <KeyNumberCard 
                            title={data.card2Title}
                            number={data.card2Number}
                            imgUrl={building}
                        />
                        <KeyNumberCard 
                            title={data.card3Title}
                            number={data.card3Number}
                            imgUrl={result}
                        />
                        <KeyNumberCard 
                            title={data.card4Title}
                            number={data.card4Number}
                            imgUrl={solvency}
                        />
                    </div>
                </div>
            </section>

            <div className="h-48 w-full bg-[var(--reliwe-offwhite)]" />
        </>
    );
}