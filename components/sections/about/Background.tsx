import Image from "next/image";
import reliweLogo from "../../../public/logo/reliwe-logo-green.png";

export default function Background() {
	return (
		<section className="min-h-screen w-full flex justify-center items-center relative body-x-padding">
			<div className=" max-w-prose text-center">
				<div className="flex flex-col gap-8">
					<div className="flex justify-center">
						<Image
							src={reliweLogo}
							alt="The logo of the company Reliwe AB"
							width={250}
							height={250}
							className="scale-70 md:scale-100"
						/>
					</div>
					<h1 className="heading">
						Bakgrund
					</h1>
					<div>
						<p>
							Reliwe AB grundades 2021 med ambitionen att utveckla hållbara, väl genomtänkta bostäder där människor kan trivas över tid. 
							Bolaget består av personer med lång och gedigen erfarenhet inom fastighetsutveckling och bostadsproduktion,
							med en samlad kompetens som omfattar hela processen – från tidiga skeden och projektutveckling till färdigställda bostäder.
						</p>
						<br></br>
						<p>
							För att säkerställa hög kvalitet i såväl gestaltning som funktion samarbetar Reliwe med väletablerade arkitektbyråer och andra erfarna aktörer.
							Genom ett helhetsperspektiv på arkitektur, kvalitet och hållbarhet utvecklar Reliwe bostäder och livsmiljöer som är långsiktigt värdeskapande, 
							både för de boende och för samhället i stort.
						</p>
					</div>
				</div>

			</div>
		</section>
	);
};