// components/MaxIntro.js
export default function MaxIntro({ onSelectOption }) {
  const options = ['Pricing', 'Damage', 'Timing', 'Guide Me'];

  return (
    <div style={styles.container}>
      <div style={styles.botMessage}>
        <p style={styles.text}><strong>I’m MAX — your Moving AI.</strong><br />
        Specially trained to protect you from a moving disaster.<br />
        What’s on your mind today?</p>
      </div>
      <div style={styles.buttons}>
        {options.map((option) => (
          <button
            key={option}
            style={styles.button}
            onClick={() => onSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '20px 0',
    textAlign: 'left'
  },
  botMessage: {
    background: '#eee',
    padding: '12px 18px',
    borderRadius: '12px',
    maxWidth: '90%',
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: '1.4',
    color: '#333'
  },
  text: {
    margin: 0
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: '#1e70ff',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  }
};
