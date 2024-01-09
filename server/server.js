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
