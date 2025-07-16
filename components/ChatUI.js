// components/ChatUI.js
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
        sessionId,
      }),
    });
  } catch (err) {
    console.error('Telegram error:', err);
  }
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    fontFamily: '"Inter", sans-serif',
    backgroundImage: 'url("/Background.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  scrollContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  chatScrollArea: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    fontSize: '17px',
    lineHeight: '1.6',
    fontFamily: '"Inter", sans-serif',
  },
  inputBar: {
    padding: '12px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '17px',
    marginRight: '8px',
    fontFamily: '"Inter", sans-serif',
  },
  sendBtn: {
    backgroundColor: '#1e70ff',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontFamily: '"Inter", sans-serif',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '14px',
    marginBottom: '12px',
    position: 'relative',
    fontSize: '17px',
    fontFamily: '"Inter", sans-serif',
    lineHeight: '1.6',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  assistantBubble: {
    backgroundColor: 'rgba(230, 230, 230, 0.65)',
    alignSelf: 'flex-start',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  userBubble: {
    backgroundColor: 'rgba(204, 224, 255, 0.6)',
    alignSelf: 'flex-end',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  timestamp: {
    fontSize: '10px',
    color: '#666',
    marginTop: '4px',
    textAlign: 'right',
  },
  optionsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  optionButton: {
    backgroundColor: '#1e70ff',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 14px',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: '"Inter", sans-serif',
    fontWeight: 500,
  },
};

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `I’m Max — your MovingCo AI, backed by real humans.\nI’m here to save you from a moving nightmare.\nWhat’s weighing on you most right now?`,
      options: ['Price', 'Damage', 'Timing', 'Just guide me'],
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const charCount = useRef(0);

  useEffect(() => {
    const existing = sessionStorage.getItem('sessionId');
    if (!existing) {
      sessionStorage.setItem('sessionId', crypto.randomUUID());
    }
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

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: data.reply || "Sorry, something went wrong.",
        },
      ]);

      notifyTelegram(data.reply, 'max');
    } catch (error) {
      console.error('API error:', error);
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: 'assistant',
          text: "Sorry, something went wrong. Try again later.",
        },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    charCount.current += input.length;

    if (charCount.current >= 100 && !window.__conversionFired) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17246682774/GEHpC1XPxvTaEJb9729A',
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
    sendMessageToAPI(updatedMessages.map((m) => ({ role: m.role, content: m.text })));
  };

  const handleOptionClick = (optionText) => {
    const userMessage = { id: Date.now(), role: 'user', text: optionText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    notifyTelegram(optionText, 'user');
    sendMessageToAPI(updatedMessages.map((m) => ({ role: m.role, content: m.text })));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.scrollContainer}>
        <div style={styles.chatScrollArea}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.messageBubble,
                ...(msg.role === 'user' ? styles.userBubble : styles.assistantBubble),
              }}
            >
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {msg.options && (
                <div style={styles.optionsContainer}>
                  {msg.options.map((opt, idx) => (
                    <button
                      key={idx}
                      style={styles.optionButton}
                      onClick={() => handleOptionClick(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {msg.id !== 1 && (
                <div style={styles.timestamp}>
                  {new Date(msg.id).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div style={{ ...styles.messageBubble, ...styles.assistantBubble }}>
              <span className="typing">
                Max is typing<span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendBtn}>
          Send
        </button>
      </div>

      <style jsx>{`
        .typing {
          font-style: italic;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
        }
        .dot {
          animation: blink 1.2s infinite;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
