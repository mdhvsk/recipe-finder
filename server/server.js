const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/api/query-openai', async (req, res) => {
    const { query } = req.body;
    // Call the OpenAI API with the query
    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: query,
                max_tokens: 100, // Adjust as needed
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error querying OpenAI' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// import OpenAI from "openai";

// const openai = new OpenAI();

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "You are a helpful assistant." }],
//         model: "gpt-3.5-turbo",
//     });

//     console.log(completion.choices[0]);
// }

// main();