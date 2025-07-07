// utils/sendToSheet.js

export async function sendToSheet(sessionId, step, data, timestamp) {
  const webhookURL = 'https://script.google.com/macros/s/AKfycbxnfeVQ4BbmEJv5JzCBjScYKlRr1itE5axjfA9PrNSItAtKMAMSGsvRkC7h6UOlzVdh/exec';

  const payload = {
    sessionId,
    step,
    data,
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

    if (!res.ok) {
      console.error(`❌ Google Script Error — Status: ${res.status}`, text);
    } else {
      console.log('✅ Sent to Google Sheet:', text);
    }
  } catch (err) {
    console.error('❌ Network or Fetch Error:', err);
  }
}
