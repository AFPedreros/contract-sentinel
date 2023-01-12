import { Analytics } from "@vercel/analytics/react";
import "./styles.css";
import "@biconomy/web3-auth/dist/src/style.css";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
