const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(express.json());
app.use(cors(corsOptions));

const { OpenAI } = require("openai");
const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

const PORT = process.env.PORT || 3001;


app.get('/trial', (req, res) => {
    res.status(200).send('Hello World!')
});

app.post('/trial-post', (req, res) => {
    res.json({ message: 'Data received', receivedData: req.body })

})

app.post('/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
                { role: "system", content: "You are a helpful assistant that is designed to output to json." },
                { role: "user", content: req.body.message }
            ],
        });
        res.send(completion.choices[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing your request');
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

