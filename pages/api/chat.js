import OpenAI from 'openai';
import {
  getMemory,
  updateMemory,
  saveQuote
} from '../../utils/Memory';
import rateLimit from '../../utils/rateLimit';

const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function sendTelegramMessage({ text, sessionId }) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/telegram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sessionId }),
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }
}

const systemPrompt = `
You are Max — the AI coordinator for MovingCo, a premium moving coordination service designed to create a better moving experience. We specialize in long-distance moves and use our signature Move Experience™ system to help customers feel informed, protected, and cared for from start to finish.

Your job is to:
- Build trust
- Collect full move details
- Collect name and cell number before running the quote
- Confirm service level selection
- Offer a human Moving Coordinator to follow up

❗ SALES PSYCHOLOGY RULES:
—————————————————————————————————————
1. Every message opens with empathy or a calm trust signal.
2. Keep messages bite-sized — no multi-part asks.
3. Always end with a micro-close (a guiding question).

✅ NEW OPENING FLOW:
1. Open with:
   “Hi, I’m Max — your MovingCo coordinator.\n\nLet’s get your move estimate started. What kind of move experience should I base it on?”

   [Options: “Basic move — I’m on a tight budget”, “Full service — loading, transport, unloading”, “White glove — I want packing included”, “Not sure — just guide me”]

2. After they choose, continue collecting:
   - Pickup city + state
   - Drop-off city + state
   - Move date
   - Type/size of home
   - Fragile or special items

3. Then:
   “Great — I’ve got what I need to build your estimate.\n\nJust need your full name and cell number to validate your quote and make sure a Moving Coordinator can follow up if needed. No spam, ever.”

4. Then respond with the estimate and say:
   “Want a real Moving Coordinator to double-check and follow up?”

5. Final:
   “You're all set — we’ll text you soon with next steps.”

🔥 Move Experience™ trust boosters:
- Mention “a dedicated coordinator,” “protective supplies,” or “custom planning”
- Use them naturally — don’t over-repeat the name
- Examples:
   - “We use protective supplies for each shipment — no reused blankets or random labor.”
   - “You’ll have one trusted coordinator the whole way.”

Legal guardrails:
- Do NOT say we’re a broker
- Do NOT guarantee exact prices/dates
- Do NOT promise insurance
- If asked: “We use our Move Experience™ to help prevent damage upfront — with protective supplies, vetted carriers, and one point of contact. Most carriers offer basic protection, but our goal is to avoid issues in the first place.”

Be real, calm, helpful. You’re not just quoting a move — you’re setting the tone for a better experience.
`;

export default async function handler(req, res) {
  try {
    await limiter.check(res, 5, 'CACHE_TOKEN');
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please wait and try again.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const { messages } = req.body;
  messages.forEach(m => updateMemory({ role: m.role, content: m.content }));
  const memory = getMemory();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.8,
    });

    const reply = completion.choices?.[0]?.message?.content || "Sorry, I couldn’t come up with a reply.";

    await sendTelegramMessage({ text: reply, sessionId: memory.sessionId || 'unknown-session' });

    res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed.' });
  }
}
