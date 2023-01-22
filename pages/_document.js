import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta
                    property='og:title'
                    content='GPT-3 Smart Contract Auditor'
                    key='title'
                />
                <meta
                    property='og:description'
                    content='build in N&W S2'
                    key='description'
                />
                <meta
                    property='og:image'
                    content='https://c0.wallpaperflare.com/preview/483/913/258/advanced-ai-anatomy-artificial.jpg'
                />
                <meta name='twitter:card' content='summary_large_image'></meta>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
