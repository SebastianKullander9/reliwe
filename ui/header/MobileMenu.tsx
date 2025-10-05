import Link from "next/link";
import AnimatedButton from "../button/AnimatedButton";

export default function MobileMenu({ isOpen }: { isOpen: boolean }) {
    return (
        <div className={`${isOpen ? "translate-y-0" : "translate-y-full"} transition-transform duration-300 fixed inset-0 bg-white z-[50]`}>
            <div className="h-full flex flex-col justify-center items-center text-center gap-12">
                <div className="flex flex-col gap-4 site-x-padding normal-heading text-[var(--reliwe-green)]">
                    <Link href="/vara-projekt">
                        <h1>Våra projekt</h1>
                    </Link>
                    <Link href="/om-oss">
                        <h1>Om oss</h1>
                    </Link>
                    <Link href="/kontakt">
                        <h1>Kontakt</h1>
                    </Link>
                </div>

                <div>
                    <AnimatedButton label="Anmäl intresse" color="darkGreen" />
                </div>

                <div className="absolute bottom-4">
                    <p className="site-text-size text-[var(--reliwe-green)]">© 2024 Reliwe Sverige AB</p>
                </div>
            </div>
        </div>
    )
}

