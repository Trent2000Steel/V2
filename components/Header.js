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
    height: '64px',              // ⬇️ Tight header height
    backgroundColor: '#ffffff',  // ✅ White background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // ⬅️ Logo sticks to the left
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '0 16px',           // ⬇️ Small left/right padding
    borderBottom: '1px solid #eee' // ✅ Optional subtle divider
  },
  logoImg: {
    height: '48px',              // ⬇️ Fits well in header
    objectFit: 'contain',
    userSelect: 'none',
  }
};
