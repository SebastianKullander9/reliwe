"use client";

import { useState, useEffect } from "react";
import { menuConfig } from "./header.menu";
import { headerVariants } from "./header.variants";
import Link from "next/link";
import Image from "next/image";
import { useHeaderStatic } from "@/components/hooks/useHeaderStatic";
import { useProjectFilter } from "@/components/context/ProjectFilterContext";
import { Link as ScrollLink, scroller  } from "react-scroll";
import MobileMenu from "../MobileMenu";
import Hamburger from "hamburger-react";
import { usePathname } from "next/navigation";

export default function HeaderStatic({ variant = "default" }: { variant?: "home" | "default" }) {
	const pathname = usePathname();
	const { state, isVisible, headerHeight, enableHeaderDetection, disableHeaderDetection } = useHeaderStatic(headerVariants[variant]);
	const { activeFilter, setActiveFilter } = useProjectFilter();
	const [isOpen, setIsOpen] = useState(false);

	const activeMenuItem = menuConfig.menu.find(
		(item) => item.label === "Projekt"
	);

	const isActiveProjectFilter = (href: string) => {
		if (pathname !== "/projekt") return false;

		const url = new URL(href, "http://localhost:3000");
		const status = url.searchParams.get("status");

		if (!status) return activeFilter === "all";
		return activeFilter === status;
	};

	const handleSubmenuClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>, isMobile=false) => {
		const url = new URL(href, window.location.origin);
		const status = url.searchParams.get("status") as "planned" | "ongoing" | "done" | null;
		
		if (status) {
			e.preventDefault();
			setActiveFilter(status);
			
			setTimeout(() => {
				disableHeaderDetection();
				
				scroller.scrollTo("projectTop", {
					smooth: true,
					offset: isMobile ? 0 : -60,
					duration: 250,
				});

				setTimeout(() => {
					enableHeaderDetection();
				}, 1000);
			}, 0);
			
		} else if (href === "/projekt") {
			e.preventDefault();
			setActiveFilter("all");
			
			setTimeout(() => {
				disableHeaderDetection();
				
				scroller.scrollTo("projectTop", {
					smooth: true,
					offset: isMobile ? 0 : -60,
					duration: 250,
				});

				setTimeout(() => {
					enableHeaderDetection();
				}, 1000);
			}, 0);
		}
	};

	useEffect(() => {
		if (!isOpen) return;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		document.body.style.position = "fixed";
		document.body.style.width = "100%";

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";

		};
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<>
			<MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

			<header 
				className="fixed w-full flex flex-col transition-transform duration-300 z-[9998]"
				style={{
					backgroundColor: state.background,
					transform: isVisible
						? "translateY(0)"
						: `translateY(-${headerHeight}px)`,
				}}
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
							const isActive = pathname.startsWith(menuItem.href);

							return (
								<Link 
									href={menuItem.href} 
									key={menuItem.label + index} 
									className="hover:underline underline-offset-4"
									style={{ color: state.textColor }}
								>
									<p className={`${isActive ? "underline underline-offset-4" : ""}`}>{menuItem.label}</p>
								</Link>
							)
						})}
					</div>
					<div className="md:hidden ml-auto col-end-4">
						<Hamburger
							toggled={isOpen}
							toggle={setIsOpen}
							distance="sm"
							size={28}
							color={isOpen ? "#faf7f5" : "#faf7f5"}
						/>
					</div>
				</div>

			</header>

			{activeMenuItem?.subMenu && (
				<div 
					className="fixed w-full h-15 transition-transform duration-300 z-[9998] hidden md:block mt-[-1px]"
					style={{ 
						backgroundColor: state.background,
						transform: isVisible
							? `translateY(${headerHeight}px)`
							: "translateY(0)",
					}}
				>
					<div 
						className="body-x-padding flex gap-8 h-full items-center justify-center"
						style={{ color: state.textColor }}
					>
						{activeMenuItem.subMenu.map((item) => {
							const isActive = isActiveProjectFilter(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={(e) => handleSubmenuClick(item.href, e)}
									className={`
										transition-all
										${isActive
											? "underline underline-offset-4"
											: "hover:underline underline-offset-4"}
									`}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				</div>
			)}

			{activeMenuItem?.subMenu && (
				<div
					className="fixed bottom-0 w-full h-15 z-[9998] md:hidden"
					style={{
						backgroundColor: state.background,
					}}
				>
					<div 
						className="body-x-padding flex gap-8 h-full items-center justify-center text-sm"
						style={{ color: state.textColor }}
					>
												{activeMenuItem.subMenu.map((item) => {
							const isActive = isActiveProjectFilter(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={(e) => handleSubmenuClick(item.href, e, true)}
									className={`
										transition-all
										${isActive
											? "underline underline-offset-4"
											: "hover:underline underline-offset-4"}
									`}
								>
									{item.label}
								</Link>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}