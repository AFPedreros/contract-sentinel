import { Analytics } from "@vercel/analytics/react";
import "./styles.css";

import ReactGA from "react-ga";

const { GA_MEASUREMENT_ID } = process.env;
ReactGA.initialize(GA_MEASUREMENT_ID);

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
