import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";

const Home = () => {
    return (
        <div>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className=" flex flex-col justify-center text-center max-w-4xl m-auto">
                <div className=" pt-28 text-5xl">
                    <h1>Audit your smart contracts easy, cheap and fast.</h1>
                </div>
                <div className="header-subtitle pt-10 text-xl">
                    <h2>
                        Find errors an vulnerabilities in smart contracts using
                        this AI-powered tool.
                    </h2>
                </div>

                <Link
                    className=" bg-black rounded-2xl w-fit m-auto mt-10 px-10 py-4 text-white
                    text-xl font-semibold tracking-wide"
                    href="/audit-contract"
                >
                    Audit Smart Contract
                </Link>
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default Home;
