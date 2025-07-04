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

        {/* ✅ Favicon */}
        <link rel="icon" type="image/png" href="/Favicon.png" />

        {/* ✅ Open Graph for link preview */}
        <meta property="og:title" content="MovingCo — Moving You Can Trust" />
        <meta property="og:description" content="Flat-rate long-distance moves with real people watching your stuff. Seriously." />
        <meta property="og:image" content="https://trustmovingco.com/Og-image.png" />
        <meta property="og:url" content="https://trustmovingco.com" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MovingCo — Moving You Can Trust" />
        <meta name="twitter:description" content="We handle your move with care, protection, and a single point of contact." />
        <meta name="twitter:image" content="https://trustmovingco.com/Og-image.png" />
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
    overflow: 'hidden',
  },
  chatContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minHeight: 0,
  },
};
