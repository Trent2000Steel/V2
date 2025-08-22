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
    height: '80px',              // ⬆️ Taller header to fit larger logo
    backgroundColor: '#ffffff',  // ✅ White background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // ⬅️ Logo sticks to the left
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '0 20px',           // ⬇️ Small side padding
    borderBottom: '1px solid #eee' // ✅ Optional subtle divider
  },
  logoImg: {
    height: '64px',              // ⬆️ Increased logo size
    objectFit: 'contain',
    userSelect: 'none',
  }
};
