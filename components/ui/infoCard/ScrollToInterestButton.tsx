"use client";

import ButtonAnimationWrapper from "../buttons/newButtons/ButtonAnimationWrapper";
import ButtonWhiteBackground from "../buttons/newButtons/ButtonWhiteBackground";
import { CircleArrowDown } from "lucide-react";

export default function ScrollToInterestButton() {
	const handleClick = () => {
		document.getElementById("interest-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div onClick={handleClick} className="cursor-pointer">
			<ButtonAnimationWrapper hasMaxWidth={false}>
				<ButtonWhiteBackground label="Gå till intresseanmälan" Icon={CircleArrowDown} />
			</ButtonAnimationWrapper>
		</div>
	);
}
