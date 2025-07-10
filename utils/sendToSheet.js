export async function sendToSheet(sessionId, type, content, timestamp) {
  const webhookURL = 'https://script.google.com/macros/s/AKfycbxnfeVQ4BbmEJv5JzCBjScYKlRr1itE5axjfA9PrNSItAtKMAMSGsvRkC7h6UOlzVdh/exec';

  const payload = {
    sessionId,
    type,         // 'message' or 'estimate'
    content,      // message text or quote string
    timestamp
  };

  try {
    const res = await fetch(webhookURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const text = await res.text();
    console.log('✅ Sent to Google Sheet:', text);
  } catch (err) {
    console.error('❌ Failed to send to Sheet:', err);
  }
}
