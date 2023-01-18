import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generateAction(req, res) {
    // Run first prompt
    const basePromptPrefix = `Check if this is a Ethereum solidity smart contract with his constructor:
    ${req.body.userInput}
    If is not a Ethereum solidity smart contract with his constructor respond only the words: "Please enter a smart contract.".
    If is a smart contract respond "Yes this is a smart contract".
    `;

    try {
        let baseCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${basePromptPrefix}`,
            temperature: 0.5,
            max_tokens: 700,
        });

        let basePromptOutput = baseCompletion.data.choices.pop();

        if (basePromptOutput.text.toLowerCase().includes("yes")) {
            const secondPrompt = `Please analyze this smart contract:
            ${req.body.userInput}
            Identify any vulnerabilities the smart contract may have. Also, provide a brief explanation of each vulnerability if possible. Follow the next template for each vulnerability:
            Vulnerability (number): (name of the vulnerability)
            (explanation of the vulnerability)
            If the smart contract doesn't have vulnerabilities respond "Didn't find any common vulnerability.".
            `;

            baseCompletion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `${secondPrompt}`,
                temperature: 0.7,
                max_tokens: 700,
            });

            basePromptOutput = baseCompletion.data.choices.pop();
        }

        res.status(200).json({
            output: basePromptOutput,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            output: { text: "error" },
        });
    }
}
