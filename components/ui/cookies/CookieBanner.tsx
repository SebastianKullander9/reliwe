"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

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
		document.cookie = "CookieConsent=true; path=/; max-age=31536000; SameSite=Lax";
		setConsentGiven(true);
		setIsVisible(false);
		
		setTimeout(() => {
			if (window.gtag) {
				window.gtag('config', gaId, { page_path: window.location.pathname });
			}
		}, 1000);
	};

    const handleDecline = () => {
        document.cookie = "CookieConsent=false; path=/; max-age=31536000; SameSite=Lax";
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

			{isVisible && (
				<div className="fixed bottom-0 left-0 w-full z-[9999] bg-[#dfcfba] body-x-padding py-12 md:py-8 flex flex-col md:flex-row md:justify-between items-vertical-gap !text-sm md:items-center">
					<p className="text-black !text-sm">
						<strong className="font-bold">Vi använder cookies för att förbättra din upplevelse. </strong> 
						Du kan acceptera eller avvisa
						analyscookies.
					</p>
					<div className="flex md:flex-row md:gap-12 justify-between">
						<button 
							className="cursor-pointer hover:bg-[#d9c6ad] md:p-2 rounded-sm transition-colors duration-250"
							onClick={handleDecline}
						>
							Avvisa
						</button>
						<button 
							className="underline underline-offset-2 md:no-underline cursor-pointer hover:bg-[#d9c6ad] md:p-2 rounded-sm transition-colors duration-250"
							onClick={handleAccept}
						>
							Acceptera
						</button>
					</div>
				</div>
			)}
        </>
    );
}