// components/TrustBar.js
import Image from 'next/image';

export default function TrustBar() {
  return (
    <div style={styles.container}>
      <p style={styles.text}>Real Americans monitor this AI Chat. 🇺🇸🇺🇸🇺🇸</p>
      <div style={styles.avatars}>
        <div style={styles.avatarBlock}>
          <Image src="/avatar-avery.jpg" alt="Avery" width={60} height={60} style={styles.avatar} />
          <div style={styles.name}>Avery<br /><span style={styles.role}>Move Concierge</span></div>
        </div>
        <div style={styles.avatarBlock}>
          <Image src="/avatar-miles.jpg" alt="Miles" width={60} height={60} style={styles.avatar} />
          <div style={styles.name}>Miles<br /><span style={styles.role}>Quote Approval Team</span></div>
        </div>
        <div style={styles.avatarBlock}>
          <Image src="/avatar-nina.jpg" alt="Nina" width={60} height={60} style={styles.avatar} />
          <div style={styles.name}>Nina<br /><span style={styles.role}>Customer Safety Lead</span></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '30px 0 10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #eee'
  },
  text: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  },
  avatars: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px'
  },
  avatarBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    color: '#333'
  },
  avatar: {
    borderRadius: '50%',
    objectFit: 'cover'
  },
  name: {
    marginTop: '8px',
    lineHeight: '1.2',
    fontWeight: 'bold'
  },
  role: {
    display: 'block',
    fontWeight: 'normal',
    fontSize: '11px',
    color: '#888'
  }
};
