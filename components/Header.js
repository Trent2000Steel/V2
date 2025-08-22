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
    height: '84px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ✅ centered logo
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #eee'
  },
  logoImg: {
    height: '72px', // ✅ slightly larger logo
    objectFit: 'contain',
    userSelect: 'none',
  }
};
