import Link from "next/link"
import Image from "next/image"
import Button from "../button"

export default function Header() {
    return (
        <nav className="w-full flex flex-row px-12 container mx-auto py-6 items-center justify-between">
            <div>
                <Link href="/">
                    <Image src="/logo/reliwe-logo.png" alt="A logo for the company" width={86} height={86} />
                </Link>
            </div>
            <ul className="flex gap-8 text-lg text-[var(--reliwe-green)] font-semibold">
                <Link href="/vara-projekt">
                    <li>Våra projekt</li>
                </Link>
                <Link href="/om-oss">
                    <li>Om oss</li>
                </Link>
                <Link href="/kontakt">
                    <li>Kontakt</li>
                </Link>
            </ul>
            <div>
                <Button label="Anmäl intresse" />
            </div>
        </nav>
    )
}