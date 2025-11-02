"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import CookieConsent from "react-cookie-consent";

interface CookieBannerProps {
    gaId: string;
}

export default function CookieBanner({ gaId }: CookieBannerProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const hasConsent = document.cookie.includes("CookieConsent=true");
        if (!hasConsent) {
            setIsVisible(true);
        } else {
            setConsentGiven(true);
        }
    }, []);

    const handleAccept = () => {
        document.cookie = "CookieConsent=true; path=/; max-age=31536000";
        setConsentGiven(true);
        setIsVisible(false);
    };

    const handleDecline = () => {
        setIsVisible(false);
    };

    return (
        <>
            {consentGiven && gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="afterInteractive"
                    />
                    <Script
                        id="ga-init"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${gaId}', { page_path: window.location.pathname });
                            `,
                        }}
                    />
                </>
            )}

            <div className="fixed bottom-0 left-0 w-full z-[9999]">
                {isVisible && (
                    <CookieConsent
                        location="bottom"
                        buttonText="Acceptera"
                        declineButtonText="Avvisa"
                        enableDeclineButton
                        cookieName="CookieConsent"
                        style={{ background: "#dfcfba", padding: "10px 10px" }}
                        buttonStyle={{ backgroundColor: "#dfcfba", color: "black", fontSize: "15px", borderRadius: "5px" }}
                        declineButtonStyle={{
                            color: "black",
                            backgroundColor: "#dfcfba",
                            fontSize: "15px"
                        }}
                        buttonWrapperClasses="flex flex-row w-full md:w-auto justify-between"
                        containerClasses="flex flex-row"
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                    >
                        <p className="!text-sm text-black"><strong>Vi använder cookies för att förbättra din upplevelse.</strong> Du kan acceptera eller avvisa
                        analyscookies.</p>
                    </CookieConsent>
                )}
            </div>
        </>
    );
}