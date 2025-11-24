import ImagesDisplay from "./ImagesDisplay";
import ImageDisplay from "./ImageDisplay";
import { colorScheme } from "./colorScheme";

type projectCardProps = {
    title: string;
    text: string;
    year: string;
    movingInYear: string;
    apartmentAmount: string;
    roomAmount: string;
    imgUrls: string[];
    index: number;
}

export default function ProjectCard({
    title,
    text,
    year,
    movingInYear,
    apartmentAmount,
    roomAmount,
    imgUrls,
    index
}: projectCardProps ) {
    const clampedIndex = index % colorScheme.length;

    return (
        <div 
            className={`w-full ${imgUrls.length > 1 ? "" : "h-[calc(100vh+200px)]"} body-x-padding section-y-padding flex 
                ${imgUrls.length > 1 ? "flex-col" : "flex-col md:flex-row items-center"} 
                justify-center md:justify-between items-vertical-gap !gap-24`}
            style={{ backgroundColor: colorScheme[clampedIndex].backgroundColor}}
        >
            <div className={`flex flex-col ${imgUrls.length > 1 ? "md:flex-row" : "md:flex-col md:w-1/2"} items-vertical-gap md:gap-0`}>
                <div className={`w-full ${imgUrls.length > 1 ? "md:w-1/2" : ""} flex justify-center md:justify-start`}>
                    <h2 className="heading text-start [overflow-wrap:anywhere] [word-break:break-word]">{title}</h2>
                </div>
                <div className={`w-full ${imgUrls.length > 1 ? "md:w-1/2": ""} flex flex-col items-vertical-gap`}>
                    <p>{text}</p>
                    <div className="flex flex-row justify-between max-w-prose">
                        <div className="flex flex-col items-vertical-gap">
                            <div>
                                <h3 className="emphasize-text">Byggstart</h3>
                                <p>{year}</p>
                            </div>
                            <div>
                                <h3 className="emphasize-text">Inflyttning</h3>
                                <p>{movingInYear}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-vertical-gap">
                            <div>
                                <h3 className="emphasize-text">Antal lägenheter</h3>
                                <p>{apartmentAmount}</p>
                            </div>
                            <div>
                                <h3 className="emphasize-text">Antal rum</h3>
                                <p>{roomAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${imgUrls.length > 1 ? "" : "w-full md:w-1/2"}`}>
                {imgUrls.length > 1 ? (
                    <ImagesDisplay imgUrls={imgUrls} projectName={title} clampedIndex={clampedIndex} />
                ) : (
                    <ImageDisplay imgUrls={imgUrls} projectName={title} />
                )}
            </div>
        </div>
    );
}