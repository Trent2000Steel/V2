// components/ChatUI.js
import { useState, useEffect, useRef } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I’m Max — your MoveSafe Concierge. Where would you like to start today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    const botReply = { role: 'assistant', content: data.reply };
    setMessages(prev => [...prev, botReply]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#d2eaff' : '#f1f1f1',
            }}
          >
            <div>{msg.content}</div>
            <div style={styles.timestamp}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  chatBox: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  message: {
    maxWidth: '80%',
    padding: '10px',
    borderRadius: '15px',
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  timestamp: {
    fontSize: '10px',
    textAlign: 'right',
    marginTop: '5px',
    color: '#888',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    fontSize: '16px', // ✅ FIX: prevent iOS zoom
    outline: 'none',
  },
  button: {
    marginLeft: '10px',
    padding: '10px 16px',
    backgroundColor: '#1e70ff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px', // ✅ FIX: prevent iOS zoom
  }
};
