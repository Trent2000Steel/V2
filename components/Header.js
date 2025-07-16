export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.centerWrap}>
        <div style={styles.titleWrap}>
          <h1 style={styles.logo}>MovingCo</h1>
          <span style={styles.tagline}>
            <span style={styles.badge}>✓</span> MoveSafe Verified™
          </span>
        </div>
      </div>
      <img
        src="/USA.webp"
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
    height: '92px',
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 1.1,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#1e1e1e',
    margin: 0,
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  tagline: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e70ff',
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'sans-serif',
  },
  badge: {
    backgroundColor: '#1e70ff',
    color: '#ffffff',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
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
};
