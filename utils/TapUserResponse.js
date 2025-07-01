export async function notifyTelegram(info) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const destinationText =
    info.destination ||
    (info.destinationCity && info.destinationState
      ? `${info.destinationCity}, ${info.destinationState}`
      : 'Not specified');

  const message = `
🛻 *New MovingCo Lead*

👤 *Name:* ${info.fullName || 'Unknown'}
📧 *Email:* ${info.email || 'Not provided'}
📞 *Phone:* ${info.phone || 'Not provided'}

🏠 *From:* ${info.origin || 'Not provided'}
🏡 *To:* ${destinationText}

📅 *Move Date:* ${info.moveDate || 'Not provided'}
📦 *Help Needed:* ${info.helpNeeded || 'Not provided'}
🧾 *Special Items:* ${info.specialItems || 'None'}

💵 *Estimate Given:* ${info.quote || 'N/A'}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('❌ Telegram notification failed:', err);
  }
}
