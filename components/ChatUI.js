import { useEffect, useRef, useState } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: "I’m Max — your MovingCo AI trained to save you from a moving nightmare.\nWhat’s weighing on you most right now?",
      options: ['Price', 'Damage', 'Timing', 'Just guide me'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const sendMessageToAPI = async (allMessages) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      });
      const data = await response.json();
      setIsTyping(false);
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
      setIsTyping(false);
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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

          {isTyping && (
            <div style={{ ...styles.messageBubble, ...styles.assistantBubble }}>
              <div style={styles.typingDots}>
                <span>.</span><span>.</span><span>.</span>
              </div>
              <div style={styles.timestamp}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message"
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendBtn}>Send</button>
      </div>
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
  typingDots: {
    display: 'flex',
    fontSize: '24px',
    gap: '4px',
    animation: 'blink 1s infinite',
  },
};
