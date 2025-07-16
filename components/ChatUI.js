import { useEffect, useRef, useState } from 'react';
import { setCustomerInfo } from '../utils/Memory';

// ✅ Telegram notify helper
const notifyTelegram = async (text, role = 'user') => {
  try {
    const sessionId = sessionStorage.getItem('sessionId') || 'unknown';
    await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `[${role.toUpperCase()}] ${text}`,
        sessionId
      }),
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }
};

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const charCount = useRef(0); // ✅ Tracks total characters typed

  // ✅ Fire conversion after 90s if not already triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.__conversionFired) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17246682774/GEHpC1XPxvTaEJb9729A'
        });
        window.__conversionFired = true;
      }
    }, 90000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Set session ID once
  useEffect(() => {
    const existing = sessionStorage.getItem('sessionId');
    if (!existing) {
      sessionStorage.setItem('sessionId', crypto.randomUUID());
    }
  }, []);

  useEffect(() => {
    const introDelay = setTimeout(() => {
      setMessages([
        {
          id: 1,
          role: 'assistant',
          text: "I’m Max — your MovingCo AI trained to save you from a moving nightmare.\nWhat’s weighing on you most right now?",
          options: ['Price', 'Damage', 'Timing', 'Just guide me'],
        }
      ]);
    }, 600);
    return () => clearTimeout(introDelay);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToAPI = async (allMessages) => {
    try {
      setTyping(true);
      const sessionId = sessionStorage.getItem('sessionId') || 'unknown';
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages, sessionId }),
      });

      const data = await response.json();
      setTyping(false);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: data.reply || "Sorry, something went wrong.",
        }
      ]);

      notifyTelegram(data.reply, 'max');
    } catch (error) {
      console.error('API error:', error);
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: "Sorry, something went wrong. Try again later.",
        }
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    charCount.current += input.length; // ✅ Track total input length

    // ✅ Trigger conversion if 100+ characters typed
    if (charCount.current >= 100 && !window.__conversionFired) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17246682774/GEHpC1XPxvTaEJb9729A'
      });
      window.__conversionFired = true;
    }

    const userMessage = { id: Date.now(), role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    notifyTelegram(input, 'user');

    const lowerText = input.trim().toLowerCase();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lowerText);
    const isPhone = /^\d{10,}$/.test(lowerText.replace(/\D/g, ''));

    if (isEmail || isPhone) {
      setCustomerInfo({
        email: isEmail ? input.trim() : '',
        phone: isPhone ? input.trim() : '',
      });
      fetch('/api/sendLead', { method: 'POST' });
    }

    setInput('');
    sendMessageToAPI(updatedMessages.map(m => ({ role: m.role, content: m.text })));
  };

  const handleOptionClick = (optionText) => {
    const userMessage = { id: Date.now(), role: 'user', text: optionText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    notifyTelegram(optionText, 'user');
    sendMessageToAPI(updatedMessages.map(m => ({ role: m.role, content: m.text })));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // (Your existing JSX unchanged)
    <div style={styles.wrapper}>
      {/* ... unchanged layout ... */}
    </div>
  );
}

// (Your existing styles object is unchanged)
