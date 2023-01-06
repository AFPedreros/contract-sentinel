import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
import { useState } from "react";

const Audit = () => {
    const [userInput, setUserInput] = useState("");
    const [vulnerabilityOutput, setVulnerabilityOutput] = useState("");

    const [vulnerabilities, setVulnerabilities] = useState("");
    const [recommendations, setRecommendations] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSmartContract, setIsSmartContract] = useState(false);

    const callCheckVulnerabilities = async () => {
        setRecommendations("");
        setIsGenerating(true);

        console.log("Calling OpenAI...");
        const response = await fetch("/api/generateVulnerabilities", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        const { output } = data;

        setIsSmartContract(output.text.toLowerCase().includes("vulnerability"));
        setVulnerabilityOutput(output.text);

        const linesArray = format(output.text);
        const vulnerabilities = linesArray.filter((x) => x !== "" && x !== " ");
        const vulElement = vulnerabilities.map((vul, index) => {
            return (
                <p key={index} className="mt-4">
                    {vul}
                </p>
            );
        });

        setVulnerabilities(vulElement);
        setIsGenerating(false);
    };

    const callCheckRecommendations = async () => {
        setIsGenerating(true);
        const input = `${userInput}
        ${vulnerabilityOutput}
        `;

        console.log("Calling OpenAI...");
        const response = await fetch("/api/generateRecommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
        });

        const data = await response.json();
        const { output } = data;

        const linesArray = format(output.text);
        const recommendations = linesArray.filter((x) => x !== "" && x !== " ");
        const recElement = recommendations.map((rec, index) => {
            return (
                <p key={index} className="mt-4">
                    {rec}
                </p>
            );
        });

        setRecommendations(recElement);
        setIsGenerating(false);
    };

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    const format = (formatString) => {
        const array = [];

        formatString.split("\n").forEach((line) => {
            array.push(line);
        });

        return array;
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
                        Test the security of your smart contracts.
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
                        className="w-full text-white rounded p-4 h-[28rem] resize-none bg-[#282c34]"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <button
                        className={`${
                            isGenerating
                                ? "bg-[#4351C5]"
                                : "bg-[#4f5fe4] cursor-pointer"
                        } uppercase text-sm rounded-lg w-fit mt-4 px-10 py-3 text-white
                         font-semibold tracking-wide md:text-ml hover:bg-[#4351C5] shadow-md`}
                        onClick={callCheckVulnerabilities}
                        disabled={isGenerating}
                    >
                        {isGenerating ? "Generating..." : "Generate"}
                    </button>
                    {isSmartContract && (
                        <button
                            className={`${
                                isGenerating
                                    ? "bg-[#4351C5]"
                                    : "bg-[#4f5fe4] cursor-pointer"
                            } uppercase text-sm rounded-lg w-fit mt-4 px-10 py-3 text-white
                         font-semibold tracking-wide md:ml-4 md:text-ml hover:bg-[#4351C5] shadow-md`}
                            onClick={callCheckRecommendations}
                            disabled={isGenerating}
                        >
                            {isGenerating
                                ? "Generating..."
                                : "Code suggestions"}
                        </button>
                    )}
                </div>
                {vulnerabilities && (
                    <div className="bg-[#f9fafb] mx-6 md:mx-auto md:w-2/3 h-fit p-8 rounded shadow-md mt-10">
                        <h3 className="text-xl font-semibold mb-6">
                            Possible vulnerabilities
                        </h3>

                        {vulnerabilities}
                    </div>
                )}
                {recommendations && (
                    <div className="bg-[#f9fafb] mx-6 md:mx-auto md:w-2/3 h-fit p-8 rounded shadow-md mt-10">
                        <h3 className="text-xl font-semibold mb-6">
                            Recommendations
                        </h3>

                        {recommendations}
                    </div>
                )}
            </div>
            <BuildspaceLogo />
        </div>
    );
};

export default Audit;
