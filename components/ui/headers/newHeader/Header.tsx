"use client";

import { menuConfig } from "./header.menu";
import { headerVariants } from "./header.variants";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import ButtonAnimationWrapper from "../../buttons/newButtons/ButtonAnimationWrapper";
import { useHeader } from "@/components/hooks/useHeader";
import { useHeaderTwo } from "@/components/hooks/useHeaderTwo";

export default function Header({ variant = "home" }: { variant?: "home" | "default" }) {
	//const { state, isVisible } = useHeader(headerVariants[variant]);
	const { state, isVisible, openSubMenu, toggleSubMenu, closeSubMenu, headerHeight  } = useHeaderTwo(headerVariants[variant]);
	const Button = state.button;

	const activeMenuItem = menuConfig.menu.find(
		(item) => item.label === openSubMenu
	);

	return (
		<header 
			className={`
				fixed w-full flex flex-col transition-transform duration-300 z-[9999]
				${isVisible ? "translate-y-0" : "-translate-y-full"}
			`}
			style={{ backgroundColor: state.background }}
		>
			<div 
				className="flex flex-row w-full items-center body-x-padding"
				style={{ height: headerHeight }}
			>
				<div className="w-1/3 relative">
					<Image 
						src={state.logoSrc}
						alt="logo of the company reliwe AB"
						height={80}
						width={80}
					/>
				</div>
				<div className="flex flex-row w-1/3 gap-12 justify-center">
					{menuConfig.menu.map((menuItem, index) => (
						<Link 
							href={menuItem.href} 
							key={menuItem.label + index} 
							className="hover:text-[#efe5de] transition-colors duration-200"
							style={{ color: state.textColor }}
							onClick={(e) => {
								if (!menuItem.subMenu?.length) return;

								toggleSubMenu(menuItem.label, e);
							}}
						>
							<div className="flex flex-row items-center gap-1">
								<p>
									{menuItem.label}
								</p>
								{menuItem.subMenu?.length && (<IoIosArrowDown size={19} />)}
							</div>
						</Link>
					))}
				</div>
				<div className="w-1/3 flex justify-end">
					<ButtonAnimationWrapper>
						<Button />
					</ButtonAnimationWrapper>
				</div>
			</div>
			{activeMenuItem?.subMenu && (
				<div className="bg-[var(--reliwe-offwhite)] h-10">
					<div className="body-x-padding flex gap-8 h-full items-center justify-center">
						{activeMenuItem.subMenu.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="hover:underline"
								onClick={closeSubMenu}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
};