export default function Footer() {
    return (
        <footer className="w-full h-[33vh] bg-[var(--reliwe-green-accent)]">
            <div className="h-4/5 flex flex-row items-center">
                <div className="flex flex-col items-center w-1/3 site-text-size text-gray-900 gap-4">
                    <h1 className="text-xl font-semibold">Meny</h1>
                    <div className="text-gray-700 text-center">
                        <p>Hem</p>
                        <p>Våra projekt</p>
                        <p>Om oss</p>
                        <p>Kontakt</p>
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/3 site-text-size text-gray-900 gap-4">
                    <h1 className="text-xl font-semibold">Adress</h1>
                    <div className="text-gray-700 text-center">
                        <p>Ingmar Bergmans Gata 2</p>
                        <p>114 34 Stockholm, Sweden</p>
                    </div>
                </div>
                <div className="flex flex-col items-center w-1/3 site-text-size text-gray-900 gap-4">
                    <h1 className="text-xl font-semibold">Sociala medier</h1>
                    <div className="text-gray-700 text-center">
                        <p>LinkedIn</p>
                    </div>
                </div>
            </div>
            <div className="h-1/5 flex justify-center items-center">
                <p className="text-sm">© {new Date().getFullYear()} Reliwe Sverige AB</p>
            </div>
        </footer>
    );
}

            /*<div className="w-full h-[50vh] bg-[var(--reliwe-green-accent)] text-white flex flex-row justify-between px-12 py-12">
                <div>
                    <p>Ingmar Bergmans Gata 2</p>
                    <p>114 34 Stockholm, Sweden</p>
                </div>
                <div>
                    Linkedin
                </div>
                <div className="flex flex-row gap-4">
                    <p>Hem</p>
                    <p>Våra projekt</p>
                    <p>Om oss</p>
                    <p>Kontakt</p>
                </div>
                <div className="relative">
                    <p className="absolute whitespace-nowrap bottom-0">© 2024 Reliwe Sverige AB | info@reliwe.se</p>
                </div>
            </div>*/