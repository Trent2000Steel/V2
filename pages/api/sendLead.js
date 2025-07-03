import { getMemory } from '../../utils/Memory';
import { notifyTelegram } from '../../utils/TapUserResponse';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const memory = getMemory();
    const info = memory.customerInfo;

    // Basic validation: at least email or phone must be provided
    if (!info.email && !info.phone) {
      return res.status(400).json({ error: 'Missing contact info' });
    }

    // Attach estimate if available
    info.quote = memory.quote || 'Not yet provided';

    await notifyTelegram(info);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('SendLead error:', err);
    res.status(500).json({ error: 'Failed to send lead' });
  }
}
