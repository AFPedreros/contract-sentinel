import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";

// About page component
export default function About() {
    return (
        <div className="text-[#3c3c57]">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="h-[30rem] bg-slate-100 px-6 text-center w-full flex items-center">
                <div className="flex flex-col w-full items-center justify-center md:w-1/2 mx-auto">
                    <h1 className="text-4xl font-bold  md:text-5xl">
                        We empower teams through AI smart contract auditing.
                    </h1>
                </div>
            </div>
            <div className="md:w-1/2 mx-6 md:mx-auto my-20">
                <h1 className="text-2xl font-semibold mb-0">Our mission</h1>
                <p className="my-6 w-fit mx-auto">
                    Our mission is to provide fast and easy-to-use AI-powered
                    auditing for smart contracts. Our goal is to assist small
                    and medium size teams in checking their contracts, so they
                    can focus on building and shipping their products. While our
                    app is not meant to replace enterprise-level audits, it is
                    designed to help ensure the security and reliability of
                    smart contracts, particularly for teams that may not have
                    the resources or expertise to conduct thorough manual
                    audits. By providing a simple and efficient solution for
                    auditing smart contracts, we hope to empower teams to
                    confidently use this powerful technology and continue
                    pushing the boundaries of what is possible.
                </p>
            </div>
            <BuildspaceLogo />
        </div>
    );
}
