import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Playball } from 'next/font/google'
import './globals.css'
import Mainnav from './components/Nav/mainnav'
import { ApolloWrapper } from "./lib/apollo-wrapper";
import Footer from './components/UI/Footer';
import Script from 'next/script';

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
  title: 'PEBo étterem és kávézó - Olaszos ízek Kaposvár szívében',
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
      <Script 
        async 
        src="https://www.googletagmanager.com/gtag/js?id=G-GJ550E23DX" 
        />
        <Script
        id='Analytics'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html:
          `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-GJ550E23DX');`
        }}
        >
        </Script>
        <Script 
        id='Hotjar' 
        strategy='afterInteractive' 
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

        </Script>
      </head>
      <body className={`${bebasNeue.variable} ${inter.variable} ${playball.variable}`}>
        <ApolloWrapper>
        {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
