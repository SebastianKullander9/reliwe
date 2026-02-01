import Image from "next/image";
import reliweLogo from "../../../public/logo/reliwe-logo-offwhite.png";
import { TfiArrowTopRight } from "react-icons/tfi";

export default function FooterTwo() {
	return (
		<footer className="min-h-screen bg-[var(--reliwe-green)] grid grid-rows-10 px-48 py-24 text-[var(--reliwe-offwhite)] relative">
			<section className="row-span-2 grid grid-cols-2 border-t border-b border-[#2c854e] py-8">
					<div className="col-span-1">
						<p className="text-medium">Navigering</p>
					</div>
					<div className="col-span-1 text-small ">
						<div className="group inline-block">
							<div className="transition-all duration-250 group-hover:blur-[1px] group-hover:text-[#56a976] hover:blur-[0] hover:text-[var(--reliwe-offwhite)] cursor-pointer">
								<p>
									Om oss
								</p>
							</div>
							<div className="transition-all duration-250 group-hover:blur-[1px] group-hover:text-[#56a976] hover:blur-[0] hover:text-[var(--reliwe-offwhite)] cursor-pointer">
								<p>
									Våra projekt
								</p>
							</div>
							<div className="transition-all duration-250 group-hover:blur-[1px] group-hover:text-[#56a976] hover:blur-[0] hover:text-[var(--reliwe-offwhite)] cursor-pointer">
								<p>
									Kontakta oss
								</p>
							</div>
						</div>
						
					</div>				
			</section>
			<section className="row-span-2 grid grid-cols-2 border-b border-[#2c854e] py-8">
					<div className="col-span-1">
						<p className="text-medium">Besök oss</p>
					</div>
					<div className="col-span-1 flex flex-row gap-24">
						<div className="text-small">
							<p>
								Ingmar Bergmans gata 2
							</p>
							<p>
								Stockholm, 114 34
							</p>
						</div>
						<div className="text-small">
							<p>
								Kristinagatan 28 C
							</p>
							<p>
								Norrköping, 602 32
							</p>
						</div>
					</div>	
			</section>
			<section className="row-span-2 grid grid-cols-2 border-b border-[#2c854e] py-8">
					<div className="col-span-1">
						<p className="text-medium">Kontakta oss</p>
					</div>
					<div className="col-span-1">
						<p className="text-small">info@reliwe.se</p>
					</div>	
			</section>
			<section className="row-span-4 relative">
				<div className="absolute bottom-0 w-full">
					<div className="flex flex-row justify-between items-center">
						<h1 className="text-[10vw] uppercase leading-none">
							Reliwe
						</h1>
						<button className="flex justify-end items-end">
							<span className="uppercase text-xl">Anmäl intresse</span>
							<TfiArrowTopRight size={36} />
						</button>
					</div>
				</div>
				
			</section>
			<div className="absolute bottom-8 w-full flex flex-row justify-between px-48 text-small">
				<p>Integritetspolicy</p>
				<p>© 2026 Reliwe AB</p>
			</div>
		</footer>
	);
};