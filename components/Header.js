export default function Header() {
  return (
    <header style={styles.header}>
      <img src="/Header.png" alt="MovingCo" style={styles.logo} />
    </header>
  );
}

const styles = {
  header: {
    height: '56px', // Clean slim height like ChatGPT
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    maxHeight: '32px', // Keeps the logo tight
    objectFit: 'contain',
  },
};
