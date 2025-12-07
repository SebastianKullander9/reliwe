import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type InfoCardProps = {
    image: { asset: { _ref: string } | { url: string }; alt?: string };
    title: string;
    text: string;
};

export default function InfoCard({ image, title, text }: InfoCardProps) {
    const imgUrl = "url" in image.asset ? image.asset.url : urlFor(image).url();

    return (
        <div className="flex flex-col items-vertical-gap flex-1">
            <div className="relative aspect-square w-full min-h-5/10 max-h-5/10">
                <Image
                    src={imgUrl}
                    fill
                    className="object-cover"
                    alt={image.alt || ""}
                />
            </div>
			<div className="flex flex-col gap-4">
				<div className="">
					<h3 className="uppercase text-xl tracking-wider">{title}</h3>
				</div>
				<div className="">
					<p>{text}</p>
				</div>
			</div>
        </div>
    );
}