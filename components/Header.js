export default function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>MovingCo</h1>
      <img src="/USA.png" alt="USA flag" style={styles.flag} />
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
    flexShrink: 0,
    gap: '12px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e1e1e',
    margin: 0,
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  flag: {
    height: '32px',
    width: '32px',
    objectFit: 'contain',
  },
};
