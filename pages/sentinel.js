import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
import { useState } from "react";

const Audit = () => {
    const [userInput, setUserInput] = useState("");
    const [apiOutput, setApiOutput] = useState();
    const [isGenerating, setIsGenerating] = useState(false);

    const callGenerateEndpoint = async () => {
        setIsGenerating(true);

        console.log("Calling OpenAI...");
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;
        const linesArray = parseVulnerabilities(output.text);
        const vulnerabilities = linesArray.filter((x) => x !== "" && x !== " ");
        const vulElement = vulnerabilities.map((vul, index) => {
            return (
                <p key={index} className="mt-4">
                    {vul}
                </p>
            );
        });
        console.log(vulnerabilities);
        console.log(vulElement);

        setApiOutput(vulElement);
        setIsGenerating(false);
    };

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    const parseVulnerabilities = (vulnerabilityString) => {
        const vulnerabilities = [];

        vulnerabilityString.split("\n").forEach((line) => {
            vulnerabilities.push(line);
        });

        return vulnerabilities;
    };

    return (
        <div className="text-[#3c3c57]">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="h-[30rem] bg-[#282846] text-white px-6 text-center w-full flex items-center">
                <div className="flex flex-col w-full items-center justify-center md:w-1/2 mx-auto">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Test the security of your Smart Contract
                    </h1>
                    <p className="text-lg mt-10 md:text-xl">
                        Add your smart contract in the app for testing possible
                        vulnerabilities
                    </p>
                </div>
            </div>
            <div className="text-[#575c66] py-20 bg-[#f2f4f7]">
                <div className="bg-[#f9fafb] mx-6 md:mx-auto md:w-2/3 h-fit p-8 rounded shadow-md">
                    <textarea
                        placeholder="Paste your Smart Contract"
                        className="w-full text-[#575c66] rounded p-4 h-[28rem] resize-none bg-[#282c34]"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <div
                        className="bg-[#4f5fe4] uppercase text-sm rounded-lg w-fit mt-4 px-10 py-4 text-white
                        font-semibold tracking-wide md:text-ml hover:bg-[#3645ca] shadow-md"
                    >
                        <a onClick={callGenerateEndpoint}>
                            <div className="generate">
                                {isGenerating ? (
                                    <span>Generating...</span>
                                ) : (
                                    <p>Generate</p>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            {apiOutput && (
                <div className="mt-10 mb-20 mx-auto w-2/3 h-fit p-6 rounded bg-[#232938]">
                    <h3 className="text-xl font-semibold mb-6">Output</h3>

                    {apiOutput}
                </div>
            )}
            <BuildspaceLogo />
        </div>
    );
};

export default Audit;
