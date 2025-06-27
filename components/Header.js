export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>MovingCo</h1>
    </header>
  );
}

const styles = {
  header: {
    height: '56px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    flexShrink: 0, // ✅ Prevent header from shrinking
  },
  logo: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e1e1e',
    margin: 0,
    fontFamily: 'sans-serif',
    userSelect: 'none', // ✅ Prevent accidental highlight flicker
  },
};
