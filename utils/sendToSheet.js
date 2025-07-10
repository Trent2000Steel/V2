// /utils/sendToSheet.js

export default async function sendToSheet({ sessionId, step, field, value }) {
  const endpoint = 'https://script.google.com/macros/s/AKfycbyL5JJnz4xWJ5PtTja_g4pJzs8Rz9EYGatOBPNQuBs8vQ-Pq6RGeWapsYehiscCt8ba/exec';

  try {
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ sessionId, step, field, value }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Google Sheets error:', err);
  }
}
