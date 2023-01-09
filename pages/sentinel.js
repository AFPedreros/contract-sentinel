import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
import { useState } from "react";

// Audit smart contracts component
export default function Audit() {
    // State variables for user input, vulnerability output, vulnerabilities, recommendations, and loading state
    const [userInput, setUserInput] = useState("");
    const [vulnerabilityOutput, setVulnerabilityOutput] = useState("");

    const [vulnerabilities, setVulnerabilities] = useState("");
    const [recommendations, setRecommendations] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [isSmartContract, setIsSmartContract] = useState(false);

    // Function to call the API to check for vulnerabilities
    async function checkVulnerabilities() {
        // Reset recommendations and set loading state
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
    }

    // Function to call the API to check for recommendations
    async function checkRecommendations() {
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
                <p key={index} className="mt-2">
                    {rec}
                </p>
            );
        });

        setRecommendations(recElement);
        setIsGenerating(false);
    }

    // Function to handle changes to the user input
    function onUserChangedText(e) {
        setUserInput(e.target.value);
    }

    // Function to format a string into an array of lines
    function format(formatString) {
        const array = [];

        // Split the string into lines and add each line to the array
        formatString.split("\n").forEach((line) => {
            array.push(line);
        });

        return array;
    }

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
                        onClick={checkVulnerabilities}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <div className="flex">
                                <svg
                                    class="h-5 mr-2 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span>Generating...</span>
                            </div>
                        ) : (
                            "Generate"
                        )}
                    </button>
                    {isSmartContract && (
                        <button
                            className={`${
                                isGenerating
                                    ? "bg-[#4351C5]"
                                    : "bg-[#4f5fe4] cursor-pointer"
                            } uppercase text-sm rounded-lg w-fit mt-4 px-10 py-3 text-white
                         font-semibold tracking-wide md:ml-4 md:text-ml hover:bg-[#4351C5] shadow-md`}
                            onClick={checkRecommendations}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <div className="flex">
                                    <svg
                                        class="h-5 mr-2 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <span>Generating...</span>
                                </div>
                            ) : (
                                "Code suggestions"
                            )}
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
                        <code>{recommendations}</code>
                    </div>
                )}
            </div>
            <BuildspaceLogo />
        </div>
    );
}
