export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>MovingCo<span style={styles.trademark}>™</span></div>
      <div style={styles.tagline}>Moving you can trust. People who care.</div>
    </header>
  );
}

const styles = {
  header: {
    padding: '20px 0 10px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#1e70ff',
  },
  trademark: {
    fontSize: '14px',
    verticalAlign: 'super',
    marginLeft: '2px',
  },
  tagline: {
    fontSize: '14px',
    color: '#666',
    marginTop: '4px',
  }
};
