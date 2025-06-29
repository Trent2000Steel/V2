export default function Header() {
  return (
    <header style={styles.header}>
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
    height: '64px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '0 20px',
  },
  centerWrap: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#1e1e1e',
    margin: 0,
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  flag: {
    height: '40px',
    width: '40px',
    objectFit: 'contain',
  },
};
