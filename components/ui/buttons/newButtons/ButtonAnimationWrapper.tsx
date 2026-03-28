import React from "react";

interface ButtonAnimationWrapperProps {
	children: React.ReactNode;
	hasMaxWidth?: boolean;
}

export default function ButtonAnimationWrapper({ children, hasMaxWidth=true }: ButtonAnimationWrapperProps) {
	return (
		<div className={`max-h-12 overflow-hidden rounded-full min-w-45 ${hasMaxWidth ? "max-w-45": ""}`}>
			<div className="flex flex-col transition-transform hover:-translate-y-1/2 ease-[cubic-bezier(0.9,0,0.1,1)] duration-350">
				{children}
			</div>
		</div>
	);
};