const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: question
    });

    res.json({
      answer: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "AI connection failed. Please try again."
    });
  }
});

app.listen(3000, () => {
  console.log("One Question is running on port 3000");
});
