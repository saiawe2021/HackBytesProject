const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey:"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",
});

const userInput = 'Success Tips';

const getResponse = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'Format my day into a schedual: 1. Math, 4hrs, 2. language arts, 2 hrs. I eat 3 meals a day, i go to bed a 9pm and get up at 7am.',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(response.choices[0].message);
};

getResponse();