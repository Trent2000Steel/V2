import Head from 'next/head';
import Header from '../components/Header';
import ChatUI from '../components/ChatUI';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>TruestMove - Total Move Control</title>
        <meta
          name="description"
          content="TruestMove is America’s trusted moving concierge. Total Move Control with the MoveSafe Method™ and real human oversight from start to finish."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/Favicon.png" />

        {/* Open Graph (Facebook, LinkedIn, etc.) */}
        <meta property="og:title" content="TruestMove - Total Move Control" />
        <meta
          property="og:description"
          content="TruestMove is America’s trusted moving concierge. Experience the MoveSafe Method™ and real human oversight at every step."
        />
        <meta property="og:image" content="https://trustmovingco.com/Og-image.png" />
        <meta property="og:url" content="https://trustmovingco.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TruestMove - Total Move Control" />
        <meta
          name="twitter:description"
          content="America’s trusted moving concierge. The MoveSafe Method™ with human oversight for total move control."
        />
        <meta name="twitter:image" content="https://trustmovingco.com/Og-image.png" />

        {/* ✅ Google Analytics (GA4) */}
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

        {/* ✅ Google Ads conversion tracking (AW tag) */}
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

        {/* ✅ Hotjar Tracking */}
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
