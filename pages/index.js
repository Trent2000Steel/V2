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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={styles.page}>
        <Header />
        <div style={styles.chatContainer}>
          <ChatUI />
        </div>
        <Footer />
      </div>
    </>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
};
