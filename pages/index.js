import Head from "next/head";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import contractSentinelLogo from "../assets/logo.png";

import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN);

// Audit smart contracts component
// TODO: break the vulnerabilities and recommendations in separated components
export default function Home() {
    const SocialLoginDynamic = dynamic(
        () => import("../components/Auth").then((res) => res.default),
        {
            ssr: false,
        }
    );
    // State variables for user input, vulnerability output, vulnerabilities, recommendations, and loading state
    const [userInput, setUserInput] = useState("");
    const [vulnerabilityOutput, setVulnerabilityOutput] = useState("");

    const [vulnerabilities, setVulnerabilities] = useState("");
    const [recommendations, setRecommendations] = useState("");
    const [tab, setTab] = useState(0);

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
        <div className="relative text-[#fff] h-screen md:overflow-hidden">
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <header
                className="absolute top-0 left-0 w-full px-6 py-8 flex items-center my-0
                z-20 md:h-0 md:px-8 bg-[#0f172a] border-b-[1px] border-[#91a0b5]"
            >
                <Link href="/">
                    <div className="flex items-center text-xl font-bold">
                        <Image
                            src={contractSentinelLogo}
                            alt="contract sentinel logo"
                            height={60}
                        />
                        <h1>Contract Sentinel</h1>
                    </div>
                </Link>
                {/* <Suspense fallback={<div>Loading...</div>}>
                    <SocialLoginDynamic />
                </Suspense> */}
            </header>
            <div className="md:flex text-[#575c66] h-full bg-[#fff]">
                <div className="relative bg-[#f9fafb] md:w-1/2 h-full ">
                    <textarea
                        placeholder="Paste your Smart Contract"
                        className="w-full text-white pt-20 pb-14 px-4 resize-none h-full bg-[#1e293b]
                        outline-none  scrollbar scrollbar-thumb-[#787f89] scrollbar-track-transparent scrollbar-rounded-lg"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    {isSmartContract ? (
                        <div className="absolute bottom-0 flex gap-[0.125rem] left-0 w-full">
                            <button
                                className={`${
                                    isGenerating
                                        ? "cursor-wait"
                                        : "cursor-pointer"
                                }  uppercase text-sm rounded-tl-lg w-1/2 px-4 py-4 text-white text-start
                                    font-semibold tracking-wide md:text-ml
                                    bg-[#0f172a] border-[1px] border-[#91a0b5]`}
                                onClick={checkVulnerabilities}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <div className="flex text-[#787f89]">
                                        <svg
                                            className="w-5 h-5 mr-2 text-white animate-spin"
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
                                    "Find Vulnerabilities"
                                )}
                            </button>
                            <button
                                className={`${
                                    isGenerating
                                        ? "cursor-wait"
                                        : "cursor-pointer"
                                } uppercase text-sm rounded-tr-lg w-1/2 px-4 py-4 text-white text-start
                            font-semibold tracking-wide md:text-ml 
                            bg-[#0f172a] border-[1px] border-[#91a0b5]`}
                                onClick={checkRecommendations}
                                disabled={isGenerating}
                            >
                                {isGenerating ? (
                                    <div className="flex text-[#787f89]">
                                        <svg
                                            className="w-5 h-5 mr-2 text-white animate-spin"
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
                                    "get Code suggestions"
                                )}
                            </button>
                        </div>
                    ) : (
                        <button
                            className={`${
                                isGenerating ? "cursor-wait" : " cursor-pointer"
                            } absolute bottom-0 left-0 uppercase text-sm rounded-t-lg w-[99.9%] px-4 py-4 
                        text-white text-start font-semibold tracking-wide md:text-ml
                        bg-[#0f172a] border-[1px] border-[#91a0b5]`}
                            onClick={checkVulnerabilities}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <div className="flex text-[#787f89]">
                                    <svg
                                        className="w-5 h-5 mr-2 text-white animate-spin"
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
                                "Find Vulnerabilities"
                            )}
                        </button>
                    )}
                </div>
                <div className="md:w-1/2 pt-4 md:pt-0 bg-[#f6f7fc]">
                    {vulnerabilities && (
                        <div className="relative bg-[#f9fafb] rounded-lg shadow-xl mx-6 md:mx-auto md:w-4/5 h-[80%] md:mt-24 md:p-8 overflow-y-auto">
                            <div className="absolute text-white left-0 top-0 p-4 flex gap-4 bg-[#0f172a] w-full">
                                <label
                                    className={`cursor-pointer font-bold ${
                                        tab === 0
                                            ? "text-[#4351C5]"
                                            : "text-[#787f89]"
                                    }`}
                                    onClick={() => {
                                        setTab(0);
                                    }}
                                >
                                    Vulnerabilities
                                </label>
                                {recommendations && (
                                    <label
                                        className={`cursor-pointer font-bold ${
                                            tab === 1
                                                ? "text-[#4351C5]"
                                                : "text-[#787f89]"
                                        }`}
                                        onClick={() => {
                                            setTab(1);
                                        }}
                                    >
                                        Code suggestions
                                    </label>
                                )}
                            </div>
                            <h3 className="mt-8 text-xl font-semibold">
                                {tab === 0
                                    ? "Possible vulnerabilities"
                                    : "Recommendations"}
                            </h3>

                            {tab === 0 ? vulnerabilities : recommendations}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
