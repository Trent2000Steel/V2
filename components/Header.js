export default function Header() {
  return (
    <header style={styles.header}>
      <img
        src="/Pix88.webp"
        alt="TruestMove logo"
        style={styles.logoImg}
      />
    </header>
  );
}

const styles = {
  header: {
    height: '72px',            // ⬇️ Reduced overall height
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',      // keeps logo centered vertically
    justifyContent: 'center',  // centers horizontally
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #eee'
  },
  logoImg: {
    height: '64px',            // ⬆️ logo almost fills header
    objectFit: 'contain',
    userSelect: 'none',
  }
};
