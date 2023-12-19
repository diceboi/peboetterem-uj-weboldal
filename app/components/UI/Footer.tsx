"use client"

import Image from "next/image";
import { FaFacebook } from 'react-icons/fa'

import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import Link from "next/link";

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

export default function Footer() {

    const { data }:any = useSuspenseQuery(GET_FOOLDAL);

    const heroLogo = data.pages.edges[0].node.fooldal.heroLogo;

  return (
    <section id="footer" className="w-full bg-[--navy] lg:py-20 py-4 px-4">
        <div className="flex flex-col container m-auto p-4 lg:p-0">
            <div className="flex flex-col lg:flex-row justify-between border-b border-[--lightnavy] py-8 gap-8">
                <div className="flex flex-col justify-start gap-4">
                    <Image src={heroLogo.sourceUrl} width={100} height={100} alt={heroLogo.altText}/>
                    <h3 className="footertitle">PEBo Gasztro Kft.</h3>
                    <p className="footerparagraph">7400 Kaposvár, József Attila u. 14.</p>
                    <div className="flex flex-nowrap">
                      <Link href="https://www.facebook.com/peboetterem" target="_blank" className="w-7 h-7"><FaFacebook className="w-full h-full text-[--grey]"/></Link>
                    </div>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Nyitvatartás</h3>
                    <div className="flex flex-col bg-[--alert] p-2 text-white">
                      <p>Karácsonyi nyitvatartás:</p>
                      <p className="footerparagraph">12.24.: Az ünnepi tálak átadása és kiszállítása</p>
                      <p className="footerparagraph">12.25.: Zárva</p>
                      <p className="footerparagraph">12.26.: Zárva</p>
                      <p className="footerparagraph">12.27.: 10:00 - 21:00</p>
                      <p className="footerparagraph">12.28.: 09:00 - 21:00</p>
                      <p className="footerparagraph">12.29.: 09:00 - 21:00</p>
                      <p className="footerparagraph">12.30.: 10:00 - 21:00</p>
                      <p className="footerparagraph">12.31.: Az ünnepi tálak átadása és kiszállítása</p>
                      <p className="footerparagraph">01.01.: Zárva</p>
                      <p className="footerparagraph">01.02.: Nyitás: 09:00 - 21:00</p>
                    </div>
                    <p className="footerparagraph">H - P: 09.00 - 21.00</p>
                    <p className="footerparagraph">Szo: 10.00 - 21.00</p>
                    <p className="footerparagraph">V: Zárva</p>
                    <p className="footerparagraph"><b>Rendelésfelvétel: 20:15-ig</b></p>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Elérhetőség</h3>
                    <Link href="tel:0682310633"><p className="footerparagraph">06 82 310 633</p></Link>
                    <Link href="tel:06304940959"><p className="footerparagraph">06 30 494 0959</p></Link>
                </div>
                <div className="flex flex-col justify-start gap-4">
                    <h3 className="footertitle">Linkek</h3>
                    <Link href="/adatkezelesi-tajekoztato"><p className="footerparagraph hover:underline">Adatkezelési tajekoztato</p></Link>
                </div>
            </div>
            <div className="flex justify-center py-4">
                <p className="text-[--grey] opacity-25 text-sm">peboetterem.hu @ Minden jog fenntartva</p>
            </div>
        </div>
    </section>
  )
}
