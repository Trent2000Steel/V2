// pages/api/leads.js
import { sendToSheet } from '../../utils/sendToSheet';

let sessionStore = {}; // In-memory session tracking (temporary)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sessionId, message = '', timestamp = Date.now(), estimate = null } = req.body;

  // Create or update session in memory
  if (!sessionStore[sessionId]) {
    sessionStore[sessionId] = {
      sessionId,
      startedAt: timestamp,
      messages: [],
      estimateLogged: false
    };
  }

  // Save message
  sessionStore[sessionId].messages.push({ message, timestamp });

  // Send message to Google Sheet immediately
  try {
    await sendToSheet({
      sessionId,
      type: 'message',
      content: message,
      timestamp
    });
  } catch (err) {
    console.error('❌ Sheet logging error (message):', err);
  }

  // If estimate is included, log that separately once
  if (estimate && !sessionStore[sessionId].estimateLogged) {
    try {
      await sendToSheet({
        sessionId,
        type: 'estimate',
        content: estimate,
        timestamp
      });
      sessionStore[sessionId].estimateLogged = true;
    } catch (err) {
      console.error('❌ Sheet logging error (estimate):', err);
    }
  }

  res.status(200).json({ success: true });
}
