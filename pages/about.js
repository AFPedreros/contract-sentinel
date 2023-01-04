import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
const About = () => {
    return (
        <div className="text-[#3c3c57]">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="h-[30rem] bg-slate-100 px-6 text-center w-full"></div>
            <div className="w-1/2 mx-auto my-20">
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
                    pushing the boundaries of what is possible.l
                </p>
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default About;
