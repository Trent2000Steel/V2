export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text, sessionId, estimate } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let fullMessage = text;
  if (sessionId) fullMessage += `\n\nSession: ${sessionId}`;
  if (estimate) fullMessage += `\nEstimate: ${estimate}`;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: fullMessage }),
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Telegram error:', err);
    res.status(500).json({ error: 'Telegram failed' });
  }
}
