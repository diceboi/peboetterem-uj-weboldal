"use client"

export const dynamic = "force-dynamic";

import Image from "next/image";
import HomeBanner from "./HomeBanner";

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
    <section id="mainhero" className="relative flex flex-col justify-center gap-10 w-full min-h-[90vh] bg-[--navy]">
      <div style={{backgroundImage: `url("${pages.fooldal.heroBackground.sourceUrl}")`}} className="absolute w-full h-full opacity-50 mix-blend-overlay bg-cover bg-no-repeat bg-center"></div>
      <div className="container m-auto flex flex-col gap-10 justify-center items-center z-10">
        <Image src={pages.fooldal.heroLogo.sourceUrl} alt={pages.fooldal.heroLogo.altText} width={300} height={300} className="max-w-[150px] lg:max-w-[200px] max-h-[150px] lg:max-h-[200px]"/>
        <p className="w-11/12 lg:w-1/2 text-center text-[--grey]">{pages.fooldal.heroText}</p>
        <HomeBanner classname={"w-11/12 lg:w-full h-[15vh] lg:h-[30vh] bg-slate-50 bg-cover bg-center"}/>
      </div>

    </section>
  )
}
