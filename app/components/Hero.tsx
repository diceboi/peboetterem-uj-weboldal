"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";

import { gql } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

const GET_FOOLDAL = gql`
query getFooldal {
  pages(where: {id: 11}) {
    edges {
      node {
        fooldal {
          heroBackground {
            altText
            sourceUrl
          }
          heroLogo {
            altText
            sourceUrl
          }
          heroText
        }
        id
      }
    }
  }
}`

export default function Hero() {

  const { data }:any = useSuspenseQuery(GET_FOOLDAL);

  const pages = data.pages.edges[0].node;

  return (
    <section id="mainhero" className="relative flex flex-col justify-center gap-10 w-full min-h-[50vh] bg-[--navy]">
      <div className="absolute w-full h-full opacity-50 mix-blend-overlay bg-[url('/herobg-pizza-2.webp')] bg-cover bg-no-repeat bg-center"></div>
      <div className="container m-auto flex flex-col lg:flex-row gap-10 justify-center items-center z-10">
        <Image src='/pebo-hero-logo.png' alt='hero logo' width={300} height={300} className="max-w-[100px] lg:max-w-[200px] max-h-[100px] lg:max-h-[200px]"/>
        <p className="w-11/12 lg:w-1/2 text-center lg:text-left text-[--grey]">Olaszos és klasszikus ízekkel, vagy egy igazán jó kávéval várunk Kaposvár szívében. Szerezz örömteli pillanatokat nálunk hangulatos környezetben.</p>
      </div>

    </section>
  )
}
