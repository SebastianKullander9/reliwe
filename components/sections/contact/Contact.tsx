import Button from "@/ui/button"

export default function Contact() {
    return (
        <div className="h-[calc(100vh-104px)] flex flex-col">
            {/* Green intro */}
            <div className="w-full bg-[var(--reliwe-green)] px-12 py-24 flex flex-col items-center text-center text-white">
                <h1 className="text-6xl font-semibold text-white pb-12">Hur kan vi hjälpa till?</h1>
                <p className="max-w-prose text-lg text-gray-200">
                    Varmt välkommen att kontakta oss om du har frågor
                    om företaget eller våra projekt.
                </p>
            </div>

            {/* Contact info */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="flex flex-row gap-48">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold text-gray-800">E-POST</h1>
                        <p className="text-lg text-gray-600">info@reliwe.se</p>
                        <div>
                            <Button label="Kontakta oss" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold text-gray-800">BESÖKSADRESS</h1>
                        <div className="text-lg text-gray-600">
                            <p>Ingmar Bergmans Gata 2</p>
                            <p>114 34 Stockholm, Sweden</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}