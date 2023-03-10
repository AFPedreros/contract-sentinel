import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generateAction(req, res) {
    // Run first prompt
    const basePromptPrefix = `Please analyze the smart contract and provide recommendations to improve the vulnerabilities. Follow the next template for each recommendation:
    Recommendation (number): (explanation of the recommendation)
    code example to fix the vulnerability: (write the code just for the lines for fix the vulnerability. Format the code for better readability)
    `;

    try {
        let baseCompletion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${basePromptPrefix}
            ${req.body.input}`,
            temperature: 0.7,
            max_tokens: 700,
        });

        let basePromptOutput = baseCompletion.data.choices.pop();

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
