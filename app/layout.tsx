import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Playball } from 'next/font/google'
import './globals.css'
import Mainnav from './components/Nav/mainnav'
import { ApolloWrapper } from "./lib/apollo-wrapper";

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
      <body className={`${bebasNeue.variable} ${inter.variable} ${playball.variable}`}>
        <ApolloWrapper>
        <Mainnav />
        {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
