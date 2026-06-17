const express = require("express");
const OpenAI = require("openai");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());
const port = 3000;

// Initialize the OpenAI instance with the configured API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.LLM_API_KEY || ''
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to read the JSON file containing exhibit descriptions
function readDescriptionsFromFile() {
    const filePath = path.join(__dirname, 'public', 'descriptions.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading descriptions file:', err);
        return [];
    }
}


app.post('/getResponse', async (req, res) => {
    const userInput = req.body.userInput;
    console.log("User input:", userInput);

    // Read exhibit descriptions from JSON file
    const descriptions = readDescriptionsFromFile();

    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        temperature: 1,
        max_tokens: 256,
        top_p: 0.1,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages: [
            {
                "role": "system",
                "content": "You are an expert in exhibits. Your task is to rate the exhibits based on user input. First, read all the requirements from the JSON file 'descriptions.json' which contains all exhibit descriptions. Assign a ranking from 0 to 5 to each exhibit based on how well it aligns with the user's requirements, with 5 being a perfect match, 4 being a very good match, 3 being a good match, 2 being an average match, 1 being a poor match, and 0 being not relevant. List all exhibit names and their rankings in a numbered list format. If an exhibit does not meet the requirements, assign it a ranking of 0. Always list the nodes and rankings. Do not write any additional sentences except what you are asked for. Here are the exhibits to rank: " + descriptions.map(exhibit => `${exhibit.panoid} - ${exhibit.description}`).join(', ')
            },
            {
                "role": "user",
                "content": userInput
            },
            {
                "role": "system",
                "content": "Write the ranking for all 9 exhibits in a numbered list format: number. node - title - ranking ."
            },
            {
                "role": "system",
                "content": "Find the highest-ranking exhibit and write it in form 'Chosen exhibit is: node'."
            }
        ]
    });

    const content = response.choices[0].message.content;
    console.log("Response content:", content);

    // Extract the node of the highest-ranking exhibit from the response content
    const chosenExhibitMatch = content.match(/Chosen exhibit is: (\S+)/);
    const chosenExhibitNode = chosenExhibitMatch ? chosenExhibitMatch[1] : null;

    // Send the highest-ranking exhibit node ID to the client
    res.json({ highestRankingExhibit: chosenExhibitNode });
});

app.listen(port, () => {
  console.log("Server started");
});
