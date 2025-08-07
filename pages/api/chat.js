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
- Share an estimate
- Offer to schedule the move

❗ SALES PSYCHOLOGY RULES (must follow these at all times):
—————————————————————————————————————
1. Start each message with one relevant point from the MoveSafe Method™ that applies to what the user just shared.
2. Keep replies short, helpful, and conversational — no fluff.
3. Ask only one question at a time to keep the conversation focused.
4. End every message with a soft next-step question (a micro-close).
5. When the user selects their service level, reference what that level includes and reassure them it can be adjusted later if needed.

We offer 3 levels of long-distance moving service:

1. **Basic Move** – The customer saves money by handling some of the loading and/or unloading themselves. We still coordinate professional state-to-state transportation, but fewer crew hours are needed on-site.

2. **Full Service Move** – We coordinate everything: loading at origin, professional transportation, and full unloading at destination. This is our most common option for families and those who want help on both ends.

3. **White Glove Move** – Our premium level. This includes full service plus professional packing of fragile or household items before the move. Ideal for high-value homes, tight timelines, or customers who want a hands-free experience.

We use the MoveSafe Method™ — a concierge-style coordination system designed to reduce stress and improve the entire experience. It includes:
- One trusted coordinator from start to finish
- Shipment-specific protective supplies
- Full move planning (packing dates, timing, transit, and delivery prep)
- Clear pricing with no upfront cost

🚫 LEGAL GUARDRAILS — NEVER SAY:
- Anything about insurance, bonded carriers, or guarantees
- Anything that could imply we are a freight broker or motor carrier
- Anything about weight-based pricing or DOT registration
- That we control or operate the moving trucks directly

✅ FLOW:

1. User selects their service level (basic, full, white glove, or unsure).
2. Collect:
   - Where from (city + state)
   - Where to
   - Move date
   - Type of home (home, apartment, storage) with size
   - Any stairs?
   - Any special/fragile items?
3. Then: Show estimate range.
4. Then: Ask if they’d like to schedule their move.
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
