import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
import { useState } from "react";
import Link from "next/link";

import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);

// Audit smart contracts component
// TODO: break the vulnerabilities and recommendations in separated components
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

        if (!output.text.includes("error")) {
            setIsSmartContract(
                output.text.toLowerCase().includes("vulnerability")
            );
            setVulnerabilityOutput(output.text);

            const linesArray = format(output.text);
            const vulnerabilities = linesArray.filter(
                (x) => x !== "" && x !== " "
            );
            const vulElement = vulnerabilities.map((vul, index) => {
                return (
                    <p key={index} className="mt-4">
                        {vul}
                    </p>
                );
            });
            setVulnerabilities(vulElement);
        } else {
            setVulnerabilities(
                "We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems."
            );
        }

        setIsGenerating(false);
        mixpanel.track("Button Clicked");
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

        if (!output.text.includes("error")) {
            const linesArray = format(output.text);
            const recommendations = linesArray.filter(
                (x) => x !== "" && x !== " "
            );
            const recElement = recommendations.map((rec, index) => {
                return (
                    <p key={index} className="mt-2">
                        {rec}
                    </p>
                );
            });

            setRecommendations(recElement);
        } else {
            setRecommendations(
                "We're experiencing exceptionally high demand. Please hang tight as we work on scaling our systems."
            );
        }
        setIsGenerating(false);
        mixpanel.track("Check Recommendations Clicked");
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
        <div className="relative text-[#3c3c57] h-screen md:overflow-hidden">
            <header
                className="absolute top-0 left-0 w-full px-6 py-6 flex items-center justify-between my-0 mx-auto
        z-20 md:h-16 md:px-8 bg-white"
            >
                <Link className="text-xl font-bold" href="/">
                    Contract Sentinel
                </Link>
            </header>
            <div className="md:flex text-[#575c66] h-full bg-[#f2f4f7]">
                <div className="relative bg-[#f9fafb] md:w-1/2 h-full">
                    <textarea
                        placeholder="Paste your Smart Contract"
                        className="w-full text-white pt-20 pb-14 px-4 resize-none h-full bg-[#282c34]"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <button
                        className={`${
                            isGenerating
                                ? "bg-[#4351C5] cursor-wait"
                                : "bg-[#4f5fe4] cursor-pointer"
                        } absolute bottom-0 left-0 uppercase text-sm rounded-t-lg w-full px-4 py-4 
                        text-white text-start font-semibold tracking-wide md:text-ml hover:bg-[#4351C5]`}
                        onClick={checkVulnerabilities}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <div className="flex">
                                <svg
                                    className="h-5 mr-2 w-5 animate-spin text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
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
                    {/* {isSmartContract && (
                        <button
                            className={`${
                                isGenerating
                                    ? "bg-[#4351C5] cursor-wait"
                                    : "bg-[#4f5fe4] cursor-pointer"
                            } uppercase text-sm rounded-lg w-fit mt-4 px-10 py-3 text-white
                         font-semibold tracking-wide md:ml-4 md:text-ml hover:bg-[#4351C5] shadow-md`}
                            onClick={checkRecommendations}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <div className="flex">
                                    <svg
                                        className="h-5 mr-2 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
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
                    )} */}
                </div>
                {vulnerabilities && (
                    <div className="bg-[#f9fafb] mx-6 md:mx-auto md:w-1/2 h-1/3 p-8 overflow-y-scroll">
                        <h3 className="text-xl font-semibold">
                            Possible vulnerabilities
                        </h3>

                        {vulnerabilities}
                    </div>
                )}
                {/* {recommendations && (
                    <div className="bg-[#f9fafb] mx-6 md:mx-auto md:w-2/3 h-fit p-8 rounded shadow-md mt-10">
                        <h3 className="text-xl font-semibold mb-6">
                            Recommendations
                        </h3>
                        <code>{recommendations}</code>
                    </div>
                )} */}
            </div>
            {/* <BuildspaceLogo /> */}
        </div>
    );
}
