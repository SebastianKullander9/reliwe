"use client";

import { menuConfig } from "./header.menu";
import { headerVariants } from "./header.variants";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useHeaderTwo } from "@/components/hooks/useHeaderTwo";
import { useProjectFilter } from "@/components/context/ProjectFilterContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "../MobileMenu";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";

export default function Header({ variant = "home" }: { variant?: "home" | "default" }) {
	const pathname = usePathname();
	const { state, isVisible, openSubMenu, toggleSubMenu, closeSubMenu, headerHeight  } = useHeaderTwo(headerVariants[variant]);
	const { setActiveFilter } = useProjectFilter();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const activeMenuItem = menuConfig.menu.find(
		(item) => item.label === openSubMenu
	);

	const handleSubmenuClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		
		const url = new URL(href, window.location.origin);
		const status = url.searchParams.get("status") as "planned" | "ongoing" | "done" | null;
		
		if (status) {
			setActiveFilter(status);
		} else if (href === "/projekt") {
			setActiveFilter("all");
		}
		
		router.push("/projekt");
		closeSubMenu();
	};

	useEffect(() => {
		if (!isOpen) return;

		const scrollY = window.scrollY;

		document.documentElement.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";

			window.scrollTo(0, scrollY);
		};
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const isActiveLink = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };


	return (
		<>
			<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

			<header 
				className={`
					fixed w-full flex flex-col transition-transform duration-300 z-[9998]
					${isVisible ? "translate-y-0" : "-translate-y-full"}
				`}
				style={{ backgroundColor: state.background }}
			>
				<div 
					className="flex flex-row w-full items-center body-x-padding"
					style={{ height: headerHeight }}
				>
					<div className="w-1/3 relative">
						<Link href="/">
							<Image 
								src={state.logoSrc}
								alt="logo of the company reliwe AB"
								height={80}
								width={80}
							/>
						</Link>
					</div>
					<div className="flex-row w-1/3 gap-12 justify-center hidden md:flex">
						{menuConfig.menu.map((menuItem, index) => {
							let active = isActiveLink(menuItem.href);

							return (
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
										<p className={`${active ? "underline underline-offset-4" : ""} hover:underline underline-offset-4`}>
											{menuItem.label}
										</p>
										{menuItem.subMenu?.length && ( openSubMenu ? <IoIosArrowUp size={19} /> : <IoIosArrowDown size={19} /> )}
									</div>
								</Link>
							)
						})}
					</div>
					<div className="md:hidden ml-auto">
						<Hamburger
							toggled={isOpen}
							toggle={setIsOpen}
							distance="sm"
							size={28}
							color={isOpen ? variant === "home" ? "black" : state.textColor : state.textColor}
						/>
					</div>
				</div>
				{activeMenuItem?.subMenu && (
					<div 
						className="h-15 hidden md:block"
						style={{ backgroundColor: state.background }}
					>
						<div 
							className="body-x-padding flex gap-8 h-full items-center justify-center"
							style={{ color: state.textColor }}
						>
							{activeMenuItem.subMenu.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="hover:underline"
									onClick={(e) => handleSubmenuClick(item.href, e)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				)}
			</header>
		</>
	);
}