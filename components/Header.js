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
  }
};
