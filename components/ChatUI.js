import { useEffect, useRef, useState } from 'react';

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: "Welcome to MovingCo. Where are you moving from?" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: "Got it. Where are you headed?",
        },
      ]);
    }, 800);
  };

  useEffect(() => {
    const chatArea = bottomRef.current?.parentNode;
    if (chatArea && chatArea.scrollHeight > chatArea.clientHeight) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.chatScrollArea,
          overflowY: messages.length >= 4 ? 'auto' : 'hidden',
        }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              ...styles.messageBubble,
              ...(msg.role === 'user' ? styles.userBubble : styles.assistantBubble),
            }}
          >
            {msg.text}
            <div style={styles.timestamp}>
              {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBar}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
    height: '100dvh', // Full screen height
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  chatScrollArea: {
    flexGrow: 1,
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
};
