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
    backgroundColor: '#ffffff',
    padding: '20px 0 16px',
    textAlign: 'center',
    color: '#000000'
  },
  logo: {
    margin: 0,
    fontSize: '2.2rem',
    fontWeight: '700',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    letterSpacing: '-0.5px',
    color: '#000000'
  },
  tagline: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '400',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#444444'
  }
};
