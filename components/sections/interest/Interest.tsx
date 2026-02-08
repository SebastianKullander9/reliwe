import Link from "next/link";
import ButtonBackground from "@/components/ui/buttons/newButtons/ButtonBackground";
import ButtonAnimationWrapper from "@/components/ui/buttons/newButtons/ButtonAnimationWrapper";

export default function Interest() {
	return (
		<section className="bg-[var(--reliwe-offwhite)] body-x-padding flex flex-col py-24 items-center gap-8">
				<div className="flex flex-col items-center">
					<h2 className="heading">Intresseanmälan</h2>
					<p>Om du vill veta mer om våra aktuella projekt?</p>
					<p>Anmäl intresse här för mer information.</p>
				</div>
				<div>
					<Link target="_blank" href="https://form.typeform.com/to/eX3wW0qu">
						<ButtonAnimationWrapper>
							<ButtonBackground label="Anmäl intresse" />
						</ButtonAnimationWrapper>
					</Link>
				</div>	
		</section>
	);
};