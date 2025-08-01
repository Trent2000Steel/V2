export default function Header() {
  return (
    <header style={styles.header}>
      <div className="moneyBackBox" style={styles.guarantee}>
        <div style={styles.guaranteeMain}>Satisfaction</div>
        <div>Guaranteed</div>
      </div>

      <div style={styles.centerWrap}>
        <div style={styles.titleWrap}>
          <h1 style={styles.logo}>MovingCo</h1>
          <div style={styles.taglineWrap}>
            <span style={styles.tagline}>
              <span style={styles.badge}>✓</span> MoveSafe Verified™
            </span>
            <span style={styles.subtext}>
              Full-service long distance moving — from anywhere in the U.S.
            </span>
          </div>
        </div>
      </div>

      <img
        src="/USA.webp"
        alt="USA flag"
        style={styles.flag}
        width={48}
        height={48}
      />

      <style jsx>{`
        @media (max-width: 480px) {
          .moneyBackBox {
            width: 76px !important;
            height: 76px !important;
            font-size: 11px !important;
            padding: 2px !important;
          }
          .moneyBackBox div:first-child {
            font-size: 12px !important;
          }
        }
      `}</style>
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
  taglineWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4px',
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'sans-serif',
  },
  subtext: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#555',
    marginTop: '4px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    maxWidth: '280px',
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
  guarantee: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#d1f5d3',
    border: '2px solid #4caf50',
    color: '#0a7308',
    fontWeight: 'bold',
    fontSize: '12px',
    borderRadius: '8px',
    width: '88px',
    height: '88px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px',
    fontFamily: 'sans-serif',
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
  },
  guaranteeMain: {
    fontSize: '14px',
    lineHeight: '1.1',
    textAlign: 'center',
  },
};
