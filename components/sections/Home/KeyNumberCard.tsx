import Image from "next/image";
import Link from "next/link";

type KeyNumberCardProps = {
    title: string;
    number: string;
    imgUrl: string;
}

export default function KeyNumberCard({ title, number, imgUrl }: KeyNumberCardProps) {
    return (
        <div className="max-w-150 max-h-100 bg-[var(--reliwe-green-accent)] w-full h-full rounded-lg p-8">
            <div className="flex flex-col items-center justify-center h-full gap-8">
                <Image src={imgUrl} width={100} height={100} alt="" />
                <div className="flex flex-col items-center">
                    <p className="text-bold !text-2xl lg:!text-4xl">{number}</p>
                    <h2 className="text-family text-[var(--reliwe-green)] text-base lg:text-xl">{title}</h2>
                </div>
            </div>
        </div>
    )
}