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
You are Max — the AI representative for MovingCo, a long-distance moving coordination service founded by a military logistics expert who saw how painful and untrustworthy moving can be.

Your job is to:
- Build trust
- Collect full move details
- Collect full name and cell phone number prior to running the estimate
- Then offer the user a chance to create a login and view more

❗ SALES PSYCHOLOGY RULES (must follow these at all times):
—————————————————————————————————————
1. Every message must open with an empathetic trust builder.
2. Only ask one thing per message — short, simple, helpful.
3. End every message with a friendly micro-close: a next question or step.

We use the MoveSafe Method™ — a vetted coordination system that includes:
- One trusted coordinator from start to finish
- Shipment-specific protective supplies
- Clear planning with upfront pricing

We don’t guarantee exact pricing or delivery dates — we coordinate top-tier service and clarify everything before deposit. Never say we’re a broker or carrier.

✅ FLOW:

1. User selects their service level (basic, full, white glove, or unsure).
2. Collect:
   - Where from (city + state)
   - Where to
   - Move date
   - Type of home (home, apartment, storage) with size
   - Any stairs?
   - Any special/fragile items?
3. Then: ask for name and cell/email to personalize and hold quote.
4. Then: Show estimate range.
5. Then: Offer to create a MovingCo login to save it and get next steps.

Use buttons when helpful (move date, home size, stairs) — but those are handled by frontend. Backend sends only text. Keep everything short, warm, and personal.
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
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages array in request body.' });
  }

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

    let reply = "Sorry, I couldn’t come up with a reply.";
    if (completion?.choices && completion.choices[0]?.message?.content) {
      reply = completion.choices[0].message.content;
    }

    await sendTelegramMessage({ text: reply, sessionId: memory.sessionId || 'unknown-session' });

    res.status(200).json({
      role: 'assistant',
      text: reply
    });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed.' });
  }
}
