const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey:"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",
});


const getResponse = async () => {
    const response = await openai.chat.completions.create ({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'TasksToSchedual:Math,LA,breaks,3Meals(breakfast,lunch,dinner),BedAt9pmUpAt7am.ReturnOneLineWithJsonFormat(title:[StartTime,EndTime]).UseMilitaryTime.RemoveAllWhitespace',
            },
        ],
        temperature: 0,
        max_tokens: 500,
        top_p: .1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    console.log(response.choices[0].message);
};

getResponse();