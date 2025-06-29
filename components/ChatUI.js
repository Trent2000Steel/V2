import { useEffect, useRef, useState } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  // Show initial message after short delay
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
    }, 600); // Delay intro by 600ms

    return () => clearTimeout(introDelay);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageToAPI = async (allMessages) => {
    try {
      setTyping(true); // Show typing animation

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
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
    const userMessage = { id: Date.now(), role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    sendMessageToAPI(updatedMessages.map(m => ({ role: m.role, content: m.text })));
  };

  const handleOptionClick = (optionText) => {
    const userMessage = { id: Date.now(), role: 'user', text: optionText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    sendMessageToAPI(updatedMessages.map(m => ({ role: m.role, content: m.text })));
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
            <div key={msg.id} style={{
              ...styles.messageBubble,
              ...(msg.role === 'user' ? styles.userBubble : styles.assistantBubble),
            }}>
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
              <div style={styles.timestamp}>
                {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ ...styles.messageBubble, ...styles.assistantBubble }}>
              <span className="typing">Max is typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
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
        <button onClick={handleSend} style={styles.sendBtn}>Send</button>
      </div>

      <style jsx>{`
        .typing {
          font-style: italic;
          font-size: 14px;
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
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#fff',
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
    backgroundColor: '#f9f9f9',
  },
  inputBar: {
    padding: '12px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    marginRight: '8px',
  },
  sendBtn: {
    backgroundColor: '#1e70ff',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: '10px 14px',
    borderRadius: '12px',
    marginBottom: '10px',
    position: 'relative',
  },
  assistantBubble: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#cce0ff',
    alignSelf: 'flex-end',
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
  },
};
