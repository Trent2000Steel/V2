export default function Header() {
  return (
    <header style={styles.header}>
      <img
        src="/Pix88.webp"
        alt="MovingCo logo"
        style={styles.logoImg}
      />
    </header>
  );
}

const styles = {
  header: {
    height: '76px',                    // ⬇️ Reduced overall height
    backgroundColor: '#ffffff',       // ✅ Clean white background
    borderBottom: 'none',             // 🚫 Removes grey line
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    paddingBottom: '0',               // ⬇️ Pulls trust bar closer
    marginBottom: '-4px',             // ⬇️ Tighter spacing to next element
  },
  logoImg: {
    height: '64px',
    objectFit: 'contain',
    userSelect: 'none',
  }
};
