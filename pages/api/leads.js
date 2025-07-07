// pages/api/leads.js
import { sendToSheet } from '../../utils/sendToSheet';
// Placeholder for email — we’ll build this next
const sendToEmail = async () => {};

let sessionStore = {}; // In-memory session tracking (temporary)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { sessionId, step, data = {}, timestamp = Date.now() } = req.body;

  // Create or update session in memory
  if (!sessionStore[sessionId]) {
    sessionStore[sessionId] = {
      sessionId,
      startedAt: timestamp,
      entries: [],
      contactSent: false
    };
  }

  sessionStore[sessionId].entries.push({ step, data, timestamp });

  // ✅ Send to Google Sheet
  try {
    await sendToSheet(sessionId, step, data, timestamp);
  } catch (err) {
    console.error('❌ Sheet error:', err);
  }

  // 📬 Check for contact info and send email (later)
  const hasContact =
    data.name &&
    (data.email?.includes('@') || data.phone?.length >= 8);

  if (hasContact && !sessionStore[sessionId].contactSent) {
    try {
      await sendToEmail(sessionId, sessionStore[sessionId]);
      sessionStore[sessionId].contactSent = true;
    } catch (err) {
      console.error('❌ Email error:', err);
    }
  }

  res.status(200).json({ success: true });
}
