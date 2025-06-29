// pages/terms.js
export default function TermsOfService() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Terms of Service</h1>

      <div style={styles.text}>
        <p><strong>1. Introduction</strong><br />
        By accessing or using the services provided by MovingCo (“we,” “us,” or “our”), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.</p>

        <p><strong>2. What We Do</strong><br />
        MovingCo is a concierge platform that coordinates long-distance moves through a verified network of third-party vendors. We help you plan and organize your move with transparent flat-rate pricing and a dedicated concierge call.</p>

        <p><strong>3. What We Don’t Do</strong><br />
        We are not a motor carrier, common carrier, moving company, or freight broker. We do not operate moving trucks, provide physical labor, or transport goods. All moving services are performed by independent, third-party providers.</p>

        <p><strong>4. The MoveSafe Method™</strong><br />
        Our process includes gathering your inventory and photos, conducting a MoveSafe Call, and submitting your details for flat-rate approval. All quotes are subject to change based on accuracy of the submitted information.</p>

        <p><strong>5. Your Responsibilities</strong><br />
        You agree to provide complete and accurate information. You must submit photos of your home and belongings within 48 hours of booking. Failure to do so may delay or alter your quote or service.</p>

        <p><strong>6. Payments & Refunds</strong><br />
        After approving your flat-rate quote, a partial deposit is required to cover coordination and supply shipping. This deposit may be refundable if cancellation occurs under specified conditions. Remaining payments are due per the terms of each vendor. See our Refund Policy for full details.</p>

        <p><strong>7. Service Denial & Termination</strong><br />
        We reserve the right to refuse or cancel service at our discretion, especially in cases of fraud, abuse, or misrepresentation.</p>

        <p><strong>8. Governing Law</strong><br />
        These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved within Texas jurisdiction unless otherwise agreed in writing.</p>

        <p><strong>9. Contact</strong><br />
        For questions about these terms, email us at <a href="mailto:support@trustmovingco.com">support@trustmovingco.com</a>.</p>
      </div>

      <button
        style={styles.button}
        onClick={() => window.location.href = '/'}
      >
        Back to Chat
      </button>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '28px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  text: {
    fontSize: '16px',
  },
  button: {
    marginTop: '40px',
    padding: '12px 20px',
    backgroundColor: '#1e70ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
