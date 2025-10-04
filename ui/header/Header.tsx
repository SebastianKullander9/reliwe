import Link from "next/link"
import Image from "next/image"
import Button from "../button"

export default function Header() {
    return (
        <nav className="fixed top-0 z-10 w-full flex flex-row px-12 mx-auto py-3 items-center justify-between">
            <div className="invisible">
                <Link href="/">
                    <Image src="/logo/reliwe-logo.png" alt="A logo for the company" width={70} height={70} />
                </Link>
            </div>
            <ul className="flex gap-8 text-lg text-[var(--reliwe-green-accent)] ">
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
                <button className={`px-4 py-2 text-lg border-1 rounded-full text-[var(--reliwe-green-accent)]`}>
                    Anmäl intresse
                </button>
            </div>
        </nav>
    )
}