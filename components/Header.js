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
    height: '80px', // ⬅️ Reduced from 92px
    backgroundColor: '#ffffff',
    borderBottom: 'none', // ⬅️ Removed the line
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    paddingBottom: '4px', // ⬅️ Small tweak to bring it closer to trust text
  },
  logoImg: {
    height: '60px', // ⬅️ Slightly reduced
    objectFit: 'contain',
    userSelect: 'none',
  }
};
