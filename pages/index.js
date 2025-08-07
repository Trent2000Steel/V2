import Head from 'next/head';
import Header from '../components/Header';
import ChatUI from '../components/ChatUI';
import Footer from '../components/Footer';
import LiveTrustStatus from '../components/LiveTrustStatus';

export default function Home() {
  return (
    <>
      <Head>
        <title>MovingCo — Moving You Can Trust</title>
        <meta name="description" content="Flat Rate Pricing. No Money Down. Real Human Help." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/Favicon.png" />
        <meta property="og:title" content="MovingCo — Moving You Can Trust" />
        <meta property="og:description" content="Flat-rate long-distance moves with real people watching your stuff. Seriously." />
        <meta property="og:image" content="https://trustmovingco.com/Og-image.png" />
        <meta property="og:url" content="https://trustmovingco.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MovingCo — Moving You Can Trust" />
        <meta name="twitter:description" content="We handle your move with care, protection, and a single point of contact." />
        <meta name="twitter:image" content="https://trustmovingco.com/Og-image.png" />

        {/* ✅ Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JC5ZTSZED2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JC5ZTSZED2');
            `,
          }}
        />

        {/* ✅ Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17246682774"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17246682774');
            `,
          }}
        />

        {/* ✅ Hotjar */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6442537,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </Head>

      <div style={styles.page}>
        <Header />

        {/* ✅ Chat + Trust Status Container */}
        <div style={styles.chatModule}>
          <LiveTrustStatus />
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
    backgroundColor: '#f0f2f5', // slight gray backdrop
    overflow: 'hidden',
  },
  chatModule: {
    maxWidth: '620px',
    width: '100%',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '20px',
    marginTop: '16px',
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
    minHeight: 0,
  },
};
