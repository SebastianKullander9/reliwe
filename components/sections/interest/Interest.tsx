import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";
import Link from "next/link";

export default function Interest() {
	return (
		<section className="bg-[var(--reliwe-offwhite)] body-x-padding py-24 flex flex-col md:flex-row gap-8">
			<div className="w-full md:w-1/2">
				<div className="flex flex-col items-center">
					<h2 className="heading">Intresseanmälan</h2>
					<p>Om du vill veta mer om våra aktuella projekt?</p>
					<p>Anmäl intresse här för mer information.</p>
				</div>
			</div>
			<div className="w-full md:w-1/2 flex items-center justify-center">
				<Link target="_blank" href="https://form.typeform.com/to/eX3wW0qu">
					<BaseButtonBackground 
						label="Anmäl intresse"
						bgColor="#1f5d37"
						hoverTextColor="#faf7f5"
					/>
				</Link>
			</div>
		</section>
	);
};