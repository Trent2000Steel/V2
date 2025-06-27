import Head from 'next/head';
import Header from '../components/Header';
import ChatUI from '../components/ChatUI';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>MovingCo — Moving You Can Trust</title>
        <meta name="description" content="Flat Rate Pricing. No Money Down. Real Human Help." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.container}>
        <Header />
        <ChatUI />
        <Footer />
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
};
