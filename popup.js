const express = require("express");
require('dotenv').config()
const button = document.getElementById('generate-btn');
const messageInput = document.getElementById('input');
const templateOutput = document.getElementById('templateOutput');

button.addEventListener('click', async () => {
  const message = messageInput.value.trim();
  if (message === '') {
    templateOutput.textContent = 'Please enter a message.';
    return;
  }
});
const app = express();
app.get('/', async (req, res) => {
  const completion = await openAI.createCompletion({
    model: "text-davinci-003", // required
    prompt: `Generate an email template for the following message:\n\n${message}\n\n`, // completion based on this
    temperature: 0.6, //
    n: 1,
    max_tokens: 50,
    // stop: "."
});
  message = completion.data.choices[0].text;
  res.send(message)

  const data = await response.json();
  const template = data.choices[0].text.trim();
  if (template === '') {
    throw new Error('Sorry, could not generate email template.');
  }
  //response.send(template)
  return template;
})
