// components/Footer.js
export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.links}>
        <a href="/privacy" style={styles.link}>Privacy Policy</a>
        <span style={styles.separator}>|</span>
        <a href="/terms" style={styles.link}>Terms of Service</a>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px 0',
    backgroundColor: '#f9f9f9',
    fontSize: '13px',
    color: '#555',
    borderTop: '1px solid #eee'
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#1e70ff',
  },
  separator: {
    margin: '0 5px',
    color: '#aaa'
  }
};
