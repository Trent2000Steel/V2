// pages/api/test-telegram.js

import { notifyTelegram } from '../../utils/TapUserResponse';

export default async function handler(req, res) {
  const testPayload = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    origin: 'Austin, TX',
    destination: 'Phoenix, AZ',
    moveDate: '2025-08-15',
    helpNeeded: 'Load + Unload',
    specialItems: 'TV, Piano',
    quote: '$2,800–$3,400'
  };

  try {
    await notifyTelegram(testPayload);
    res.status(200).json({ success: true, message: 'Telegram test sent.' });
  } catch (err) {
    console.error('❌ Telegram test failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
