export default function Footer() {
    return (
        <footer className="w-full py-8 md:h-[33vh] bg-[var(--reliwe-green-accent)]">
            <div className="h-4/5 flex flex-col md:flex-row items-center gap-8 md:gap-0">
                <div className="flex flex-col items-center w-full md:w-1/3 site-text-size gap-4">
                    <h1 className="text-xl font-semibold">Meny</h1>
                    <div className="text-green text-center">
                        <p>Hem</p>
                        <p>Våra projekt</p>
                        <p>Om oss</p>
                        <p>Kontakt</p>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full md:w-1/3 site-text-size gap-4">
                    <h1 className="text-xl font-semibold">Adress</h1>
                    <div className="text-green text-center">
                        <p>Ingmar Bergmans Gata 2</p>
                        <p>114 34 Stockholm, Sweden</p>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full md:w-1/3 site-text-size gap-4">
                    <h1 className="text-xl font-semibold">Sociala medier</h1>
                    <div className="text-green text-center">
                        <p>LinkedIn</p>
                    </div>
                </div>
            </div>
            <div className="h-1/5 flex justify-center items-center pt-12 md:pt-0">
                <p className="text-sm text-green">© {new Date().getFullYear()} Reliwe Sverige AB</p>
            </div>
        </footer>
    );
}
