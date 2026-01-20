import BaseButtonBackground from "@/components/ui/buttons/baseButton/BaseButtonBackground";

export default function Interest() {
	return (
		<section className="bg-[var(--reliwe-offwhite)] body-x-padding py-24 flex flex-row">
			<div className="w-1/2">
				<div className="flex flex-col items-center">
					<h2 className="heading">Intresseanmälan</h2>
					<p>Om du vill veta mer om våra aktuella projekt?</p>
					<p>Anmäl intresse här för mer information.</p>
				</div>
			</div>
			<div className="w-1/2 flex items-center justify-center">
				<BaseButtonBackground 
					label="Anmäl intresse"
					bgColor="#1f5d37"
					hoverTextColor="#faf7f5"
				/>
			</div>
		</section>
	);
};