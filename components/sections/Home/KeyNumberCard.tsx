import Image from "next/image";
import Link from "next/link";

type KeyNumberCardProps = {
    title: string;
    number: string;
    imgUrl: string;
}

export default function KeyNumberCard({ title, number, imgUrl }: KeyNumberCardProps) {
    return (
        <div className="w-full max-h-100 bg-[var(--reliwe-green-accent)] h-full p-8 py-14 md:py-10 rounded-lg">
            <div className="flex flex-row justify-between md:flex-col md:items-center md:justify-center h-full gap-8">
                <Image src={imgUrl} width={100} height={100} alt="" className="w-18 md:w-22 h-18 md:h-22" />
                <div className="flex flex-col items-center min-w-52 md:w-full gap-3">
                    <p className="text-bold !text-xl lg:!text-4xl">{number}</p>
                    <p className="text-family text-black text-base lg:text-xl">{title}</p>
                </div>
            </div>
        </div>
    )
}