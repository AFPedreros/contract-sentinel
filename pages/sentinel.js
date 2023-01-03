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
        <div className="text-white">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div className="text-white">
                <div className="mb-10 bg-[#232938] mx-6 md:mx-auto md:w-2/3 h-fit p-8 rounded">
                    <h1 className="text-xl font-semibold mb-2   ">
                        Audit your smart contract
                    </h1>
                    <p className="pb-4 mb-8 border-b border-white">
                        Add your smart contract in the app for testing possible
                        vulnerabilities
                    </p>
                    <textarea
                        placeholder="Paste your Smart Contract"
                        className="w-full rounded p-4 h-[28rem] focus:border focus:outline-none
                        focus:border-[#00B8EE] resize-none bg-[#101727]"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <div
                        className="bg-[#00B8EE] text-md rounded-full w-fit mt-6 px-6 py-2 text-white
                    font-regular tracking-wide cursor-pointer hover:bg-[#017295]"
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
