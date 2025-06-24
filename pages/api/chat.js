// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

let memory = {
  origin: "",
  destination: "",
  moveDate: "",
  homeSize: "",
  priorities: "",
  specialItems: "",
  helpNeeded: ""
};

export default async function handler(req, res) {
  const { messages } = req.body;

  const systemPrompt = `
You are Max, the MoveSafe Concierge for MovingCo. Your job is to guide the customer through planning a flat-rate move. You collect the move details naturally, help them feel calm and confident, and prepare them for a review by the MoveSafe team.

You always try to gather:
- Where they're moving from and to
- Their move date
- Size and type of home
- Any stairs/elevators
- Fragile or high-value items
- Packing/loading help needed
- Priorities or concerns (e.g., budget, timing)

NEVER promise insurance. You are not a carrier. Be warm, clear, and human. Respond one message at a time like a real concierge.
  `;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages
    ],
    temperature: 0.7
  });

  res.status(200).json({ reply: response.data.choices[0].message.content });
}
