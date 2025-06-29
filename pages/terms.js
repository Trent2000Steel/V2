export default function Terms() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Terms of Service</h1>

      <div style={styles.content}>
        <p><strong>1. Introduction</strong><br />
        By using MovingCo (“we,” “us,” or “our”), you agree to these Terms of Service. If you do not agree, do not use our site or services.</p>

        <p><strong>2. What We Do</strong><br />
        MovingCo coordinates long-distance moves through third-party vendors. We provide flat-rate quotes and help organize your move.</p>

        <p><strong>3. What We Don’t Do</strong><br />
        We are not a carrier, moving company, or freight broker. We do not transport goods or provide labor. All moving services are performed by independent third parties.</p>

        <p><strong>4. The MoveSafe Method™</strong><br />
        After booking, we collect photos and inventory, conduct a MoveSafe Call, and submit your details for flat-rate approval. Quotes may change if the information is inaccurate or incomplete.</p>

        <p><strong>5. Your Responsibilities</strong><br />
        You agree to provide accurate information and submit required photos within 48 hours. Delays or changes may affect your quote or scheduling.</p>

        <p><strong>6. Payments & Refunds</strong><br />
        Once your flat rate is approved, a deposit is due to begin coordination and ship supplies. This deposit may be partially refundable if canceled before coordination begins. Final payment is required 5 days prior to your move.</p>

        <p><strong>7. Payment Handling</strong><br />
        You authorize MovingCo to collect your payment and forward it to the selected vendors. We do not guarantee the performance or availability of any vendor.</p>

        <p><strong>8. Cancellation</strong><br />
        We may cancel or refuse service at any time for fraud, abuse, or misrepresentation. Customers may request cancellation in writing for consideration of a partial refund before coordination begins.</p>

        <p><strong>9. Legal</strong><br />
        These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in Texas courts unless otherwise agreed.</p>

        <p><strong>10. Contact</strong><br />
        Questions? Email us at support@trustmovingco.com.</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a href="/" style={styles.backBtn}>⬅ Back to Chat</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
  },
  title: {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '32px',
  },
  content: {
    fontSize: '16px',
  },
  backBtn: {
    display: 'inline-block',
    marginTop: '20px',
    backgroundColor: '#1e70ff',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '16px',
  },
};
