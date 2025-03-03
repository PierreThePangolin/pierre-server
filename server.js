const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json()); // Allows JSON requests

// Chatbot API route
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "No message provided." });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [{ role: "system", content: "You're Pierre, a streaming recommendation assistant." }, { role: "user", content: userMessage }],
            },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error:", error.response?.data || error.message);
        res.status(500).json({ error: "Error connecting to OpenAI." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Pierre is live on port ${PORT}!`));
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You're Pierre, a streaming recommendation assistant for PangolinRC. Start by recommending White Lotus. If the user says no, suggest Daredevil." },
                { role: "user", content: userMessage }
            ],
        },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ reply: response.data.choices[0].message.content });
});

app.listen(3000, () => console.log("Pierre is live on port 3000!"));
