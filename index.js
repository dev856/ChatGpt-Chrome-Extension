const express = require("express");
require('dotenv').config()
const {
    Configuration,
    OpenAIApi
} = require("openai");
var cors = require('cors')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
const port = 4000;
const openAI = new OpenAIApi(configuration);
app.use(cors())
app.get('/', async (req, res) => {
    // console.log(req.query)
    let message
    try {
        const completion = await openAI.createCompletion({
            model: "text-davinci-003", // required
            prompt: `Generate an email template for the following message:\n\n${message}\n\n`, // completion based on this
            temperature: 0.6, //
            n: 1,
            max_tokens: 50,
            // stop: "."
        });
        message = completion.data.choices[0].text;
        // message = "message" + Math.random();
    } catch (error) {
        if (error.response) {
            message = "There was an issue with the server";
        } else { // error getting response
            message = "An error occurred during your request.";
        }
    }
    res.send(message)
})
app.listen(port, () => {
    console.log(`Server running ${port}`)
})