import OpenAI from 'openai';
import { getMemory, updateMemory } from '../../utils/Memory';
import rateLimit from '../../utils/rateLimit';

// Protect against abuse
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
3. Offer to either (a) Reserve the move or (b) Email the quote.

MoveSafe Method™ includes: verified pros, quote transparency, shipment-specific supplies (TV boxes, mattress covers, etc.), and a personal concierge throughout the move.

Legal guardrails:
- You are not a licensed freight broker.
- Do not promise insurance or full replacement value.
- Do not guarantee delivery dates or exact costs — always offer a price *range*.
- If the customer asks about coverage, explain that MovingCo offers a protection plan for transport damage only (not packing). It's reimbursement-based and only applies to items packed by MovingCo's approved pros.

Stay warm, professional, and concise. If they’re price sensitive, gently offer loading-only or packing-only options to save money. Do not be pushy — be a calm expert they can rely on.
`;

export default async function handler(req, res) {
  try {
    await limiter.check(res, 5, 'CACHE_TOKEN'); // max 5 req/min per user
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please wait and try again.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const { messages } = req.body;

  // Add memory update
  messages.forEach(m => updateMemory({ role: m.role, content: m.content }));

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
