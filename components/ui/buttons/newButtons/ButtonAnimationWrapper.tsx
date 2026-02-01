import React from "react";

interface ButtonAnimationWrapperProps {
	children: React.ReactNode;
}

export default function ButtonAnimationWrapper({ children }: ButtonAnimationWrapperProps) {
	return (
		<div className="max-h-12 overflow-hidden rounded-full">
			<div className="flex flex-col transition-transform hover:-translate-y-1/2 ease-[cubic-bezier(0.9,0,0.1,1)] duration-350">
				{children}
			</div>
		</div>
	);
};