import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Together from "together-ai";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize Together AI
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await together.chat.completions.create({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // You can change this
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Unable to fetch response." });
  }
});

app.get("/", (req, res) => {
  res.send("Chatbot backend is running.");
});

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
