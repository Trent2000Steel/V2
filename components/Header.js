export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.leftTagline}>
        <div style={styles.badge}>✓</div>
        <span style={styles.tagline}>MoveSafe Verified™</span>
      </div>

      <div style={styles.centerWrap}>
        <h1 style={styles.logo}>MovingCo</h1>
      </div>

      <img
        src="/USA.png"
        alt="USA flag"
        style={styles.flag}
        width={48}
        height={48}
      />
    </header>
  );
}

const styles = {
  header: {
    height: '72px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  centerWrap: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#1e1e1e',
    margin: 0,
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  flag: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '48px',
    width: '48px',
    objectFit: 'contain',
  },
  leftTagline: {
    position: 'absolute',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    backgroundColor: '#1e70ff',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  },
  tagline: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1e70ff',
    fontFamily: 'sans-serif',
  },
};
