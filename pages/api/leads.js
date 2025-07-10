// pages/api/leads.js
import { sendToSheet } from '../../utils/sendToSheet';

let sessionStore = {}; // In-memory session tracking (temporary)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sessionId, message = '', timestamp = Date.now(), estimate = null } = req.body;

  if (!sessionStore[sessionId]) {
    sessionStore[sessionId] = {
      sessionId,
      startedAt: timestamp,
      messages: [],
      estimateLogged: false
    };
  }

  sessionStore[sessionId].messages.push({ message, timestamp });

  try {
    await sendToSheet(sessionId, 'message', 'content', message);
  } catch (err) {
    console.error('❌ Sheet logging error (message):', err);
  }

  if (estimate && !sessionStore[sessionId].estimateLogged) {
    try {
      await sendToSheet(sessionId, 'estimate', 'content', estimate);
      sessionStore[sessionId].estimateLogged = true;
    } catch (err) {
      console.error('❌ Sheet logging error (estimate):', err);
    }
  }

  res.status(200).json({ success: true });
}
