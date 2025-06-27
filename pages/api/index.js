import Head from 'next/head';
import Header from '../components/Header';
import ChatUI from '../components/ChatUI';
import Footer from '../components/Footer';
import Maxintro from '../components/Maxintro';
import TrustBar from '../components/TrustBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>MovingCo™ – Flat Rate Moving You Can Trust</title>
        <meta name="description" content="MoveSafe Verified™ | Flat Rate Pricing | No Upfront Cost Until You Approve the Quote." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Maxintro />
        <TrustBar />
        <ChatUI />
      </main>
      <Footer />
    </div>
  );
}
