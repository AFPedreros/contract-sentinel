import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
