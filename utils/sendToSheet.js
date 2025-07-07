// utils/sendToSheet.js

export async function sendToSheet(sessionId, step, data, timestamp) {
  const webhookURL = 'https://script.google.com/macros/s/AKfycbxKDHzODFVzdVMkkoLZTB-oaSphXX6NJpsxJOE-tB0/exec';

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
    console.log('✅ Sent to Google Sheet:', text);
  } catch (err) {
    console.error('❌ Failed to send to Sheet:', err);
  }
}
