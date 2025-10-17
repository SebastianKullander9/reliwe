import Image from "next/image"

type infoCardProps = {
    imgUrl: string;
    title: string;
    text: string;
}

export default function InfoCard({ imgUrl, title, text }: infoCardProps) {
    return (
        <div className="flex flex-col items-vertical-gap flex-1">
            <div className="relative aspect-square w-full min-h-3/5">
                <Image 
                    src={imgUrl}
                    fill
                    className="object-cover"
                    alt=""
                />
            </div>
            <div className="text-center">
                <h3 className="text-[22px] whitespace-nowrap">
                    {title}
                </h3>
            </div>
            <div className="text-center">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}