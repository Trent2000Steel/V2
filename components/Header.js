// components/Header.js
import Image from 'next/image';

export default function Header() {
  return (
    <header style={{ textAlign: 'center', padding: '20px 0' }}>
      <Image src="/logo.png" alt="MovingCo Logo" width={200} height={60} />
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#444' }}>
        <strong>MoveSafe Verified™</strong> | Flat Rate Pricing | No Upfront Cost Until You Approve the Quote
      </div>
    </header>
  );
}
