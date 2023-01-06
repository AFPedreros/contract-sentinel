import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Check if this is a smart contract, if is not a smart contract respond "Please enter a smart contract". If is a smart contract respond "Yes this is a smart contract":
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

    if (basePromptOutput.text.toLowerCase().includes("yes")) {
        const secondPrompt = `Please analyze the smart contract and identify any vulnerabilities it may have. Also, provide a brief explanation of each vulnerability if possible. Follow the next template for each vulnerability:
        Vulnerability (number): (name of the vulnerability)
        (explanation of the vulnerability)
        `;

        baseCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${secondPrompt}
            ${req.body.userInput}`,
            temperature: 1,
            max_tokens: 700,
        });

        basePromptOutput = baseCompletion.data.choices.pop();

        // const thirdPrompt = `Please analyze the smart contract and provide recommendations to improve the vulnerabilities in the list ${basePromptOutput}. Follow the next template for each recommendation:
        // Recommendation (number): (explanation of the recommendation)
        // code example to fix the lines of the vulnerability
        // `;

        // baseCompletion = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: `${thirdPrompt}
        //     ${req.body.userInput}`,
        //     temperature: 1,
        //     max_tokens: 700,
        // });

        // basePromptOutput = baseCompletion.data.choices.pop();
    }

    res.status(200).json({
        output: basePromptOutput,
    });
};

export default generateAction;
