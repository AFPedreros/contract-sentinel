import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

import ReactGA from "react-ga";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-EKG0Q9HPVR";
ReactGA.initialize(GA_MEASUREMENT_ID);

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />

            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}');
    `}
            </Script>
        </>
    );
}
