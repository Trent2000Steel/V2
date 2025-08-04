export default function Header() {
  return (
    <>
      <header style={styles.header}>
        <img
          src="/Pix88.webp"
          alt="MovingCo logo"
          style={styles.logoImg}
        />
      </header>

      {/* Trust line below the header */}
      <div style={styles.trustLine}>
        <div>Full-service long distance moving — from anywhere in the U.S.</div>
        <div>On time. On budget. Guaranteed.</div>
      </div>
    </>
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
  logoImg: {
    height: '64px',
    objectFit: 'contain',
    userSelect: 'none',
  },
  trustLine: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#444',
    textAlign: 'center',
    padding: '8px 16px',
    fontFamily: 'sans-serif',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fafafa',
    lineHeight: 1.4,
  },
};
