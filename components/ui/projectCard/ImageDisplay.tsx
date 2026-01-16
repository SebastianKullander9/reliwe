import Image from "next/image";

type ImageDisplayProps = {
    imgUrls: string[];
    projectName: string;
}

export default function ImageDisplay({ imgUrls, projectName }: ImageDisplayProps) {
    return (
        <figure className="w-full flex flex-col" aria-label="Project image gallery">
            <div className="relative w-full aspect-[4/3]">
                <Image
                    fill
                    className="object-cover rounded-lg"
                    src={imgUrls[0]}
                    alt={`Exterior view of project ${projectName}`}
					unoptimized
                />
            </div>
        </figure>
  );
}