import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Check if this is a smart contract:
`;
const generateAction = async (req, res) => {
    // Run first prompt

    let baseCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${basePromptPrefix}
        ${req.body.userInput}`,
        temperature: 0.5,
        max_tokens: 700,
    });

    let basePromptOutput = baseCompletion.data.choices.pop();
    // console.log(basePromptOutput.text);

    if (basePromptOutput.text.toLowerCase().includes("yes")) {
        const secondPrompt = `Please analyze this smart contract and identify any vulnerabilities it may have. Also, provide a brief explanation of each vulnerability if possible:
        `;

        baseCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${secondPrompt}
            ${req.body.userInput}`,
            temperature: 1,
            max_tokens: 700,
        });

        basePromptOutput = baseCompletion.data.choices.pop();
    }
    console.log(basePromptOutput);

    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
