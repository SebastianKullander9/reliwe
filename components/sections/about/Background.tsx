type BackgroundProps = {
	title?: string;
	texts?: string[];
};

export default function Background({ title = "Bakgrund", texts = [] }: BackgroundProps) {
	return (
		<section className="min-h-screen w-full flex justify-center items-center relative body-x-padding">
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
				</div>

			</div>
		</section>
	);
};