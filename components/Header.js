export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>MovingCo™</h1>
      <p style={styles.tagline}>Moving you can trust. People who care.</p>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#1e70ff', // Google Blue
    padding: '24px 0 16px',
    textAlign: 'center',
    color: 'white',
    borderBottom: '2px solid #e0e0e0'
  },
  logo: {
    margin: 0,
    fontSize: '2.2rem',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  tagline: {
    margin: 0,
    fontSize: '1rem',
    opacity: 0.9,
    fontWeight: 400
  }
};
