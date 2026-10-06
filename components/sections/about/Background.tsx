import Image from "next/image";
import Link from "next/link";
import ButtonBackground from "@/components/ui/buttons/newButtons/ButtonBackground";
import ButtonAnimationWrapper from "@/components/ui/buttons/newButtons/ButtonAnimationWrapper";

export type BackgroundImage = {
	asset?: { url?: string };
	alt?: string;
	hotspot?: { x: number; y: number };
};

export type BackgroundButton = {
	label?: string;
	link?: string;
};

type BackgroundProps = {
	title?: string;
	texts?: string[];
	image?: BackgroundImage;
	imagePosition?: "left" | "right";
	button?: BackgroundButton;
};

function SectionButton({ label, link, className }: { label: string; link: string; className: string }) {
	const isExternal = /^https?:\/\//.test(link);

	return (
		<div className={className}>
			<Link
				href={link}
				{...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
			>
				<ButtonAnimationWrapper>
					<ButtonBackground label={label} />
				</ButtonAnimationWrapper>
			</Link>
		</div>
	);
}

export default function Background({ title = "Bakgrund", texts = [], image, imagePosition = "left", button }: BackgroundProps) {
	const imageUrl = image?.asset?.url;
	const buttonLabel = button?.label;
	const buttonLink = button?.link;

	// Without an image, keep the original centered text layout.
	if (!imageUrl) {
		return (
			<section className="w-full flex justify-center items-center relative body-x-padding py-10 md:py-12">
				<div className=" max-w-prose text-center">
					<div className="flex flex-col gap-8">
						<h2 className="heading">
							{title}
						</h2>
						<div className="flex flex-col gap-4">
							{texts.map((text, index) => (
								<p key={index}>
									{text}
								</p>
							))}
						</div>
						{buttonLabel && buttonLink && (
							<SectionButton label={buttonLabel} link={buttonLink} className="flex justify-center" />
						)}
					</div>
				</div>
			</section>
		);
	}

	const objectPosition = image?.hotspot
		? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
		: undefined;

	return (
		<section className="w-full body-x-padding section-y-padding">
			<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 xl:gap-20">
				<div
					className={`relative w-full aspect-[4/3] md:aspect-[4/5] xl:aspect-[5/4] overflow-hidden ${
						imagePosition === "right" ? "md:order-2" : ""
					}`}
				>
					<Image
						src={imageUrl}
						fill
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover"
						style={{ objectPosition }}
						alt={image?.alt || ""}
					/>
				</div>
				<div className="flex flex-col gap-8">
					<h2 className="heading text-center md:text-start">
						{title}
					</h2>
					<div className="flex flex-col gap-4 max-w-prose">
						{texts.map((text, index) => (
							<p key={index}>
								{text}
							</p>
						))}
					</div>
					{buttonLabel && buttonLink && (
						<SectionButton label={buttonLabel} link={buttonLink} className="flex justify-center md:justify-start" />
					)}
				</div>
			</div>
		</section>
	);
};
