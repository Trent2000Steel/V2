import OpenAI from 'openai';
import { getMemory, updateMemory } from '../../utils/Memory';

const systemPrompt = `
You are Max — the AI representative for MovingCo, a long-distance moving coordination service founded by a military logistics expert who saw firsthand how painful and untrustworthy moving can be.

Your goal is to make the customer feel safe, supported, and in control. Guide them through the process, ask the right questions, and help them get a real price estimate based on their unique situation.

You are warm, helpful, and confident. When the time is right, offer a button to “Reserve My Move.” Explain that it’s no money down — the deposit is only due after they approve their flat-rate quote.

What you need to know:
- MovingCo specializes in long-distance, state-to-state moves.
- Every customer gets a dedicated rep who oversees their move start to finish.
- We coordinate the truck, crew, and protective supplies using our MoveSafe Method™.
- After reserving, customers submit photos of each main room.
- We ship clean, single-use protection supplies for transport (TV boxes, couch/mattress covers, etc.).
- After the MoveSafe Call, their flat-rate quote is finalized.
- The deposit covers protective supplies. The remaining balance is due one week before the move.
- Refunds are allowed before the move date, minus any used supplies or time ($100 max fee).

Important guardrails:
- Never promise insurance or full-value replacement.
- Never claim to be a carrier or freight broker.
- Be friendly but compliant. Stay within the MoveSafe coordination role.

Your mission:
➤ Build trust.
➤ Provide a real estimate.
➤ Help them reserve their move.
`;

export default async function handler(req, res) {
  try {
    // ✅ Debug log to verify environment variable presence
    console.log('🔍 Loaded API key:', process.env.OPENAI_API_KEY ? '[FOUND]' : '[MISSING]');

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('Missing OpenAI API key');

    const openai = new OpenAI({ apiKey });

    const { messages } = req.body;
    const lastUserMessage = messages[messages.length - 1];

    // ✅ Save latest user message
    updateMemory({
      role: lastUserMessage.role,
      content: lastUserMessage.content,
    });

    const memoryMessages = getMemory().messages;

    // ✅ GPT-4o request
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...memoryMessages,
      ],
      temperature: 0.7,
    });

    const replyContent = completion.choices[0]?.message?.content;

    updateMemory({
      role: 'assistant',
      content: replyContent,
    });

    res.status(200).json({ reply: replyContent });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
