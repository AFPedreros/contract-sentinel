import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";

const Home = () => {
    return (
        <div className="text-[#3c3c57]">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="h-[30rem] bg-slate-100 px-6 text-center w-full flex items-center">
                <div className="flex flex-col w-full items-center justify-center md:w-1/2 mx-auto">
                    <div className="text-4xl font-bold md:text-5xl">
                        <h1>Audit your smart contracts easy, fast and free.</h1>
                    </div>
                    <div className="text-lg mt-10 md:text-xl">
                        <h2>
                            Find errors an vulnerabilities in smart contracts
                            using this AI-powered tool.
                        </h2>
                    </div>

                    <Link
                        className="bg-[#4f5fe4] uppercase text-sm rounded-lg w-fit m-auto mt-10 px-10 py-4 text-white
                    font-semibold tracking-wide md:text-ml hover:bg-[#3645ca] shadow-md"
                        href="/sentinel"
                    >
                        Audit your contract
                    </Link>
                </div>
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default Home;
