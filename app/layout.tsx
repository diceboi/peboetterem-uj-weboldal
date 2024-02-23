import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Playball } from 'next/font/google'
import './globals.css'
import MainNav from './components/Nav/mainnav';
import { ApolloWrapper } from "./lib/apollo-wrapper";
import Footer from './components/UI/Footer';
import Script from 'next/script';
import AddToCartProvider, { AddToCartContext } from './addToCart';

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-bebas' 
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playball = Playball({ 
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-playball'
})

export const metadata: Metadata = {
  title: 'PEBo Étterem és Kávézó - Olaszos ízek Kaposvár szívében',
  description: 'Olaszos és klasszikus ízekkel várunk Kaposvár szívében, vagy egy igazán jó kávéval. Szerezz örömteli pillanatokat nálunk hangulatos környezetben.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=GTM-M6QM75MD`}
          height="0" 
          width="0" 
          style={{ display: "none", visibility: "hidden" }}>
        </iframe>
      </noscript>

      <Script
        id='google-tag-manager'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html:
          `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M6QM75MD');`
        }}
      ></Script>

      <Script 
        id='Hotjar' 
        strategy='beforeInteractive' 
        dangerouslySetInnerHTML={{
          __html:
          `(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3731715,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
      }}>

      <Script
        id="fb-pixel"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: 
          `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1522837111829084');
          fbq('track', 'PageView');`
        }}
      /></Script>
  
      </head>
      <body className={`${bebasNeue.variable} ${inter.variable} ${playball.variable}`}>
        <ApolloWrapper>
          <AddToCartProvider>
            <MainNav />
              {children}
            <Footer />
          </AddToCartProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
