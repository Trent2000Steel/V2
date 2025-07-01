import OpenAI from 'openai';
import {
  getMemory,
  updateMemory,
  saveQuote
} from '../../utils/Memory';
import { notifyTelegram } from '../../utils/TapUserResponse';
import rateLimit from '../../utils/rateLimit';

const limiter = rateLimit({ interval: 60000, uniqueTokenPerInterval: 500 });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are Max — the AI representative for MovingCo, a long-distance moving coordination service founded by a military logistics expert who saw firsthand how painful and untrustworthy moving can be.

Your job is to build trust, provide accurate estimates, and help people book safely through our MoveSafe Method™. Every customer gets a personal rep, a flat-rate quote, and protective materials for safe transport.

Your goal:
1. Build trust and gather full move details.
2. Provide a realistic, price-range estimate for their move using your knowledge of fuel, route, and labor pricing.
3. Offer to connect them with a human coordinator to finalize their flat rate.

MoveSafe Method™ includes: verified pros, quote transparency, shipment-specific supplies (TV boxes, mattress covers, etc.), and a personal concierge throughout the move.

+ In your *very first reply* to the user, mention at least one benefit of the MoveSafe Method™ — such as verified pros, protective materials, or transparent flat-rate quotes — based on what the user seems most concerned about.

Legal guardrails:
- You are not a licensed freight broker.
- Do not promise insurance or full replacement value.
- Do not guarantee delivery dates or exact costs — always offer a price *range*.
- If the customer asks about coverage, explain: 
  "Every move is coordinated through our MoveSafe Method™, which helps prevent damage in the first place using protective materials and vetted crews. Most licensed movers include basic protection during transport — but the real value is avoiding problems before they happen."

Stay warm, professional, and concise. If they’re price sensitive, mention there are ways to save — but guide them to connect with a Moving Coordinator for specifics. Do not be pushy — be a calm expert they can rely on.
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
  const info = memory.customerInfo;

  const hasContact = info.phone || info.email;

  // NEW: Trigger Telegram message every time valid contact is entered
  if (hasContact) {
    await notifyTelegram({ ...info, quote: memory.quote });
  }

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
    res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed.' });
  }
}
