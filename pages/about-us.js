import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
const About = () => {
    return (
        <div>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            About Us
            <BuildspaceLogo />
        </div>
    );
};

export default About;
