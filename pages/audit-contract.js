import Head from "next/head";
import Header from "../components/Header";
import BuildspaceLogo from "../components/BuildspaceLogo";
import { useState } from "react";

const Audit = () => {
    const [userInput, setUserInput] = useState("");
    const [apiOutput, setApiOutput] = useState("");
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

        setApiOutput(`${output.text}`);
        setIsGenerating(false);
    };

    const onUserChangedText = (event) => {
        setUserInput(event.target.value);
    };

    return (
        <div>
            <Head>
                <title>Contract Sentinel</title>
            </Head>
            <Header />
            <div>
                <div className="prompt-container">
                    <textarea
                        placeholder="Paste your Smart Contract"
                        className="prompt-box"
                        value={userInput}
                        onChange={onUserChangedText}
                    />
                    <div className="prompt-buttons">
                        <a
                            className={
                                isGenerating
                                    ? "generate-button loading"
                                    : "generate-button"
                            }
                            onClick={callGenerateEndpoint}
                        >
                            <div className="generate">
                                {isGenerating ? (
                                    <span className="loader"></span>
                                ) : (
                                    <p>Generate</p>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            {apiOutput && (
                <div className="output">
                    <div className="output-header-container">
                        <div className="output-header">
                            <h3>Output</h3>
                        </div>
                    </div>
                    <div className="output-content">
                        <p>{apiOutput}</p>
                    </div>
                </div>
            )}
            <BuildspaceLogo />
        </div>
    );
};

export default Audit;
