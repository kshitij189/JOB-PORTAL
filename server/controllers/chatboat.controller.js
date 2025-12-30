import { GoogleGenerativeAI } from "@google/generative-ai";

export const chatboat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Reply briefly in 1–2 lines:\n${message}` }]
          }
        ]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini API Error:", data);
      return res.status(response.status).json({ 
        error: data.error?.message || "API request failed"
      });
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.status(200).json({ message: reply });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};